# Organic growth asset validation - 5 September 2026

## Scope

Three connected assets: a real pasted-HTML diagnostic tool, editable agency workflow documents and a documented self-audit. Existing free-audit URLs now describe the implemented product. The earlier 50-check PDF is included in the downloadable toolkit.

The checker reads supplied HTML only. It does not fetch sites, measure speed, validate SSL or confirm Google indexing. Pasted markup remains in an inert template and is never attached to the live document. Findings are rendered as text; exported HTML characters are escaped. Input is limited to 1 MB. No backend credentials or new paid service are required.

## Checks

- Production build: 179 static pages, including an actual 404 document.
- Rendered HTML validator: 179 files, zero errors, zero warnings after shared label and heading fixes.
- Browser tests: nine scenarios cover real findings, canonical resolution, unknown states, duplicate metadata, hostile markup, size errors, downloads, consent-aware events, mobile reflow, accessibility, keyboard navigation and a local performance sample.
- Desktop/mobile: five representative pages tested at 1440, 390 and 320 pixels. Axe WCAG A/AA checks pass. Desktop and mobile screenshots inspected in two passes; fixed homepage contrast, shortened checker header and emphasised toolkit download.
- Console: no page JavaScript errors in the representative-page runs. Pasted resources did not produce network requests.
- ZIP: six files; CRC validation passes. Contains four editable working templates, README and the checklist PDF.
- PDF: six pages visually inspected in the earlier asset pass. All 50 checks present.
- Sitemap: new resource and self-audit URLs included. Thank-you, subscription confirmation and 404 utility pages excluded.
- Dependency audit: zero vulnerabilities after upgrading Astro to 7.3.1 and compatible dependencies. Node 22.23.2 is specified for builds; the previous local Node 22.17.1 is below the new dependency engine requirement.
- Secret review: selected common credential patterns absent from source, public assets, builders, tests and docs. Selected sensitive paths absent from Git history. Public repository confirmed. No secret-bearing deployment configuration added.

## Content quality review

Scores are manual semantic-audit judgments, not automated ranking predictions. Reviewed subject clarity, direct answers, scope consistency, heading sequence, source references, contextual links and absence of invented proof.

| Public asset | Score | Evidence |
|---|---:|---|
| HTML checker and main guide | 93 | Actual input-dependent observations, explicit untested systems, primary references, no score fabrication |
| Agency toolkit landing page and four templates | 92 | Files fulfil the advertised tasks, editing instructions, explicit verification states and reuse terms |
| AuditWeb self-audit | 92 | Reproducible baseline observations, ownership disclosure, source revision, no claimed uplift |
| Free-audit supporting guides | 90 | Existing URLs retained, distinct task explanations, obsolete simulated-product promises removed |
| Printable checklist landing page | 92 | Actual PDF download, matching counts and honest scoring limits |

No private Search Console or analytics figures are included in public case-study content. Illustrative legacy report examples are explicitly labelled as sample data.

## Measurement and distribution

New events: `html_check_complete`, `resource_download` and `audit_service_click`. These fire only after analytics consent. Event payloads exclude pasted HTML and submitted page URLs. Resource events use only owned download paths. Tests confirm no checker event after rejection and no supplied page data after acceptance.

These events measure use and interest, not successful lead delivery or revenue. Existing email endpoints were not changed or exercised with real messages. Distribution drafts are in `growth-distribution.md`; nothing has been posted or sent.

## Limits

The in-app browser was unavailable. Local Chromium with Playwright supplied rendered verification. The performance sample uses a local, unthrottled server and a mobile viewport; it is not field Core Web Vitals evidence or a forecast for real mobile networks. No complete-site accessibility certification is claimed.

Production status must be established after deployment by checking commit/deployment status, the three public routes, file signatures, sitemap entries and a genuinely missing URL. Local 404 behaviour alone does not prove Cloudflare's deployed response.
