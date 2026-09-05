# Visual redesign validation

## Scope and evidence

Homepage rebuilt around a documented owned-site finding. Toolkit previews show the actual PDF and an excerpt read from the downloadable Markdown template at build time. Guide additions explain a real finding and Google's crawl/index/serve stages. Shared navigation and contents have visible current/focus states; duplicate newsletter modules were removed. Existing URLs and download files remain stable.

Service copy was corrected because the new primary action leads there: unsupported client counts, conflicting guarantees, popularity labels and fixed outcome promises were removed. Final scope, timing, support and terms must be agreed before commissioning work.

## Critique rounds

1. Inspected full desktop/mobile homepage, toolkit and representative guide/service screenshots. The finding provided a clear visual focus. Mobile headline wrapping and unequal resource preview heights needed refinement. Tightened the narrow headline, reduced the finding record's mobile height and aligned desktop resource previews. First test run: 11/12 passed; remaining failure was a test selector assuming the newsletter used the enquiry endpoint. Corrected it to assert exactly one Subscribe button.
2. Inspected 1440px, 390px and 320px renders after refinement. The headline and controls fit; evidence and download previews remained readable. All 12 tests passed. Shortened duplicated toolkit/guide introductions to bring evidence forward and recorded actual content update dates.

## Release checks

- Supported Node 22 production build: 179 pages.
- Rendered HTML validator: 179 files, zero errors and zero warnings.
- Dependency audit: zero reported vulnerabilities.
- Source/public/build secret-pattern scan: no matches. Historical named sensitive paths: no commits. GitHub repository verified public. No credentials added.
- Internal targets from homepage, toolkit, guide and service page: no missing local assets/pages.
- Browser suite covers checker evidence, inert pasted HTML, downloads, consent, navigation, focus, reduced motion, reflow and axe WCAG A/AA at 1440/390/320. New tests verify service/checker scope, early proof, real previews and keyboard contents.
- New preview: 893 × 1263 pixels, 117,461 bytes, explicit dimensions and lazy loading. The original six-page PDF and ZIP are unchanged.
- Local mobile sample after round 2: CLS 0.0038 and measured LCP 168ms; this is an unthrottled local observation, not field Core Web Vitals. Homepage budget is 300KB of observable encoded resources. Cross-origin resources without timing exposure may be absent from byte totals.
- Homepage height at 390px: 6,513px after round 2 versus 12,897px before the redesign.

## Editorial review

The semantic-audit rubric was applied as an editorial self-review, not an automated search ranking metric. New copy starts with its subject/action, preserves evidence limits and avoids the prohibited filler phrases. The page types intentionally keep useful navigation, download links and conversion controls; article-only limits on link placement are not suitable for these interfaces.

Editorial scores: homepage 89/100; toolkit 91/100; service page 90/100; guide visual additions and revised introduction 90/100; AuditFinding 93/100; SearchJourney 92/100. The retained legacy guide body is not represented as a newly researched article. H1/H2/H3 structure and all rendered links were checked across the full output. Internal strategy/validation notes are not search-targeted content.

## Design scorecard and limits

| Category | Score | Evidence / remaining limit |
|---|---:|---|
| Brand distinctiveness | 8/10 | Actual response-code evidence and reusable finding treatment replace generic effects; a wider brand system could follow. |
| Visual hierarchy | 8/10 | Evidence moved into the hero; homepage roughly halved; long legacy guides still merit editing. |
| UX and conversion | 8/10 | Explicit paid/free scope, real previews, keyboard contents and clearer resource routes. Conversion uplift has not been measured. |
| Trust | 8/10 | Owned evidence disclosed; unsupported homepage/service guarantees removed. This is not a factual recertification of every legacy page. |
| Accessibility | 8/10 | Axe and keyboard/reflow checks pass on representative pages; no full screen-reader evaluation. |
| Technical quality | 8/10 | Build, HTML, dependencies and browser checks; lab evidence does not establish field performance. |

In-app browser discovery returned no browser in this session. Isolated local Playwright Chromium was used for public pages. No outbound form submission was made, so email delivery is not re-certified by this release. The existing submission endpoints were retained.

Exact release revision and live verification are recorded in the external release evidence directory after deployment. Local QA logs/screenshots are in ignored `qa-output/`; no private baseline analytics are committed.
