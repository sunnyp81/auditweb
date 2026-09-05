import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

test('homepage separates service scope from HTML checker and brings evidence forward', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  await expect(page.locator('.hero-actions a').first()).toHaveAttribute('href', '/website-audit-services/');
  await expect(page.locator('.scope-note')).toContainText('pasted HTML');
  await expect(page.locator('.finding-sheet')).toContainText('Owned-site example');
  expect(await page.locator('#our-self-audit').evaluate(el => el.getBoundingClientRect().top)).toBeLessThan(1800);
  await expect(page.locator('main')).not.toContainText('Money-Back Guarantee');
  await expect(page.locator('main')).not.toContainText('Most Popular');
  await expect(page.getByRole('button', { name: 'Subscribe', exact: true })).toHaveCount(1);
});

test('toolkit preview loads and the guide contents work with a keyboard', async ({ page }) => {
  await page.goto('/resources/agency-audit-toolkit/');
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  const preview = page.locator('.pdf-preview img');
  await preview.scrollIntoViewIfNeeded();
  await expect(preview).toBeVisible();
  await expect.poll(() => preview.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(page.locator('.markdown-preview')).toContainText('Risk and dependencies');
  await page.goto('/website-audit/');
  const contents = page.getByText('Jump to a section', { exact: true });
  await contents.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('link', { name: 'An Actual Audit Finding' })).toBeVisible();
  await page.getByRole('link', { name: 'An Actual Audit Finding' }).click();
  await expect(page).toHaveURL(/#audit-finding-example$/);
  expect(await page.locator('#audit-finding-example').evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(64);
});

test('homepage has a reproducible mobile resource and layout baseline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    window.visualLab = { lcp: null, cls: 0 };
    new PerformanceObserver(list => { for (const e of list.getEntries()) window.visualLab.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.visualLab.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  const metrics = await page.evaluate(() => ({ ...window.visualLab, viewport: { width: innerWidth, height: innerHeight }, height: document.body.scrollHeight, resources: performance.getEntriesByType('resource').map(r => ({ path: new URL(r.name).pathname, bytes: r.encodedBodySize })) }));
  await fs.mkdir('qa-output', { recursive: true });
  await fs.writeFile('qa-output/home-performance.json', JSON.stringify(metrics, null, 2));
  expect(metrics.cls).toBeLessThanOrEqual(0.1);
  expect(metrics.resources.reduce((sum, r) => sum + r.bytes, 0)).toBeLessThan(300000);
});
