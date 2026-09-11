# AuditWeb completed website audit report example

Prepared for: AuditWeb owned-site review  
Review date: 5 September 2026  
Content update date: 11 September 2026  
Scope: public AuditWeb routes, source for the reviewed features, build output and available downloads  
Status: completed owned-site example; the three findings were rechecked on 11 September 2026

## Executive summary

The 5 September 2026 self-audit recorded three defects on AuditWeb:

1. The free audit scanner generated simulated pass/fail results instead of inspecting a submitted website.
2. The report-template page promised downloadable files that were not available.
3. Unknown URLs returned homepage HTML with HTTP 200 and therefore looked like successful pages.

The correction sequence was to replace the simulation with an HTML checker, publish the promised resources and add a dedicated 404 document. The review did not measure a traffic, ranking or revenue uplift. This report does not claim that any correction caused a business outcome.

## Scope and method

The historical review compared public HTTP responses with Astro source at revision `da343a2`. It inspected:

- `/free-website-audit/`
- `/website-audit-checklist/template/`
- an arbitrary missing path: `/codex-growth-missing-20260905/`
- the available download assets and static build output

The source review read `src/lib/html-audit.js` to describe the replacement checker accurately. The checker reads supplied HTML in an inert template. It reports observations for the title, meta description, canonical URL, HTML indexing directives, H1, image alt attributes, viewport metadata and social preview image. It does not fetch a website or measure speed, SSL or Google indexing.

## Exclusions and limitations

This is an owned-site case study. It contains no client information, private Search Console data, private analytics exports or credentials. It does not provide a complete SEO, accessibility, security, backlink, competitor or Core Web Vitals audit.

The three corrections were rechecked against the live site on 11 September 2026. The live checks covered the checker’s input-dependent findings, canonical resolution, export and clear behaviour, inert pasted markup, duplicate metadata, `noindex`, untested images, the existing PDF and ZIP signatures and a genuinely missing route. The check did not reopen the PDF on that date and does not certify the wider site.

## Findings

### F–01: The scanner generated simulated results

- **Status:** Resolved and rechecked in the live checker cases on 11 September 2026.
- **Priority:** Immediate at discovery; ongoing regression check after checker changes.
- **Owner:** Product and engineering.
- **Affected URL:** `/free-website-audit/`
- **Historical evidence (5 September 2026):** The old scanner source called `simulateAudit` and used a seeded random calculation based on the submitted URL. The displayed pass/fail results were not evidence about the submitted website.
- **Consequence:** A visitor could receive a convincing result that did not come from the page they submitted. The old product description also implied broader website fetching and technical measurement than the implementation performed.
- **Fix:** Replace the simulation with the HTML checker in `src/lib/html-audit.js`. State the input boundary beside the tool. Keep pasted markup inert and render findings as text.
- **Verification:** Load the checker’s sample HTML containing a `noindex` directive and an image without an `alt` attribute. Confirm those observations appear. Remove the `noindex` directive and run the check again. Confirm the observation changes. Confirm that pasted scripts do not execute or create network requests.
- **Verification state:** Live checks covered input-dependent findings, canonical resolution, export and clear behaviour, inert markup, duplicate metadata, `noindex` and untested images. These checks do not certify the wider site.

### F–02: The download page had no promised files

- **Status:** Resolved; existing PDF and ZIP download responses passed live signature checks on 11 September 2026.
- **Priority:** Immediate at discovery; ongoing download-link regression check after resource changes.
- **Owner:** Content and engineering.
- **Affected URL:** `/website-audit-checklist/template/`
- **Historical evidence (5 September 2026):** The page promised Excel and PDF files but its public HTML had no working link to either file. The public asset folder had no template file at the time.
- **Consequence:** Visitors could read about a resource but could not obtain the promised deliverable.
- **Fix:** Create the 50-check PDF and the editable Markdown agency toolkit. Remove the unsupported Excel promise. Add a direct Markdown report-template path.
- **Verification:** Follow each download link. Confirm the response has the expected content type and a non-empty body. For the PDF check 15 technical, 12 on-page, 13 content and 10 off-page checks. For the toolkit confirm the README and editable working documents are present.
- **Verification state:** Live checks confirmed the existing PDF and ZIP routes and signatures. Earlier evidence inspected the PDF contents and toolkit files. The PDF was not reopened on 11 September.

### F–03: Missing URLs returned homepage HTML

- **Status:** Resolved; the missing-path response returned 404 in the live check on 11 September 2026.
- **Priority:** Immediate at discovery; ongoing hosting regression check after deployment changes.
- **Owner:** Engineering and hosting.
- **Affected URL:** `/codex-growth-missing-20260905/`; additional historical probes included `/.env` and `/.git/config`.
- **Historical evidence (5 September 2026):** The missing path returned HTTP 200 and the same HTML body as the homepage. The additional probes also returned homepage HTML. No credentials were observed in the returned body.
- **Consequence:** Monitoring and crawlers could not reliably distinguish an existing page from a missing route. A homepage fallback also obscures the correct not-found experience.
- **Fix:** Add a dedicated 404 document to the static output and verify the hosting layer’s final response code after release.
- **Verification:** Request a new nonexistent path. Expect HTTP 404 and a page-not-found body. A repository `404.html` file alone is not sufficient proof of the deployed response.
- **Verification state:** The live check requested a genuinely missing route and confirmed the 404 response and page marker. Recheck after future hosting changes.

## Prioritised action plan

1. **Resolved — checker correction:** The simulated scanner was replaced with an HTML checker. Keep the HTML-only boundary next to the input and rerun the known sample and changed-input cases after checker changes.
2. **Resolved — download correction:** The promised resources were published and the unsupported Excel promise was removed. Recheck the blank template, completed example, PDF and ZIP after resource changes.
3. **Resolved — not-found correction:** A dedicated 404 response replaced the homepage fallback. Request a genuinely new missing path after hosting changes and confirm status 404 with a page-not-found body.
4. **Ongoing — outcome measurement:** Compare later checks using the same URLs and definitions. Treat download events, tool completions and enquiries as usage signals. Do not describe them as ranking, traffic or revenue outcomes without a measured comparison.

## Follow-up and residual limitations

Recheck the three public routes after the next deployment. Record the deployment identifier and the exact check date. Repeat the checker interaction test in a real browser when current interactive evidence is required.

This report does not establish causality between the corrections and organic performance. It does not certify accessibility, security or indexation. It does not include competitor evidence or private measurement data. The next reviewer should add those areas only when the required access and evidence exist.

## Public evidence links

- [AuditWeb self-audit](https://auditweb.site/case-studies/auditweb-self-audit/)
- [Free HTML checker](https://auditweb.site/free-website-audit/)
- [Agency audit toolkit](https://auditweb.site/resources/agency-audit-toolkit/)
- [Blank report template](https://auditweb.site/downloads/agency-audit-toolkit/audit-report-template.md)
