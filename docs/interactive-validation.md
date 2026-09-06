# Category and interactive evidence validation

## Design critique and Opus involvement

The original `/website-audit-tools/` was an article with a contents block and sidebar. Its child guides started 13,445px down at 390px. Unsupported firsthand testing claims and stale plan prices were also present. The homepage's genuine audit evidence was entirely static.

Claude Code was invoked twice with `--model opus` for read-only design advice: once after our baseline critique and once for the implemented desktop/mobile screenshots. Both responses report `claude-opus-5` as the design model with no permission denials or spawned agents. Opus recommended full-width inspection records, an inline comparison, crawlable guides and selectable recorded findings. Codex implemented and verified the changes.

Round one: inspected full directory and homepage renders at 1440/390, plus the comparison at 390. Condensed the category headline, replaced tall mobile task buttons with native selects, made labels explicit and added a return-to-selection action. The first test run passed 18/19; the failure was an implicit-select-label locator. The revised run passed 19/19.

Round two: Opus's rendered review prompted data-derived dates/counts, explicit multiple tasks for Lighthouse, removable named selections, sticky comparison row headings, larger provenance text, linked tool headings and shareable task/access parameters. Kept native disabled compare controls with visible minimum-selection instructions. Retained flexible minimum row heights after measuring actual panels: no clipping or overflow at 320/390/1440; tab height variation at 390 was zero. These minimums permit content expansion and do not impose fixed clipping heights.

The final local suite passed 20/20. An internal link scan then caught the report link pointing at a nonexistent route; corrected it to `/seo-website-audit/report/`. Browser performance observations caught a category layout shift while enhancements loaded. Reserved their space before module execution in Tailwind's base layer. The final 390px directory CLS was 0.0019 versus 0.1288 before that correction.

## Result and limits

- Tools category: ten publisher-sourced tool records, search, task/access filters, two- or three-tool comparison, removable selections, six specialist guide links and six tool-guide routes. All records and guide links are static HTML. Query filters retain the category canonical; search text is not written to the URL or analytics.
- The category uses CollectionPage and ItemList, replacing Article. The owned checker is separately disclosed and excluded from the directory. Each entry renders its stored source-check date. No ratings, subscriber claims, comparative benchmarks or traffic gains were invented.
- Homepage: three keyboard-operable finding tabs for the actual 5 September self-audit, with explicit recorded/owned context. Without JavaScript all three findings remain readable. Existing compact guide illustration is preserved.
- The 390px category is 10,869px tall versus 17,361px before. Popular guide links begin at 424px; tool records begin at 1,044px. This trades some screen space for visible filtering and selection instructions. The page is a category with supporting content, not an article sidebar layout.
- Existing child articles were linked, not re-researched in full. Their legacy pricing and claims require a separate editorial refresh. Field traffic and conversion effects remain unmeasured.

## Verification

Supported Node 22 production build: 179 pages. Rendered HTML validator: zero errors/warnings across 179 files. Source/public/build secret-pattern scan: no matches. Named historical secret paths: no commits. Dependency audit: zero reported vulnerabilities. Internal targets from homepage/category/toolkit/guide/service: no missing pages or assets after correction.

Playwright tests cover filter intersections, empty search, literal hostile search input, maximum selection, filtered-out selections, removal focus, URL restoration, category schema, canonical, no-JavaScript content, tab arrows/Home/End, WCAG axe checks, comparison scrolling and 1440/390/320 reflow. Existing checker, downloads, consent, mobile menu and resource regressions also pass. Manual screenshots cover all three evidence states, selection and empty states, and desktop/mobile full pages. No page errors, console errors or failed requests in the final local capture.

Final unthrottled local 390px samples: homepage CLS 0.0224 and observed LCP 140ms; category CLS 0.0019 and observed LCP 172ms. Observable encoded resources were about 38KB/45KB respectively, below the existing 300KB budget. These are repeatable local observations, not field Core Web Vitals. External font transfer sizes can be underreported without Resource Timing permission.

The in-app browser runtime returned no connected browser after the documented bootstrap/troubleshooting. Isolated Playwright Chromium supplied rendered evidence. No new forms or dependencies were introduced. No outreach or email was sent. Exact deployed revision and live results are recorded in the external release evidence after publishing.

## Semantic review

Applied the semantic-audit rubric as an editorial self-review. Page-copy extraction found 43 homepage sentence/fragment units and 85 category units (excluding navigation/control labels). Subject/action-first structure, direct FAQ answers, factual limitations and contextual links were reviewed. No prohibited filler was found. Repeated evidence/limit fields are intentional comparison structure. Article-specific restrictions on early internal links are inapplicable to the explicitly requested category page.

Homepage revised copy: 90/100; evidence explorer: 93/100; category with tool data: 91/100. Remaining deductions reflect repeated short field fragments and future source-maintenance needs, not unsupported firsthand claims. Scores are editorial judgments, not predicted ranking metrics. The source links support capabilities; suggested fit/limitations that involve judgment are disclosed as editorial interpretation.

## Design scorecard

| Dimension | Score | Evidence and remaining limitation |
|---|---:|---|
| Brand | 8/10 | Real response traces and consistent inspection records; still uses the existing broader brand system. |
| Hierarchy | 8/10 | Guides and tool selection precede editorial content; full unfiltered mobile directory is still long. |
| UX | 9/10 | Filters, comparison, removable selections and tabbed evidence tested; no measured conversion uplift. |
| Trust | 9/10 | Source-backed category and dated owned evidence; linked legacy articles are outside this fact-check scope. |
| Accessibility | 8/10 | Axe, keyboard, reduced motion and narrow reflow pass; no full screen-reader user study. |
| Technical | 8/10 | Build, scans, tests and performance baseline; no field INP/LCP assessment for this new UI. |
