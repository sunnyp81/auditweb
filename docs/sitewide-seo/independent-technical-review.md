# Independent review: technical and accessibility slice

Reviewed 2026-09-11 against the current source files assigned to `technical_access`. This was a read-only editorial and technical review; no page source was changed. Findings are ordered by practical risk. Line numbers refer to the reviewed working tree and may move as fixes are applied.

## Findings

### P1 — remove obsolete `X-XSS-Protection` implementation advice

- `src/pages/website-audit-checklist/security.astro:57` tells readers to set `X-XSS-Protection: 1; mode=block` as an extra security layer.
- MDN marks the header deprecated and non-standard, warns that it can create XSS vulnerabilities in otherwise safe sites, and recommends a strong Content Security Policy instead: [MDN: X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-XSS-Protection).
- Change: remove the universal implementation instruction. If legacy-browser behaviour is retained for historical context, label it deprecated and make CSP plus output encoding the current guidance.

### P1 — correct the WCAG 2.2 conformance rules

- `src/pages/website-accessibility-audit/checklist.astro:61` says touch targets must be 44 by 44 CSS pixels and that smaller controls fail. WCAG 2.2 AA criterion 2.5.8 uses 24 by 24 CSS pixels with five exceptions; 44 by 44 is the AAA criterion 2.5.5.
- `src/pages/website-accessibility-audit/checklist.astro:58` and `src/pages/website-audit-checklist/accessibility.astro:54` present a first-focusable skip link as the required implementation. WCAG 2.4.1 requires a mechanism to bypass repeated blocks. A skip link is one sufficient technique; headings, landmarks, or other conforming mechanisms can also satisfy the criterion.
- `src/pages/website-accessibility-audit/wcag.astro:61` assigns prerecorded captions to criterion 1.2.1. Criterion 1.2.1 covers prerecorded audio-only/video-only alternatives; prerecorded synchronized-media captions are 1.2.2.
- Change: distinguish Level AA requirements from recommended/AAA enhancements and fix the criterion number. Source: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [W3C Understanding 2.4.1](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html).

### P1 — replace false Google crawling and indexing diagnostics

- `src/pages/technical-website-audit/index.astro:111-113` claims broad core updates increasingly weight UX, technically clean sites recover faster, and position 3 versus 7 often comes down to technical execution. Those causal ranking and recovery claims are unsupported.
- `src/pages/technical-website-audit/index.astro:117` says a page Google cannot crawl will not be indexed. Google documents that a robots-blocked URL can still appear in results based on links and other signals.
- `src/pages/technical-website-audit/index.astro:132` says an effective sitemap should exclude every paginated URL after page one. Google recommends a unique URL and self-referencing canonical for each component page and does not impose that blanket exclusion.
- `src/pages/technical-website-audit/index.astro:136,243` says the Page Indexing report reveals exactly which pages Google tried and exact reasons for exclusion, then equates “Crawled — currently not indexed” with thin, duplicate, or low-quality content. Google limits example URL lists to 1,000 rows and defines that state only as crawled but not indexed; the page may be indexed later.
- `src/pages/technical-website-audit/index.astro:150` treats any sitemap/log URL missing from a crawl as a proven orphan that needs links. It may instead be outside crawl scope, blocked, non-canonical, redirected, or absent from the crawl seed; confirm internal inlinks before classifying it.
- Change: describe each signal as evidence to investigate, remove causal ranking language, and preserve uncertainty. Sources: [Google robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro), [Google Page Indexing report](https://support.google.com/webmasters/answer/7440203?hl=en), and [Google pagination guidance](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading).

### P1 — stop presenting OWASP Top 10 and invented experience as audit evidence

- `src/pages/website-security-audit/web-app.astro:64` says a thorough audit tests all ten OWASP Top 10 categories and attributes the chosen categories to what is “most commonly found in our audit work.”
- `src/pages/website-security-audit/web-app.astro:100,106` calls security misconfiguration the most common finding and usually the easiest class to exploit and fix, rarely requiring code changes. These are context-dependent superlatives without evidence.
- `src/pages/website-security-audit/web-app.astro:110` says the methodology draws on “our own audit experience,” which is an unsupported first-hand claim.
- OWASP describes the Top 10 as an awareness document and bare minimum; it recommends ASVS for verifiable application-security requirements.
- Change: remove the first-hand and prevalence claims. Define scope from the application, threat model, authorised test plan, OWASP ASVS requirements, and appropriate WSTG tests. Source: [OWASP Top 10: establishing an application security program](https://owasp.org/Top10/2025/0x03_2025-Establishing_a_Modern_Application_Security_Program/).

### P2 — make the report template evidence-led throughout

- `src/pages/technical-website-audit/report-template.astro:35` calls the format “proven” without evidence. Line 49 recommends security findings because their consequences are “frightening,” contradicting the evidence-over-fear rule at line 103.
- `src/pages/technical-website-audit/report-template.astro:109` says every exposed file, including a CMS readme, is an attack vector and directs readers to rate all such findings critical. Exposure and severity vary by content, exploitability, access controls, and affected assets.
- `src/pages/technical-website-audit/report-template.astro:111` treats a component not updated for one year as a security finding and calls outdated CMS components the single most common entry point. Age alone does not establish a vulnerability.
- `src/pages/technical-website-audit/report-template.astro:139` instructs report writers to prescribe exact generic robots.txt and Nginx security-header blocks, while line 107 correctly warns against pasting a generic policy into production. The exact configuration must follow environment and functional testing.
- Change: remove “proven,” fear, prevalence, and age-only claims; grade security issues from verified exposure and impact; require the implementation owner to validate environment-specific configuration.

### P2 — remove unsafe universal WordPress rules

- `src/pages/website-audit-checklist/wordpress.astro:43` says `WP_DEBUG` must be false because debug mode displays errors. WordPress can keep debugging/logging enabled while `WP_DEBUG_DISPLAY` is false; the audit should check display and logging settings separately.
- `src/pages/website-audit-checklist/wordpress.astro:52` says all plugins should always be updated and calls outdated plugins the primary attack vector. Updates should be prioritized by known vulnerability, support status, compatibility, exposure, and tested deployment rather than blanket immediacy.
- `src/pages/website-audit-checklist/wordpress.astro:94-95` presents 755/644 and 400/440 permissions plus a 403/redirect response for `wp-config.php` as universal pass conditions. WordPress says permissions depend on the host and installation; a PHP-executed config can return an empty 200 without disclosure, so inspect exposure rather than status alone.
- `src/pages/website-audit-checklist/wordpress.astro:109` says WordPress creates attachment pages by default for every upload. New WordPress 6.4 installations disable attachment pages by default; existing sites may retain the older behaviour.
- Change: make every test environment- and version-aware and verify response content/exposure. Sources: [WordPress `wp_debug_mode()`](https://developer.wordpress.org/reference/functions/wp_debug_mode/), [WordPress hardening](https://developer.wordpress.org/advanced-administration/security/hardening/), and [WordPress attachment-page change](https://make.wordpress.org/core/2023/10/16/changes-to-attachment-pages/).

### P2 — remove fixed redesign cut and recovery rules

- `src/pages/website-audit-checklist/redesign.astro:39,98` refers to the retired Search Console “Coverage report”; the current name is Page Indexing report. The claim that failing to export means losing the comparison “forever” is too absolute because other retained analytics, rank tracking, logs, and exports may exist.
- `src/pages/website-audit-checklist/redesign.astro:44` uses zero impressions over six months as a content-removal rule. That ignores seasonality, non-search purpose, conversion value, backlinks, new content, and measurement gaps.
- `src/pages/website-audit-checklist/redesign.astro:101` says ranking non-recovery within four to six weeks implies a page-specific issue. Site moves have no universal recovery deadline; diagnose URL groups, redirects, canonicals, rendering, tracking, demand, and crawl/index state.
- Change: rename the report, keep baseline exports as a strong recommendation, and replace the fixed cut/recovery thresholds with evidence-based decision criteria. Source: [Google site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

### P2 — update obsolete protocol advice and conditional performance checks

- `src/pages/technical-website-audit/speed.astro:67` presents server push as a current HTTP/2/3 benefit. Chrome removed HTTP/2 server push and advises moving away from it.
- `src/pages/technical-website-audit/speed.astro:42,45` presents Lighthouse FCP and Speed Index scoring boundaries as universal targets rather than lab metrics interpreted with device, network, template, and field evidence.
- `src/pages/technical-website-audit/speed.astro:113-121` requires every image to be WebP/AVIF, every hero image to be preloaded, a CDN for every site, and zero render-blocking resources. Those are implementation options whose benefit and safety depend on measured bottlenecks, browser negotiation, origin geography, request priority, and CSS/JS design.
- Change: remove server push and turn the checklist into trace-based questions with representative field/lab conditions. Source: [Chrome: removing HTTP/2 server push](https://developer.chrome.com/blog/removing-push) and [Chrome Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview).

### P2 — correct HTML/CSS claims and remove arbitrary regression thresholds

- `src/pages/technical-website-audit/code.astro:56` says anchors without `href` and form controls without labels are HTML validation errors. An `a` element may omit `href`; accessible naming/conformance needs a separate accessibility test and is not equivalent to validator output.
- `src/pages/technical-website-audit/code.astro:74` says mobile-first CSS makes mobile devices load only mobile styles while desktop-first forces them to load all desktop styles. Media-query direction does not by itself determine stylesheet transfer; CSS delivery, rule matching, cascade complexity, and build splitting are separate concerns.
- `src/pages/technical-website-audit/code.astro:128` invents 10 KB JavaScript, 5 KB CSS, and 100-node change thresholds after lines 66 and 80 correctly reject universal budgets.
- Change: separate validity from accessibility, describe media-query effects accurately, and derive regression budgets from representative page baselines and user conditions. Source: [WHATWG HTML Living Standard](https://html.spec.whatwg.org/) and [Chrome DevTools Coverage](https://developer.chrome.com/docs/devtools/coverage).

### P3 — qualify unsupported ecommerce conversion rules

- `src/pages/website-audit-checklist/ecommerce.astro:72` calls account creation the single largest abandonment source. Line 85 mandates a 300 ms product-search response and says slower search pushes users to Google. Lines 104 and 108 promise conversion improvement from sticky add-to-cart and one-tap payments.
- Change: frame these as hypotheses to test with owned funnel/search data and controlled experiments. Measure completion, errors, latency, abandonment, and conversion by device rather than promising a universal effect.

### P3 — remove accessibility-tool certainty and time promises

- `src/pages/website-accessibility-audit/tools.astro:40` says axe has zero false positives and every reported issue is definitely a real failure. Automated results still need contextual review, especially when page state, component semantics, or test configuration affect the result.
- `src/pages/website-accessibility-audit/tools.astro:121` says a full keyboard test takes five to ten minutes per page and requires no expertise. Complex widgets, state changes, task flows, and representative templates can require more time and informed judgment.
- Change: explain the tool’s conservative rule design without guaranteeing certainty, and scope manual-test effort by templates, states, and interaction paths.

## Review boundaries and checks

- Read the current frontmatter, visible body copy, FAQ/schema data, retained guidance, links, and calls to action across the 32-file technical/accessibility ownership slice. The findings above focus on concrete residual claims; absence from this list is not a release certification.
- Excluded known root-owned fixes in `src/pages/website-security-audit/index.astro` concerning invented audit experience, HTTPS ranking-weight claims, blanket “minutes” security-header implementation, and automatic audit cadence. Also excluded root-owned shared privacy/cookie controls, canonical entity/schema, and the main website-audit guide.
- No source edits, build, browser run, or deployment check was performed. Root owns integrated structural, render, and browser validation.

## Final resolution readback by root

Root checked the final source against all 11 finding groups and the additional checklist/GDPR/report consistency findings. The corrected areas now distinguish current standards, scope and evidence from universal rules. Root also removed the remaining status-200-as-disclosure rule, fixed WordPress database-cleanup and font-delivery prescriptions, and removed unsupported security prevalence and tool-certainty claims. The final source retains the original route and anchor structure. Integrated build, HTML, graph, interaction and browser results are recorded separately.
