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
