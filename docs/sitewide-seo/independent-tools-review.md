# Independent tool-guide review

Reviewer: root. Reviewed 11 September 2026 after the implementation slice was frozen.

Read all 14 final editorial tool guides, the directory's rendered content and its metadata/schema/data contract. Compared the actual changes with the stated task. Checked the separately recorded directory interaction suite and all-route desktop/mobile browser results. The full release validation is recorded separately.

Reviewed the distinction between page tests and crawlers, free tiers and trials, field and lab data, documented capabilities and editorial recommendations, proprietary scores and actual findings, and report branding versus a verified audit. Prices and limits are dated and linked to provider sources. Independently confirmed the Screaming Frog 500-URL free limit and GBP 199 annual licence, and Ahrefs Free's 5,000 monthly crawl credits per verified project, against the official pages.

One minor source-link correction: the automated-audit guide linked the words “Lighthouse CI” to the general Lighthouse overview. Changed that link to the official GoogleChrome/lighthouse-ci repository. No other material content or functional defect identified in this bounded review.

The first integration test run found that the existing directory schema assertion only accepted a top-level CollectionPage. The same CollectionPage and ten-item list are now inside the shared JSON-LD graph. Root updated the assertion to resolve graph nodes and retained the item-count and no-JavaScript checks.

The directory and supporting tool data remain a documentation-based comparison, not a claim of a new hands-on benchmark. No ranking or AI-citation outcome has been measured.

Final outbound-link readback found a retired WooRank pricing path returning 404. Replaced it with `/en/p/pricing`, reached from the official homepage pricing link. WebPageTest homepage returned an automated-access 403; capability verification uses its official documentation, and this is recorded as a fetch limitation rather than a broken public tool.
