# AuditWeb semantic architecture brief

Date: 2026-09-11

## Purpose

This bounded update strengthens the existing AuditWeb website audit topic around the jobs visitors already have: understand what a website audit covers, decide whether to commission one, run repeatable checks, and turn evidence into an implementation handoff. It deepens the current pages instead of adding a large new page set.

The rationale is based on the existing sitemap and page purposes, visible navigation, current resource downloads, and the distinction between informational, diagnostic, reusable-template, and commercial intents. No private analytics or Search Console figures are copied into this repository. The approach assumes the site is established enough to benefit from consolidation and clearer pathways between related pages.

## URL ownership

| URL | Role | Owns this task |
| --- | --- | --- |
| `/` | Root entry point | Orient visitors to evidence, audit scope, the guide, checklist, toolkit, and professional review. |
| `/website-audit/` | Root guide | Explain the complete website-audit process and route readers to the most relevant audit type, evidence example, report example, and service path. |
| `/website-audit-services/` | Commercial node | Explain commissioned review scope, process, deliverables, pricing boundaries, and how to inspect evidence before enquiring. |
| `/seo-website-audit/` | SEO scope node | Explain SEO audit coverage and route task-specific readers to an SEO report, rankings-drop diagnosis, checklist, and professional scope. |
| `/website-audit-checklist/` | Task hub | Let a visitor work through the 66-check framework and choose the 50-check PDF, blank templates, specialist checklists, or professional review. |
| `/resources/agency-audit-toolkit/` | Reusable-resource hub | Provide blank Markdown working files and the 50-check PDF, with enough context to choose the right file and understand the evidence workflow. |
| `/website-audit-services/report-example/` | Evidence and reporting seed | Provide a completed owned-site report example plus a blank report template, with scope and evidence limits stated clearly. |
| `/seo-website-audit/report/` | SEO deliverable seed | Explain what an SEO report contains and how findings are interpreted. |
| `/seo-website-audit/rankings-drop/` | SEO diagnostic seed | Help a reader diagnose a sudden ranking or organic visibility change. |
| `/case-studies/auditweb-self-audit/` | Historical evidence seed | Provide the dated self-audit narrative with actual observations and reproduction steps. |

The report example and self-audit remain distinct tasks over related owned-site evidence: the report page packages completed findings into a reusable report format and offers a blank report template, while the case-study page preserves the dated historical narrative. The agency toolkit remains distinct from both because its files are blank, reusable working documents.

## Contextual link changes

The following links are implemented within existing body sections. Anchors describe the destination task and annotations explain why the destination is useful.

| Source | Destination | Placement and purpose |
| --- | --- | --- |
| `/` | `/website-audit/` | Complete-guide route keeps the root connected to the explanatory node. |
| `/` | `/website-audit-services/report-example/` | Resource area adds a completed report-example route for visitors who want to inspect a deliverable before commissioning work. |
| `/website-audit/` | `/website-audit-services/report-example/` | The report-example finding section links the general method to a completed owned-site report format. |
| `/website-audit/` | `/resources/agency-audit-toolkit/` | The how-to/process area points readers who want to record their own findings to blank working files. |
| `/website-audit-services/` | `/website-audit-services/report-example/` | Report-deliverables section gives commercial readers a direct completed-report route. |
| `/website-audit-checklist/` | `/resources/agency-audit-toolkit/` | Download section distinguishes the 66-check guide from the blank agency files. |
| `/website-audit-checklist/` | `/seo-website-audit/report/` | SEO checklist context routes readers who need interpretation and reporting after checks. |
| `/resources/agency-audit-toolkit/` | `/downloads/auditweb-completed-report-example.md` | Toolkit workflow gives readers a direct download of the completed owned-site report example alongside the blank files. |
| `/seo-website-audit/` | `/seo-website-audit/report/` | Report section routes readers from audit scope to the SEO deliverable. |
| `/seo-website-audit/` | `/seo-website-audit/rankings-drop/` | Diagnostic context routes readers whose trigger is a sudden visibility change. |
| `/seo-website-audit/` | `/resources/agency-audit-toolkit/` | Prioritisation section gives readers a reusable way to record and sequence findings. |

Links are distributed across separated heading sections and use the existing layout and tokens. Shared breadcrumb/sidebar and child-card navigation continue to provide structural discovery; the body additions carry the semantic relationship.

## Deferred items

- No new pages are added for the remaining audit-type clusters. Existing technical, content, security, accessibility, UX, tools, and free-checker pages remain the appropriate destinations.
- The shared content layout adds an optional header-action slot for the report downloads. Font loading uses an optional display strategy to prevent late heading reflow. Broad navigation and component redesign are outside this pass.
- Existing URLs, canonicals, redirects and pricing are preserved. Unsupported claims and mismatched checklist counts were corrected in the updated hubs and relevant schema.
- The 50-check PDF is not renamed or described as the 66-check framework. The toolkit's Markdown files are not presented as completed client evidence, and the completed report example is not presented as a client audit.
- The 179-page rendered-output graph has no broken local link or anchor targets. The report example moves from two homepage clicks to one, with distinct main-content inbound sources increasing from six to ten. The SEO report increases from two to four; the toolkit from eleven to fourteen. These are local discovery measurements, not evidence of Google indexing or ranking changes.
- Six older free-checker spokes still lack main-content inbound links. They need a separate content review before promotion. Utility/not-found pages account for the other five graph orphans. Live indexation of the edited pages must be measured after recrawling.

## Cannibalisation guardrails

Keep one primary job per URL. `/website-audit/` answers what a website audit is and how to approach it; `/seo-website-audit/` owns SEO-specific scope; `/website-audit-checklist/` owns the 66-check working sequence; `/resources/agency-audit-toolkit/` owns blank reusable files; `/website-audit-services/` owns commissioned scope and next steps; `/website-audit-services/report-example/` owns the completed owned-site report format and blank report download; `/seo-website-audit/report/` owns SEO report interpretation; `/seo-website-audit/rankings-drop/` owns event-triggered diagnosis; and `/case-studies/auditweb-self-audit/` owns the dated historical case-study narrative.

Future updates should check overlapping query/page intent before adding another guide. If a page starts answering a neighbouring task in depth, strengthen the existing owner and link to it rather than repeating the explanation across hubs.
