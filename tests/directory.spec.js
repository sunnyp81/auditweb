import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const route = '/website-audit-tools/';
async function open(page, url = route) {
  await page.goto(url);
  const reject = page.getByRole('button', { name: 'Reject', exact: true });
  if (await reject.isVisible()) await reject.click();
}

test('directory filters combine, reset and handle empty or hostile searches as text', async ({ page }) => {
  await open(page);
  await expect(page.locator('.tool-record:visible')).toHaveCount(10);
  await page.getByLabel('Audit task', { exact: true }).selectOption('speed');
  await expect(page.locator('.tool-record:visible')).toHaveCount(2);
  await page.getByLabel('Search tools').fill('Lighthouse');
  await expect(page.locator('.tool-record:visible')).toHaveCount(2);
  await page.getByLabel('Access', { exact: true }).selectOption('paid');
  await expect(page.getByRole('heading', { name: 'No tools match these filters.' })).toBeVisible();
  await page.getByRole('button', { name: 'Show all tools' }).click();
  await expect(page.getByLabel('Search tools')).toBeFocused();
  await expect(page.locator('.tool-record:visible')).toHaveCount(10);
  await page.getByLabel('Search tools').fill('<img src=x onerror=alert(1)>');
  await expect(page.locator('.tool-record:visible')).toHaveCount(0);
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await page.getByLabel('Access', { exact: true }).selectOption('free-tier');
  await expect(page.locator('.tool-record:visible')).toHaveCount(3);
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await page.getByLabel('Audit task', { exact: true }).selectOption('accessibility');
  await expect(page.locator('.tool-record:visible')).toHaveCount(2);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://auditweb.site/website-audit-tools/');
});

test('comparison retains filtered selections, caps at three and returns keyboard focus', async ({ page }) => {
  await open(page);
  const compare = page.getByRole('button', { name: 'Compare selected', exact: true });
  await expect(compare).toBeDisabled();
  await page.getByRole('checkbox', { name: 'Compare Screaming Frog SEO Spider', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Compare Ahrefs Site Audit', exact: true }).check();
  await page.getByLabel('Audit task', { exact: true }).selectOption('speed');
  await page.getByRole('checkbox', { name: 'Compare Google Lighthouse', exact: true }).check();
  await expect(page.getByRole('checkbox', { name: 'Compare PageSpeed Insights', exact: true })).toBeDisabled();
  await compare.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Your tool comparison' })).toBeFocused();
  await expect(page.locator('#tool-comparison th[scope="col"]')).toHaveCount(4);
  await expect(page.locator('#tool-comparison')).toContainText('500 URLs');
  await expect(page.locator('#tool-comparison')).toContainText('Automated checks cannot prove accessibility compliance');
  await page.getByRole('button', { name: 'Clear selection', exact: true }).click();
  await expect(page.getByLabel('Search tools')).toBeFocused();
  await expect(page.locator('#tool-comparison')).toBeHidden();
  await expect(compare).toBeDisabled();
  await expect(page.getByRole('checkbox', { name: 'Compare PageSpeed Insights', exact: true })).toBeEnabled();
});

test('category and evidence remain useful without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage(); await page.goto(route);
  await expect(page.locator('.tool-record:visible')).toHaveCount(10);
  await expect(page.locator('.directory-controls')).toBeHidden();
  await expect(page.locator('.guide-index a')).toHaveCount(6);
  await expect(page.locator('.record-guide')).toHaveCount(6);
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const collection = schemas.map(JSON.parse).find(s => s['@type'] === 'CollectionPage');
  expect(collection.mainEntity.numberOfItems).toBe(10);
  await page.goto('/'); await expect(page.locator('.evidence-panel:visible')).toHaveCount(3);
  await expect(page.locator('.evidence-tabs')).toBeHidden(); await context.close();
});

test('evidence tabs support arrows, Home and End with recorded findings', async ({ page }) => {
  await open(page, '/');
  const first = page.getByRole('tab', { name: 'Missing pages' });
  await first.focus(); await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'HTML checker' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('simulated results');
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('End');
  await expect(page.getByRole('tabpanel')).toContainText('four editable Markdown templates');
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('ArrowRight');
  await expect(first).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('404');
  await page.keyboard.press('Home'); await expect(first).toHaveAttribute('aria-selected', 'true');
});

test('task links restore filters and hidden selections can be removed by name', async ({ page }) => {
  await open(page, route + '?task=speed&access=free');
  await expect(page.getByLabel('Audit task', { exact: true })).toHaveValue('speed');
  await expect(page.locator('.tool-record:visible')).toHaveCount(2);
  await page.getByRole('checkbox', { name: 'Compare Google Lighthouse', exact: true }).check();
  await page.locator('#tool-lighthouse').getByRole('button', { name: 'View selection' }).click();
  await expect(page.locator('#selection-count')).toBeFocused();
  await page.getByLabel('Audit task', { exact: true }).selectOption('search');
  await expect(page.locator('#tool-lighthouse')).toBeHidden();
  await page.getByRole('button', { name: 'Remove Google Lighthouse', exact: true }).click();
  await expect(page.getByLabel('Search tools')).toBeFocused();
  await expect(page.locator('#selection-count')).toHaveText('0 of 3 selected');
  await page.reload();
  await expect(page.getByLabel('Audit task', { exact: true })).toHaveValue('search');
  await expect(page.locator('.tool-record:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page).toHaveURL(new RegExp('/website-audit-tools/$'));
});

for (const width of [1440, 390, 320]) {
  test(`category render, accessibility and comparison reflow at ${width}px`, async ({ page }) => {
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 }); await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page); await page.evaluate(() => document.fonts.ready);
    await fs.mkdir('qa-output', { recursive: true });
    await page.screenshot({ path: `qa-output/after-tools-${width}.png`, fullPage: true });
    await page.screenshot({ path: `qa-output/after-tools-${width}-top.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    await page.getByRole('checkbox', { name: 'Compare Google Lighthouse', exact: true }).check();
    await page.getByRole('checkbox', { name: 'Compare WAVE', exact: true }).check();
    await page.getByRole('button', { name: 'Compare selected', exact: true }).click();
    const table = page.getByRole('region', { name: 'Selected tool comparison', exact: true });
    await table.focus(); await page.keyboard.press('ArrowRight');
    if (width < 650) expect(await table.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    await page.locator('#tool-comparison').screenshot({ path: `qa-output/after-compare-${width}.png` });
    expect(errors).toEqual([]);
  });
}
