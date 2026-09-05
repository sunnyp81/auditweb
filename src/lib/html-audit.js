export const MAX_HTML_BYTES = 1_000_000;

export function publicPageUrl(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Enter an HTTP or HTTPS page URL without a username or password.');
  }
  url.hash = '';
  return url;
}

// Template contents are inert: never attach the supplied markup to the live DOM.
export function auditHtml(markup, pageUrl, ownerDocument = document) {
  const page = publicPageUrl(pageUrl);
  if (new TextEncoder().encode(markup).length > MAX_HTML_BYTES) throw new Error('Paste less than 1 MB of HTML.');
  if (!/<[a-z][\s\S]*>/i.test(markup)) throw new Error('Paste HTML source, not a URL or plain text.');
  const template = ownerDocument.createElement('template');
  template.innerHTML = markup;
  const root = template.content;
  const checks = [];
  const add = (name, status, evidence, nextStep) => checks.push({ name, status, evidence, nextStep });
  const titles = [...root.querySelectorAll('title')];
  const title = titles[0]?.textContent.trim() || '';
  add('Page title', titles.length === 1 && title ? 'Observed' : 'Review',
    `${titles.length} title element(s). ${title ? `First title (${title.length} characters): ${title}` : 'No non-empty title found.'}`,
    'Use one accurate, descriptive title. Character count is context, not a fixed Google limit.');
  const metas = [...root.querySelectorAll('meta')];
  const named = name => metas.filter(el => (el.getAttribute('name') || '').toLowerCase() === name);
  const descriptions = named('description');
  add('Meta description', descriptions.length === 1 && descriptions[0].getAttribute('content')?.trim() ? 'Observed' : 'Review',
    `${descriptions.length} description tag(s). ${descriptions[0]?.getAttribute('content') || 'No description content found.'}`,
    'Describe what the page actually provides. Google may choose a different snippet.');
  const canonical = [...root.querySelectorAll('link')].filter(el => (el.getAttribute('rel') || '').toLowerCase().split(/\s+/).includes('canonical'));
  let base = page.href;
  const declaredBase = root.querySelector('base[href]')?.getAttribute('href');
  if (declaredBase) {
    try { base = new URL(declaredBase, page).href; } catch { add('Base URL', 'Review', 'The base href cannot be resolved.', 'Correct or remove the invalid base element.'); }
  }
  if (canonical.length !== 1) {
    add('Canonical URL', 'Review', `${canonical.length} canonical link elements found.`, 'Check the intended preferred URL. This tool cannot see HTTP-header canonicals.');
  } else {
    const raw = canonical[0].getAttribute('href');
    try {
      if (!raw?.trim()) throw new Error();
      const resolved = new URL(raw, base);
      publicPageUrl(resolved.href);
      const same = resolved.href === page.href;
      add('Canonical URL', same && !resolved.hash ? 'Observed' : 'Review',
        `${resolved.href}${same ? ' (matches the supplied page URL)' : ' (differs from the supplied page URL)'}`,
        'Confirm the preferred URL. A different canonical can be intentional. Google-selected canonical and destination status are not checked.');
    } catch { add('Canonical URL', 'Review', 'Canonical href is empty, invalid or uses an unsupported scheme.', 'Use a valid HTTP or HTTPS canonical URL.'); }
  }
  const robotTags = [...named('robots'), ...named('googlebot')];
  const directives = robotTags.map(el => `${el.getAttribute('name')}: ${el.getAttribute('content') || '(empty)'}`);
  const blocksIndexing = robotTags.some(el => /(?:^|[\s,])(?:noindex|none)(?:$|[\s,])/i.test(el.getAttribute('content') || ''));
  add('HTML indexing directives', blocksIndexing ? 'Review' : 'Observed',
    directives.join('; ') || 'No robots or googlebot meta directives found.',
    blocksIndexing ? 'A noindex/none directive is present. Keep it for pages that should stay out of search; remove it only if unintended.' : 'No HTML noindex found. This does not prove indexability: headers, robots.txt and Google indexing are not checked.');
  const headings = [...root.querySelectorAll('h1')];
  add('Main heading', headings.length === 1 && headings[0].textContent.trim() ? 'Observed' : 'Review',
    `${headings.length} H1 element(s). ${headings[0]?.textContent.trim() || 'No non-empty H1 found.'}`,
    'Check that the page has a clear main heading. Multiple H1 elements are a review prompt, not proof of a ranking penalty.');
  const images = [...root.querySelectorAll('img')];
  const missingAlt = images.filter(el => !el.hasAttribute('alt')).length;
  const emptyAlt = images.filter(el => el.getAttribute('alt') === '').length;
  add('Image alt attributes', missingAlt ? 'Review' : images.length ? 'Observed' : 'Not checked',
    `${images.length} images; ${missingAlt} missing alt attributes; ${emptyAlt} empty alt attributes.`,
    'Describe informative images. Empty alt can be correct for decoration. This check cannot judge whether descriptions are useful.');
  const viewport = named('viewport');
  add('Viewport metadata', viewport.some(el => /width\s*=\s*device-width/i.test(el.getAttribute('content') || '')) ? 'Observed' : 'Review',
    viewport.map(el => el.getAttribute('content')).join('; ') || 'No viewport meta tag found.',
    'A device-width viewport supports responsive layouts. Test actual mobile reflow separately.');
  const og = metas.filter(el => (el.getAttribute('property') || '').toLowerCase() === 'og:image');
  add('Social preview image', og.some(el => el.getAttribute('content')?.trim()) ? 'Observed' : 'Review',
    og.map(el => el.getAttribute('content')).join('; ') || 'No og:image content found.',
    'Verify the image URL loads and represents the page. Image availability is not checked here.');
  return { checkedAt: new Date().toISOString(), scope: 'Pasted HTML only; no website fetched', checks };
}

export function reportMarkdown(report) {
  const quote = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').split('\n').map(line => '> ' + line).join('\n');
  return ['# AuditWeb HTML review', '', `Checked: ${report.checkedAt}`, `Scope: ${report.scope}`,
    'Observed means an element was found. It is not a ranking, accessibility or security certification.', '',
    ...report.checks.flatMap(c => [`## ${c.name}: ${c.status}`, '', quote(c.evidence), '', c.nextStep, ''])].join('\n');
}
