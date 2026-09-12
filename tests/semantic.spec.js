import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

test('report journey exposes working blank and completed downloads', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  await page.locator('main a[href="/website-audit-services/report-example/"]').first().click();
  await expect(page).toHaveURL(/\/website-audit-services\/report-example\/$/);
  const header = page.locator('article header');
  for (const [file, marker] of [
    ['agency-audit-toolkit/audit-report-template.md', 'Scope'],
    ['auditweb-completed-report-example.md', 'F'],
  ]) {
    const link = header.locator(`a[href="/downloads/${file}"]`);
    await expect(link).toBeVisible();
    await link.focus();
    await expect(link).toBeFocused();
    const downloaded = page.waitForEvent('download');
    await page.keyboard.press('Enter');
    const download = await downloaded;
    const text = await fs.readFile(await download.path(), 'utf8');
    expect(text.length).toBeGreaterThan(500);
    expect(text).toContain(marker);
    expect(text).not.toMatch(/<!doctype html/i);
    if (file.includes('completed')) {
      expect(text).toContain('404');
      expect(text).toContain('noindex');
      expect(text).not.toMatch(/\[insert|\[client|\[specific/i);
    }
  }
});

test('diagnosis connects to reporting and the completed report', async ({ page }) => {
  await page.goto('/seo-website-audit/');
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  await page.locator('main a[href="/seo-website-audit/rankings-drop/"]').first().click();
  await expect(page.locator('h1')).toContainText('Rankings Drop Audit');
  await page.locator('.prose a[href="/seo-website-audit/report/"]').first().click();
  await expect(page.locator('h1')).toContainText('SEO Audit Report');
  await page.locator('.prose a[href="/website-audit-services/report-example/"]').first().click();
  await expect(page.locator('article header a[download]')).toHaveCount(2);
});

test('remote service variants preserve access and consolidate search signals', async ({ page, request }) => {
  const response = await page.goto('/website-audit-services/london/');
  expect(response.status()).toBe(200);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://auditweb.site/website-audit-services/');
  await expect(page.locator('main')).toContainText(/remote/i);
  const robots = await page.locator('meta[name="robots"]').evaluateAll(tags => tags.map(tag => tag.content).join(','));
  expect(robots).not.toContain('noindex');
  const sitemap = await request.get('/sitemap-0.xml');
  const xml = await sitemap.text();
  expect(xml).toContain('<loc>https://auditweb.site/website-audit-services/</loc>');
  expect(xml).not.toContain('/website-audit-services/london/');
  expect(xml).toContain('<loc>https://auditweb.site/about/</loc>');
  expect(xml).not.toMatch(/<loc>[^<]*\/(?:404(?:\.html)?|thank-you|subscribed)\/?<\/loc>/);
});

test('editorial attribution resolves to a visible publisher and methods page', async ({ page }) => {
  await page.goto('/website-backlink-audit/');
  const graphs = await page.locator('script[type="application/ld+json"]').evaluateAll(scripts => scripts.flatMap(script => {
    const data = JSON.parse(script.textContent);
    return data['@graph'] || [data];
  }));
  const article = graphs.find(node => node['@type'] === 'Article');
  const publisher = graphs.find(node => node['@id'] === article.publisher['@id']);
  expect(publisher['@type']).toBe('Organization');
  expect(publisher.name).toBe('AuditWeb');
  expect(article.author['@id']).toBe(publisher['@id']);
  await page.locator('article header a[href="/about/"]').click();
  await expect(page.locator('h1')).toContainText('About AuditWeb');
  await expect(page.locator('main')).toContainText('owned-site evidence');
});

test('cookie settings reopen and withdraw analytics consent without removing unrelated cookies', async ({ page, context }) => {
  let analyticsLoads = 0;
  await page.route('https://www.googletagmanager.com/**', route => {
    analyticsLoads++;
    return route.fulfill({ status: 200, body: '' });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  const settings = page.getByRole('button', { name: 'Cookie settings', exact: true });
  await settings.click();
  await expect(page.locator('#cookie-reject')).toBeFocused();
  await Promise.all([page.waitForEvent('load'), page.locator('#cookie-accept').click()]);
  await expect.poll(() => analyticsLoads).toBe(1);
  await page.evaluate(() => {
    document.cookie = '_ga=qa-cookie; path=/';
    document.cookie = '_ga_V53FDBZLTW=qa-session; path=/';
    document.cookie = 'auditweb_qa_preference=keep; path=/';
  });
  await settings.click();
  await Promise.all([page.waitForEvent('load'), page.locator('#cookie-reject').click()]);
  expect(await page.evaluate(() => localStorage.getItem('cookie-consent'))).toBe('rejected');
  expect(analyticsLoads).toBe(1);
  const cookies = await context.cookies();
  expect(cookies.some(cookie => cookie.name.startsWith('_ga'))).toBe(false);
  expect(cookies.find(cookie => cookie.name === 'auditweb_qa_preference')?.value).toBe('keep');
  await settings.click();
  await page.locator('#cookie-reject').click();
  await expect(settings).toBeFocused();
});
