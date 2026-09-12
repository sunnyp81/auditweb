# Independent review: root pages, service pages and shared layouts

Reviewed 11 September 2026. This was a read-only review of the 26 files in `ownership.json` under `root`, the 16 files under `services_locations`, `src/layouts/BaseLayout.astro`, `src/layouts/ContentLayout.astro`, and `astro.config.mjs`. It did not repeat the integrated build or browser checks owned by the root task.

## Findings

### High — the privacy policy names the wrong form processor

`src/pages/privacy.astro:35-40` says StaticForms processes form submissions. The two live form components instead post personal data to Cloudflare Worker endpoints: the audit enquiry sends name, email and website URL to `emailit-worker.sunnypat81.workers.dev` (`src/components/LeadForm.astro:17-25`, `src/components/LeadForm.astro:27-60`), while the newsletter form sends email and source to `auditweb-drip-worker.sunnypat81.workers.dev` (`src/components/EmailSignup.astro:17-24`, `src/components/EmailSignup.astro:26-34`). No StaticForms integration appears in the reviewed source. The policy therefore gives visitors an inaccurate processor/data-flow inventory. The absolute “100% confidential” assurance beside the lead form (`src/components/LeadForm.astro:70`) compounds that mismatch.

Update the policy from the deployed data flow: name each form route or processor, state which fields it receives and for what purpose, and remove StaticForms if it is no longer used. Review the absolute confidentiality copy against the actual handling arrangement.

### Medium — visitors cannot use the advertised persistent cookie choice

`src/pages/privacy.astro:32-33` tells visitors they can reject analytics cookies “at any time.” `src/components/CookieConsent.astro:24-36` only displays the controls when no preference exists. After either choice is stored, the banner stays hidden, and the reviewed root/service UI contains no control to reopen preferences or withdraw an earlier acceptance. The policy describes an ongoing control the interface does not provide.

Add a persistent “Cookie settings” control that clears or changes `cookie-consent` and immediately disables future analytics loading, then make the policy wording match the implemented behaviour.

### Medium — canonicalised city pages emit a different structured-data identity

The intentional city consolidation is clear: each city page declares the main service URL as canonical (`src/pages/website-audit-services/[city].astro:58-71`) and city paths are excluded from the sitemap (`astro.config.mjs:7-12`). The shared schema does not follow that canonical. `src/layouts/BaseLayout.astro:29-33` builds `pageUrl` and the fallback primary entity ID from the requested city path, while `src/layouts/BaseLayout.astro:51-60` emits that city URL as the WebPage `@id`/`url` and connects the city-specific Service as `mainEntity`. At the same time, the canonical and `og:url` use the consolidated service URL (`src/layouts/BaseLayout.astro:70-80`).

This sends two identity signals for the same response: metadata identifies the main service URL, while JSON-LD identifies a distinct city WebPage and Service. Derive the WebPage/entity IDs from the resolved canonical for canonicalised routes, or omit city-specific structured data on pages consolidated to the main service. This finding does not challenge the requested 60-city canonical strategy itself.

### Medium — the audit guide routes sensitive-data buyers to a service with a narrower security scope

The main guide recommends the professional service when a site “handles sensitive data” and needs “a thorough security review” (`src/pages/website-audit/index.astro:376-390`). The linked service explicitly offers only agreed public configuration checks and says they are not penetration testing or certification (`src/pages/website-audit-services/index.astro:56-63`); the professional page likewise limits the scope to authorised public security checks (`src/pages/website-audit-services/professional.astro:39-41`). A buyer following this CTA could reasonably expect a deeper security engagement than AuditWeb describes elsewhere.

Qualify that list item to match the published public-check scope, or direct sensitive-data and application-security needs to a separately scoped specialist assessment.

### Medium — the website-audit hub hard-codes an unsupported content-audit scope and deliverable

`src/pages/website-audit/index.astro:148-150` says a content audit evaluates every piece of content and that its output is a spreadsheet with four fixed dispositions. That conflicts with AuditWeb’s service-wide rule that the agreed page sample and deliverables determine scope (`src/pages/website-audit-services/index.astro:53-57`) and with the cost page’s explicit list of possible report, tracker, presentation and workshop deliverables (`src/pages/website-audit-services/cost.astro:36-43`). It also excludes legitimate sampled/template audits while promising a specific format that is not part of every quote.

Describe the inventory or representative sample as scope-dependent, and describe the deliverable as a decision record or report that may use a spreadsheet when agreed.

### Low — the homepage title duplicates the brand suffix

The homepage supplies `AuditWeb — Website Audits with Evidence & Prioritised Fixes` as its title (`src/pages/index.astro:13`). `src/layouts/BaseLayout.astro:25-26` appends ` | AuditWeb` to every title other than the exact string `AuditWeb`, so the rendered title and social title become `AuditWeb — Website Audits with Evidence & Prioritised Fixes | AuditWeb` (`src/layouts/BaseLayout.astro:70-87`). This wastes title space and reads as duplicated branding.

Pass an unbranded homepage title, or let BaseLayout recognise a title that already starts or ends with the site name.

## Checks and scope notes

- Read the complete source of all 26 root files and 16 service/location files, including retained body copy, FAQs and inline schema, plus both shared layouts and Astro configuration.
- Checked all literal internal `href` targets in those sources against `src/pages` and `public`; no missing destinations were found.
- Confirmed the report-template and completed-report downloads exist, and confirmed the agency toolkit ZIP contains its four editable Markdown templates, README and PDF checklist.
- Pricing is consistent at $297 USD basic, $997 USD comprehensive and custom quote across the reviewed service pages.
- CRO versus conversion and UX versus usability now state distinct tasks and evidence; no merge or canonical change is recommended from this review.
- The 60 city URLs intentionally canonicalise to `/website-audit-services/` and are intentionally absent from the sitemap. Only the schema identity mismatch above is in scope.
- The previously identified $10,000 refund language in `src/pages/terms.astro` is excluded as an owner-policy question, per the task instruction.
- No source files, builds, generated output or deployment state were changed or retested during this review.

## Resolution check — 11 September 2026

Read back only the six changes requested from this review and the related root-owned security-index corrections. All six findings are resolved in the current source:

- **Privacy data flow:** `src/pages/privacy.astro:17-22,36-40` now identifies the Cloudflare-hosted audit-enquiry and newsletter endpoints and the fields each receives. This matches `src/components/LeadForm.astro:17-60` and `src/components/EmailSignup.astro:17-34`. The former “100% confidential” promise is replaced by scoped handling guidance at `src/components/LeadForm.astro:70`.
- **Cookie withdrawal:** `src/components/Footer.astro:85` and `src/pages/privacy.astro:34` provide persistent controls that reopen the choices. `src/components/CookieConsent.astro:30-56` supports a later rejection, sets the GA disable flag, removes matching first-party GA cookies and reloads after withdrawing an accepted choice. Root separately reports the mocked-GA interaction test passing.
- **Canonical schema identity:** `src/layouts/BaseLayout.astro:29-33,51-60` derives WebPage and fallback primary-entity IDs from the resolved canonical. `src/layouts/ContentLayout.astro:79` passes the canonical through, and `src/pages/website-audit-services/[city].astro:39-65` now emits the same canonical Service identity with provider `https://auditweb.site/#organization` and no invalid `priceRange` property.
- **Sensitive-data route:** `src/pages/website-audit/index.astro:382-390` sends sensitive-data needs to a separately scoped specialist security assessment and expressly excludes penetration testing and certification from AuditWeb’s public checks.
- **Content-audit scope:** `src/pages/website-audit/index.astro:148-150` now describes an agreed inventory or sample and a report or spreadsheet, with manual evidence required before keep/improve/merge/remove decisions.
- **Homepage title:** `src/layouts/BaseLayout.astro:25-26` recognizes the existing `AuditWeb —` prefix, so the homepage title at `src/pages/index.astro:13` no longer receives a duplicate suffix.

The targeted stale-claim scan of `src/pages/website-security-audit/index.astro` found no remaining invented AuditWeb experience statistic, increased HTTPS-weight claim, blanket security-header time promise, or automatic cadence rule. The revised page defines authorization and scope (`:35-36,49-50`), treats search/security effects as evidence to investigate (`:39-46`), qualifies component and header findings (`:62-69`), requires permission for active ZAP scans (`:73-80`), uses risk-based review intervals (`:83-89`), and accurately limits the AuditWeb service (`:92-94`). No new material contradiction was found in this bounded readback.

No page source, build output or deployment state was changed during this resolution check. Integrated build and browser evidence remain with the root task.
