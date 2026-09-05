import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const paths = ['/free-website-audit/', '/resources/agency-audit-toolkit/', '/case-studies/auditweb-self-audit/', '/website-audit-checklist/template/', '/'];

test('checker uses input evidence, resolves canonicals, exports and clears', async ({ page }) => {
  await page.goto('/free-website-audit/');
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  await page.getByRole('button', { name: 'Load example' }).click();
  await page.getByRole('button', { name: 'Check HTML', exact: true }).click();
  await expect(page.locator('#audit-checks')).toContainText('robots: noindex');
  await expect(page.locator('#audit-checks')).toContainText('1 missing alt attributes');
  await expect(page.locator('#audit-checks')).toContainText('https://example.com/ (matches');
  const source = '<html><head><title>Checked page</title><base href="https://example.com/sub/"><link rel="canonical" href="target"></head><body><h1>Heading</h1><img alt=""></body></html>';
  await page.locator('#audit-html').fill(source);
  await expect(page.locator('#audit-results')).toBeHidden();
  await page.getByRole('button', { name: 'Check HTML', exact: true }).click();
  await expect(page.locator('#audit-checks')).toContainText('https://example.com/sub/target');
  await expect(page.locator('#audit-checks')).toContainText('0 missing alt attributes; 1 empty');
  await expect(page.locator('#audit-checks')).toContainText('No robots or googlebot');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download findings (.md)' }).click();
  const download = await downloadPromise;
  expect(await fs.readFile(await download.path(), 'utf8')).toContain('Checked page');
  await page.getByRole('button', { name: 'Clear', exact: true }).click();
  await expect(page.locator('#audit-html')).toHaveValue('');
  await expect(page.locator('#audit-results')).toBeHidden();
});

test('untrusted pasted HTML is inert and invalid or large input gets an error', async ({ page }) => {
  await page.goto('/free-website-audit/');
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  const requests = [];
  page.on('request', req => { if (req.url().includes('audit-probe.invalid')) requests.push(req.url()); });
  await page.locator('#audit-page-url').fill('https://example.com/');
  await page.locator('#audit-html').fill('<script>window.pastedCodeRan=true</script><img src="https://audit-probe.invalid/image" onerror="window.pastedCodeRan=true"><iframe src="https://audit-probe.invalid/frame"></iframe><title>&lt;img src=x onerror=alert(1)&gt;</title>');
  await page.getByRole('button', { name: 'Check HTML', exact: true }).click();
  await expect(page.locator('#audit-results')).toBeVisible();
  expect(await page.evaluate(() => window.pastedCodeRan)).toBeUndefined();
  expect(requests).toEqual([]);
  expect(await page.locator('#audit-results img, #audit-results iframe, #audit-results script').count()).toBe(0);
  await page.locator('#audit-html').fill('plain text');
  await page.getByRole('button', { name: 'Check HTML', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Paste HTML source');
  await page.locator('#audit-html').fill('<p>' + 'x'.repeat(1_000_001) + '</p>');
  await page.getByRole('button', { name: 'Check HTML', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('less than 1 MB');
});

test('duplicates, none directive, empty canonical and untested images are explicit', async ({ page }) => {
  await page.goto('/free-website-audit/');
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  await page.locator('#audit-page-url').fill('https://example.com/');
  await page.locator('#audit-html').fill('<title>A</title><title>B</title><link rel="canonical" href=""><meta name="GOOGLEBOT" content="NONE"><h1>One</h1><h1>Two</h1>');
  await page.getByRole('button', { name: 'Check HTML', exact: true }).click();
  await expect(page.locator('#audit-checks')).toContainText('2 title element');
  await expect(page.locator('#audit-checks')).toContainText('Canonical href is empty');
  await expect(page.locator('#audit-checks')).toContainText('noindex/none directive is present');
  await expect(page.locator('#audit-checks')).toContainText('Image alt attributes — Not checked');
});

for (const width of [1440, 390, 320]) {
  test(`growth pages reflow and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const path of paths) {
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
      if (await page.getByRole('button', { name: 'Reject', exact: true }).isVisible()) await page.getByRole('button', { name: 'Reject', exact: true }).click();
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
      await fs.mkdir('qa-output', { recursive: true });
      await page.screenshot({ path: `qa-output/${width}-${path.replaceAll('/', '_') || 'home'}.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
    if (width < 768) {
      const toggle = page.getByRole('button', { name: 'Toggle menu' });
      await toggle.click(); await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await page.keyboard.press('Escape'); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(toggle).toBeFocused();
    }
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle)).not.toBe('none');
  });
}

test('download routes serve real assets and missing routes return 404', async ({ request }) => {
  const zip = await request.get('/downloads/auditweb-agency-audit-toolkit.zip');
  expect(zip.status()).toBe(200); expect((await zip.body()).subarray(0, 2).toString()).toBe('PK');
  const pdf = await request.get('/downloads/auditweb-website-audit-checklist.pdf');
  expect(pdf.status()).toBe(200); expect((await pdf.body()).subarray(0, 4).toString()).toBe('%PDF');
  expect((await request.get('/codex-growth-missing-20260905/')).status()).toBe(404);
});

test('growth events respect consent and contain no supplied page data', async ({ page }) => {
  await page.route('**/googletagmanager.com/**', route => route.fulfill({ status: 200, body: '' }));
  await page.goto('/free-website-audit/');
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  await page.getByRole('button', { name: 'Load example' }).click();
  await page.getByRole('button', { name: 'Check HTML', exact: true }).click();
  expect(await page.evaluate(() => window.dataLayer.filter(event => event[0] === 'event').length)).toBe(0);
  await page.evaluate(() => localStorage.setItem('cookie-consent', 'accepted'));
  await page.reload();
  await page.locator('#audit-page-url').fill('https://example.com/private-marker');
  await page.locator('#audit-html').fill('<title>PRIVATE_CONTENT_MARKER</title>');
  await page.getByRole('button', { name: 'Check HTML', exact: true }).click();
  const events = await page.evaluate(() => window.dataLayer.filter(event => event[0] === 'event').map(event => Array.from(event)));
  expect(events).toContainEqual(['event', 'html_check_complete', {}]);
  expect(JSON.stringify(events)).not.toContain('PRIVATE_CONTENT_MARKER');
  expect(JSON.stringify(events)).not.toContain('private-marker');
});

test('record a reproducible local mobile performance sample and social preview', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    window.auditLab = { lcp: null, cls: 0 };
    new PerformanceObserver(list => { for (const entry of list.getEntries()) window.auditLab.lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.auditLab.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('/free-website-audit/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('#audit-html')).toBeVisible();
  const sample = await page.evaluate(() => ({ ...window.auditLab, navigation: performance.getEntriesByType('navigation')[0].toJSON(), viewport: { width: innerWidth, height: innerHeight }, resources: performance.getEntriesByType('resource').map(r => ({ name: new URL(r.name).pathname, bytes: r.transferSize, duration: r.duration })) }));
  await fs.mkdir('qa-output', { recursive: true });
  await fs.writeFile('qa-output/performance-sample.json', JSON.stringify(sample, null, 2));
  expect(sample.cls).toBeLessThanOrEqual(0.1);
  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.screenshot({ path: 'qa-output/og-default.png' });
});
