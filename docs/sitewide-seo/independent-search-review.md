# Independent review: `search_content`

Date: 2026-09-11  
Mode: the initial cross-review was read-only; the 17 findings were then remediated in the transferred `search_content` sources. No route or heading anchor was removed and no build was run.

## Findings

### High

1. **The Shopify guide prescribes an inaccurate platform implementation and an unsafe blanket rule for faceted URLs.**
   - `src/pages/seo-website-audit/shopify.astro:51` tells readers to edit `product.liquid` for product title tags. That is outdated for Online Store 2.0 themes, where product templates are commonly JSON templates composed of sections; merchants can also edit each product's search listing in Admin.
   - `src/pages/seo-website-audit/shopify.astro:62-64` says filter URLs should be noindexed or canonicalised to the base collection and proposes nested `/collections/mens-shoes` routes as hierarchy. Filter handling needs an intent and crawl decision; a canonical is appropriate only when pages are duplicates, and Shopify collection handles remain flat under `/collections/` rather than establishing the stated nested route hierarchy.
   - `src/pages/seo-website-audit/shopify.astro:70-74` attributes any mobile Lighthouse score below 50 to the theme, recommends changing theme, says Shopify does not convert to WebP by default, and advises use of `image_url` with `format: 'webp'`. Shopify documents automatic format negotiation for WebP/AVIF through its image filters and requires a width or height for `image_url`; a page-level Lighthouse score cannot identify the theme as the cause. Replace these instructions with measured bottleneck diagnosis and current `image_url`/`image_tag` guidance. Sources: [Shopify CDN guidance](https://shopify.dev/docs/storefronts/themes/best-practices/performance/use-shopify-cdn), [Shopify image filter guidance](https://shopify.dev/docs/storefronts/themes/best-practices/performance/use-shopify-image-filters-efficiently), [Google faceted-navigation guidance](https://developers.google.com/crawling/docs/faceted-navigation).

2. **The WordPress guide contains stale tooling and operational advice that can break production sites.**
   - `src/pages/seo-website-audit/wordpress.astro:74` recommends Google's Mobile-Friendly Test, retired in December 2023.
   - `src/pages/seo-website-audit/wordpress.astro:87-91` turns database housekeeping into default fixes: limit revisions to 3-5, delete excess rows and run `OPTIMIZE TABLE`. These actions require a measured database bottleneck, backup, staging and host-specific review; revision count is a product/editorial choice.
   - `src/pages/seo-website-audit/wordpress.astro:125-128` presents one Unix permission scheme and disabling XML-RPC as universal requirements. WordPress says permissions depend on ownership and server configuration, and integrations can depend on XML-RPC.
   - `src/pages/seo-website-audit/wordpress.astro:137` recommends PHP 8.1+, although PHP 8.1 reached end of life on 31 December 2025. Require a currently supported version compatible with the site and extensions. Sources: [WordPress hardening guidance](https://developer.wordpress.org/advanced-administration/security/hardening/), [PHP unsupported branches](https://www.php.net/eol.php), [PHP supported versions](https://www.php.net/supported-versions.php).

3. **The content-pruning workflow can cause irrelevant redirects or consolidation based on query overlap alone.**
   - `src/pages/website-content-audit/frequency.astro:71` says multiple pages appearing for one query usually split signals and both would rank better if consolidated. Search Console query overlap alone does not establish cannibalisation; pages can satisfy different intents or legitimately rank together.
   - `src/pages/website-content-audit/how-to.astro:121` says a page with no measured traffic, links, conversions or target keyword should be deleted and given a 410 or redirected to the nearest relevant page. A page may still have user, campaign, support, legal or untracked value, and “nearest” is not enough to justify a redirect.
   - `src/pages/website-content-audit/how-to.astro:135` selects a consolidation survivor from backlinks and organic performance and says to “move” keywords. Select the canonical task and destination from relevance, purpose, URL stability, demand, links and conversions; preserve useful content, not keywords as transferable objects.

4. **The local SEO guide recommends a self-serving review rich-result implementation that Google says is ineligible.**
   - `src/pages/seo-website-audit/local-seo.astro:134` tells a business to mark reviews displayed on its own site with `AggregateRating`, while simultaneously saying reviews must not be self-serving. Reviews of a `LocalBusiness` or `Organization` placed on that entity's own controlled site are self-serving for Google even when genuine or embedded through a third-party widget. Remove the rich-result recommendation or clearly limit it to sites reviewing other businesses. Sources: [Google LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Google review rich-result policy explanation](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful).

5. **The local and industry guides still prescribe location-page production without requiring a real location, real local offer or distinct user task.**
   - `src/pages/seo-website-audit/local-seo.astro:85-92` requires landmarks, testimonials, directions, a local phone/address/booking link and a map on every location page, then recommends growing from 10 to 50 pages. Those ingredients do not establish unique value and can encourage invented local evidence or doorway-style coverage.
   - `src/pages/seo-website-audit/dental.astro:44-47,71-74` requires separate service, condition, insurance and neighbourhood pages plus city-modified titles. `src/pages/seo-website-audit/law-firms.astro:58-63` similarly requires every sub-practice to have a page and local court/geographic details. `src/pages/seo-website-audit/real-estate.astro:79` requires neighbourhood pages for all served areas.
   - Rewrite these as evidence gates: create a page only when the practice or firm really operates in or serves the area, the offer and contact route are accurate, the page supports a distinct task, and sourceable first-party details exist. Do not use landmarks, maps or city substitutions as a proxy for relevance.

6. **The dental review benchmark is invented and is repeated as if it were an audit pass criterion.**
   - `src/pages/seo-website-audit/dental.astro:35` claims map-pack practices typically have 50+ reviews and a 4.5+ rating and instructs practices below that threshold to ask every patient.
   - `src/pages/seo-website-audit/dental.astro:80` repeats “50+ Google reviews with 4.5+ rating” as a checklist item.
   - Google publishes no universal review-count or rating threshold for local ranking. Replace it with a dated comparison of eligible peers plus a privacy-safe, platform-compliant solicitation process that fits the jurisdiction and patient relationship.

7. **The SaaS guide turns correlations and generic conversion folklore into causal audit conclusions.**
   - `src/pages/seo-website-audit/saas.astro:70-73` says a 1,500-word competitor page versus a 200-word page “explains the ranking gap,” calls screenshots critical to search engines and requires feature names in alt text. Word count and screenshots do not establish causality; alt text must describe purpose and can be empty for redundant images.
   - `src/pages/seo-website-audit/saas.astro:83-85` asserts subdirectories consolidate authority, the application should be completely separated, login pages consume crawl budget and all static assets should be cached aggressively. These are architecture choices that depend on ownership, authentication, freshness and observed crawl/performance evidence.
   - `src/pages/seo-website-audit/saas.astro:108` claims reducing a form from ten fields to four can double conversions without a source or site-specific experiment. Present it as a test hypothesis and measure completion and lead quality.

8. **The ecommerce guide gives unsafe status-code advice and promises an unavailable FAQ rich result.**
   - `src/pages/seo-website-audit/ecommerce.astro:56` says out-of-stock pages should always remain live and permanently discontinued products should receive a 301 to an alternative or parent category. Temporary stock, permanent removal, equivalent replacements, user value, links and feed state determine the correct action; a category is often not an equivalent redirect target.
   - `src/pages/seo-website-audit/ecommerce.astro:105` says FAQ markup on product pages can earn expandable FAQ results. Google limits regular FAQ rich results to well-known authoritative government and health sites. Source: [Google's FAQ and HowTo rich-result change](https://developers.google.com/search/blog/2023/08/howto-faq-changes).

### Medium

9. **The emitted HowTo schema conflicts with the page's own current search-feature guidance.**
   - `src/pages/seo-website-audit/how-to.astro:23-39,49` emits `HowTo` JSON-LD.
   - `src/pages/seo-website-audit/how-to.astro:129` correctly says Google no longer shows HowTo rich results. The markup can remain valid Schema.org vocabulary, but it has no Google rich-result benefit and its ten terse schema steps omit qualifications that the visible guide adds. Either remove it or document the non-Google machine-readable purpose and keep the step text semantically equivalent to the visible instructions.

10. **The B2B schema section overstates what markup establishes.**
    - `src/pages/seo-website-audit/b2b.astro:117-123` says Organization schema establishes the company as a Knowledge Graph entity, every service page should use Service schema, and author markup is increasingly important for E-E-A-T. Structured data classifies visible content; it does not establish entity authority or act as an E-E-A-T shortcut, and generic `Service` has no Google rich result. Reframe the checks around accurate entity identity, visible-content parity and supported Google features.

11. **The healthcare and law pages mix sound scope caveats with universal clinical/legal requirements, then show a generic service CTA.**
    - `src/pages/seo-website-audit/healthcare.astro:30` correctly says the audit cannot certify clinical accuracy or legal compliance, but `:31,37-40,46-50,91-102` then requires licensed review, named badges, citations, schema, disclaimers and other controls across all medical content without conditioning them on page risk, organisation or jurisdiction.
    - `src/pages/seo-website-audit/law-firms.astro:110-115` describes jurisdiction-dependent legal and accessibility checks, but `:130` requires above-fold forms, a free-consultation CTA and live chat even when the firm may not offer or be permitted to market those services.
    - Both pages set `showLeadForm={true}` (`healthcare.astro:25`, `law-firms.astro:28`), which renders the generic “Request Your Professional Audit” form from `src/components/LeadForm.astro:9-11` without stating that AuditWeb's deliverable is SEO evidence rather than clinical or legal approval. Add page-specific scope language near the CTA and make recommendations conditional on the actual offer and governing rules.

12. **Several local-performance claims and quotas remain unsupported after nearby paragraphs correctly reject universal thresholds.**
    - `src/pages/seo-website-audit/local-seo.astro:101` says a 150-versus-30 review gap is a significant disadvantage and asks for a monthly quota; `:105,117-120` assigns relative ranking weight to review platforms and directories without a cited basis.
    - `src/pages/seo-website-audit/real-estate.astro:45` says updated market data signals freshness to Google.
    - `src/pages/seo-website-audit/dental.astro:65` says a five-second booking widget loses patients.
    - Convert these to measurable questions using the business's search results, analytics, profile data and user testing. Do not present them as general ranking or conversion laws.

13. **The broad SEO-audit pages have overlapping definitions, scopes and workflows without a stable task boundary.**
    - `src/pages/seo-website-audit/index.astro:94-105` is positioned as the complete “what to check and how to prioritise” guide; its child description at `:65` also claims `/full-audit/` covers every ranking factor.
    - `src/pages/seo-website-audit/full-audit.astro:41-52` and `src/pages/seo-website-audit/how-to.astro:57-205` repeat the same technical, on-page, content, links, UX and action-plan stages.
    - `src/pages/what-is-an-seo-site-audit.astro:25-37` repeats the hub's definition and core areas, then adds DIY, timing and next steps already handled by the hub and process guide.
    - Keep the hub as navigation and concise scope, the full-audit page as a professional six-phase deliverable, the how-to page as the executable DIY procedure, and the “what is” page as a short definitional answer. Remove “every ranking factor”; no audit can test every factor. Confirm consolidation/canonical decisions with query and page evidence rather than making them from copy similarity alone.

14. **The content-audit hub duplicates the operational guide and contradicts its own caution about scoring.**
    - `src/pages/website-content-audit/index.astro:65-76,130-139` contains the same inventory-to-action procedure as `src/pages/website-content-audit/how-to.astro:34-139`.
    - `src/pages/website-content-audit/index.astro:72-73` says to score each page and assign actions based on the score, while `:118` says a low score must not automatically trigger removal. Keep the hub answer-focused and move spreadsheet execution to the how-to guide; explicitly make purpose and manual review decision gates.

15. **Some “complete crawl” language contradicts the pages' otherwise careful scope limits.**
    - `src/pages/website-content-audit/index.astro:122` says Screaming Frog crawls the entire site, although the same page at `:68` correctly says crawls only inventory URLs reachable from configured seeds/settings and must be reconciled with other sources.
    - `src/pages/website-content-audit/how-to.astro:30,52` promises a complete inventory from a full crawl despite `:43,66` giving the correct limitation. Replace “complete” and “entire” with the configured/reconciled URL scope.

16. **Several remaining audit claims imply guaranteed ranking, traffic or business effects.**
    - `src/pages/seo-website-audit/full-audit.astro:67` requires schema on every page type; schema is appropriate only where it accurately represents content and/or supports a defined consumer. `:143` promises that title, link, schema and duplicate-content fixes produce measurable results within two weeks.
    - `src/pages/seo-website-audit/how-to.astro:166,189` says slow pages have measurably higher bounce rates and mobile interstitials can result in a ranking penalty while cookie consent is exempt. The policy and observed outcome depend on implementation; avoid the penalty/exemption binary.
    - `src/pages/why-website-audit-is-important.astro:47` says Safe Browsing warnings crater organic traffic overnight and recovery can take weeks. State the observable warning and remediation/review process without invented traffic magnitude or recovery time.

17. **The content-service page's scoring description is weaker than its own evidence-led promise.**
    - `src/pages/website-content-audit/services.astro:38-48` promises page-level evidence, data gaps and a practical action plan, but `:44` defines quality scoring only as thinness, duplication and topical relevance and `:46` ranks competitor gaps by unspecified “opportunity size.” This omits accuracy, page purpose, conversions, links, legal obligations and confidence, all of which nearby guides correctly require. Align the commercial deliverable with the safer decision model before presenting the `$297`/`$997` packages at `:54-85`.

## Resolution evidence

| Finding | Resolution | Final source evidence |
|---:|---|---|
| 1 | Replaced outdated Shopify title-template, fixed meta-description quota, facet, collection, Lighthouse, image-format and ScriptTag prescriptions with current platform-aware checks. | `src/pages/seo-website-audit/shopify.astro:51-74` |
| 2 | Corrected WordPress storage/TTFB causality, retired tooling and universal settings; made revisions, transients, metadata, database operations, permissions, XML-RPC, PHP and Query Monitor guidance evidence- and environment-dependent. | `src/pages/seo-website-audit/wordpress.astro:74,82-112,120-128,137,151` |
| 3 | Replaced query-overlap-as-cannibalisation and automatic removal/redirect rules with manual purpose, relevance and successor gates. | `src/pages/website-content-audit/frequency.astro:71`; `src/pages/website-content-audit/how-to.astro:96,121,135` |
| 4 | Explained that self-serving LocalBusiness/Organization reviews are ineligible for Google review snippets. | `src/pages/seo-website-audit/local-seo.astro:134` |
| 5 | Added real-office/service-area, distinct-task and first-party-evidence gates to local, dental, legal and real-estate page guidance. | `src/pages/seo-website-audit/local-seo.astro:85-92`; `src/pages/seo-website-audit/dental.astro:44-47,71-74`; `src/pages/seo-website-audit/law-firms.astro:58-75`; `src/pages/seo-website-audit/real-estate.astro:79` |
| 6 | Removed the 50-review/4.5-rating pass condition and replaced it with a dated peer comparison and compliant request process. | `src/pages/seo-website-audit/dental.astro:35,80` |
| 7 | Recast SaaS word count, screenshots, site structure, application access, caching, query overlap and form length as testable decisions rather than causal laws. | `src/pages/seo-website-audit/saas.astro:70-108` |
| 8 | Made product retirement status-dependent and removed the ecommerce FAQ rich-result promise. | `src/pages/seo-website-audit/ecommerce.astro:56,105` |
| 9 | Retained valid HowTo vocabulary, aligned its steps with visible qualifications, stated its non-Google machine-readable purpose and separated Schema.org validation from Google's supported rich-result test. | `src/pages/seo-website-audit/how-to.astro:23-39,45-49,129`; `src/pages/seo-website-audit/index.astro:204` |
| 10 | Reframed B2B markup around visible factual parity and removed Knowledge Graph, E-E-A-T and generic Service rich-result implications. | `src/pages/seo-website-audit/b2b.astro:112-123,135` |
| 11 | Made healthcare controls risk-dependent, legal CTAs offer-dependent and added explicit AuditWeb clinical/legal service boundaries beside each guide's close. | `src/pages/seo-website-audit/healthcare.astro:30-50,89-105`; `src/pages/seo-website-audit/law-firms.astro:110-133` |
| 12 | Removed local review/directory weights, quotas, real-estate freshness causality and the dental five-second abandonment claim. | `src/pages/seo-website-audit/local-seo.astro:96-120`; `src/pages/seo-website-audit/real-estate.astro:45`; `src/pages/seo-website-audit/dental.astro:65` |
| 13 | Distinguished the SEO hub, DIY procedure, professional six-phase scope and short definition through titles, descriptions, introductions and contextual links. | `src/pages/seo-website-audit/index.astro:54-65,94-109`; `src/pages/seo-website-audit/how-to.astro:45-53`; `src/pages/seo-website-audit/full-audit.astro:22-33`; `src/pages/what-is-an-seo-site-audit.astro:5-29` |
| 14 | Reduced the content-audit hub's process section to a decision map, linked the operational guide and made manual review the decision gate. | `src/pages/website-content-audit/index.astro:65-72,127` |
| 15 | Replaced complete/entire-crawl promises with configured and reconciled scope language. | `src/pages/website-content-audit/index.astro:38,68,118`; `src/pages/website-content-audit/how-to.astro:30,43,52,66,96` |
| 16 | Removed universal schema requirements, two-week result promises, speed/interstitial causality and invented security recovery effects. | `src/pages/seo-website-audit/full-audit.astro:67,143`; `src/pages/seo-website-audit/how-to.astro:166,189`; `src/pages/why-website-audit-is-important.astro:47` |
| 17 | Aligned the paid content-audit deliverable with page purpose, accuracy, conversions, links, ownership, confidence and decision risk. | `src/pages/website-content-audit/services.astro:38-48,54-85` |

Primary implementation references used for the corrected claims: [Shopify CDN guidance](https://shopify.dev/docs/storefronts/themes/best-practices/performance/use-shopify-cdn), [Shopify image-filter guidance](https://shopify.dev/docs/storefronts/themes/best-practices/performance/use-shopify-image-filters-efficiently), [Google faceted-navigation guidance](https://developers.google.com/crawling/docs/faceted-navigation), [WordPress hardening guidance](https://developer.wordpress.org/advanced-administration/security/hardening/), [PHP supported versions](https://www.php.net/supported-versions.php), [Google LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Google review rich-result policy](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful) and [Google's FAQ/HowTo update](https://developers.google.com/search/blog/2023/08/howto-faq-changes).

## Reviewed scope

All 32 manifest entries were read:

- `src/pages/seo-website-audit/b2b.astro`
- `src/pages/seo-website-audit/dental.astro`
- `src/pages/seo-website-audit/ecommerce.astro`
- `src/pages/seo-website-audit/full-audit.astro`
- `src/pages/seo-website-audit/healthcare.astro`
- `src/pages/seo-website-audit/how-often.astro`
- `src/pages/seo-website-audit/how-to.astro`
- `src/pages/seo-website-audit/index.astro`
- `src/pages/seo-website-audit/law-firms.astro`
- `src/pages/seo-website-audit/local-seo.astro`
- `src/pages/seo-website-audit/nonprofits.astro`
- `src/pages/seo-website-audit/on-site.astro`
- `src/pages/seo-website-audit/rankings-drop.astro`
- `src/pages/seo-website-audit/real-estate.astro`
- `src/pages/seo-website-audit/report.astro`
- `src/pages/seo-website-audit/saas.astro`
- `src/pages/seo-website-audit/shopify.astro`
- `src/pages/seo-website-audit/template.astro`
- `src/pages/seo-website-audit/wordpress.astro`
- `src/pages/website-audit-vs-seo-audit.astro`
- `src/pages/website-content-audit/copy.astro`
- `src/pages/website-content-audit/frequency.astro`
- `src/pages/website-content-audit/how-to.astro`
- `src/pages/website-content-audit/index.astro`
- `src/pages/website-content-audit/services.astro`
- `src/pages/website-content-audit/template.astro`
- `src/pages/website-content-audit/tools.astro`
- `src/pages/what-does-a-website-audit-include.astro`
- `src/pages/what-is-a-technical-seo-audit.astro`
- `src/pages/what-is-a-website-audit.astro`
- `src/pages/what-is-an-seo-site-audit.astro`
- `src/pages/why-website-audit-is-important.astro`

No material issue was recorded for a reviewed page when its retained claims were already bounded by evidence, access, jurisdiction or implementation context. The findings above focus on claims likely to cause an incorrect implementation, unsupported public evidence, service-scope confusion or avoidable task cannibalisation.

## Final resolution readback by root

Root compared the 17 resolution areas with the final source, including the WordPress and Shopify residual corrections. The additional agent verification stopped when its usage allowance was exhausted; it is not represented as a completed signoff. Root performed the remaining resolution review and removed residual topic-overlap-only consolidation, a fixed action ratio, SaaS link-count and traffic-share assertions, and simplistic ecommerce attribution wording. The original independent review, implementation record and root readback are separate evidence. No ranking or citation outcome is claimed by these checks.
