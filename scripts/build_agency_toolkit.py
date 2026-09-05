"""Create editable agency resources with no external authoring dependencies."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
dest = root / 'public/downloads/agency-audit-toolkit'
files = {
    'README.md': '''# AuditWeb agency audit toolkit

Version: 5 September 2026

Four editable Markdown templates for planning an audit, recording evidence and assigning fixes. Open .md files in a text editor or Markdown editor. Replace bracketed prompts with your own evidence. No spreadsheet software is required.

1. Complete the client questionnaire and agree scope.
2. Use the audit report to connect findings with evidence.
3. Prioritise findings in the worksheet.
4. Assign and verify work in the implementation tracker.

The accompanying PDF supplies 50 manual checks. This toolkit performs no scans or automatic calculations. Blank fields are unknown, not passing results. Example prioritisation is a workflow aid, not a ranking or revenue prediction.

Free for personal and commercial use, modification and redistribution. Attribution to https://auditweb.site/resources/agency-audit-toolkit/ is appreciated but not required. Do not present unverified examples as actual client results. Store completed documents securely; they may contain sensitive business information.
''',
    'client-questionnaire.md': '''# Website audit client questionnaire

## Scope and owner

- Business and primary website: [complete]
- Decision-maker and implementation owner: [complete]
- Review date and agreed delivery date: [complete]
- Included domains, subdomains, markets and languages: [complete]
- Excluded systems or pages: [complete]
- Sample or full crawl: [complete]

## Business outcome

- Primary visitor task and conversion: [complete]
- Main products/services and priority pages: [complete]
- Problem to investigate and when it began: [complete]
- Revenue or lead baseline, source and date range: [complete or unavailable]
- Definition of a qualified enquiry: [complete]

## Changes and access

- Recent releases, redesigns, migrations or URL changes: [dates and details]
- CMS, hosting and analytics platform: [complete]
- Search Console and analytics access: [invite status; never paste passwords]
- Consent or tracking changes: [complete]
- Known outages, manual actions or indexing concerns: [evidence or unknown]
- Implementation constraints and available developer time: [complete]

## Evidence and agreement

- Authorised data sources and access duration: [complete]
- Permission for case-study publication: [not granted / agreed scope separately]
- Deliverables, exclusions and acceptance criteria: [complete]
- Follow-up verification date: [complete]
''',
    'audit-report-template.md': '''# Website audit report: [website]

Prepared by: [reviewer]
Review date: [date]
Scope: [URLs and systems reviewed]
Evidence period: [start/end dates and source]
Status: [draft / reviewed]

## Executive summary

[State the observed problem, its evidence and the recommended first action. Distinguish measured impact from expected benefit.]

## Method and limitations

- Sources and tools: [names, versions and dates where relevant]
- Access limitations and untested areas: [complete]
- Sample selection: [explain]
- Baseline: [metric, period and source]
- Known confounders: [seasonality, releases, consent changes or unknown]

## Findings

### F-01: [specific observed issue]

- Status: [observed / needs investigation / resolved and verified]
- Affected URL(s): [complete]
- Evidence: [response, screenshot, export or source excerpt; include date]
- Reproduction: [steps another person can follow]
- Consequence: [supported impact; label inference]
- Recommended change: [specific action]
- Risk and dependencies: [complete]
- Owner and due date: [complete]
- Verification: [expected observable result and check method]

[Duplicate this finding block as needed. Remove unfilled blocks before delivery.]

## Action plan

Reference the prioritisation worksheet and implementation tracker. List the next three actions with an owner and evidence required to close them.

## Follow-up

- Recheck date: [complete]
- Before/after comparison: [same metric definitions and comparable periods]
- Outcome: [measured / not yet measured]
- Remaining uncertainty: [complete]

## Evidence appendix

[List stable references. Redact credentials and personal data. Do not include client details in a public version without permission.]
''',
    'prioritisation-worksheet.md': '''# Audit finding prioritisation worksheet

Website: [complete]
Reviewer and date: [complete]

## Decision rules

Address confirmed outages, unintended indexing blocks and broken primary actions first. Investigate uncertain causes before recommending large changes. Low effort alone does not make a task valuable.

Use impact as a reasoned estimate, confidence as evidence quality and effort as an implementation estimate. Do not turn the ranking into a promised traffic or revenue uplift.

## Finding assessment

Finding ID: [F-01]
Issue and affected scope: [complete]
Evidence: [link or reproduction]
Impact: [high / medium / low, with reason]
Confidence: [confirmed / probable / untested, with reason]
Effort: [hours or days; include reviewer and uncertainty]
Dependencies: [complete]
Change risk and rollback: [complete]
Decision: [fix now / investigate / schedule / monitor / no action]
Owner and target date: [complete]
Success check: [observable condition]

[Copy the block for each finding.]

## Next three actions

1. [Finding ID, action, owner and verification]
2. [Finding ID, action, owner and verification]
3. [Finding ID, action, owner and verification]

Reassessment date: [complete]
''',
    'implementation-tracker.md': '''# Audit implementation tracker

Website: [complete]
Audit reference: [complete]
Coordinator: [complete]

## Status definitions

- Planned: change agreed but not started.
- In progress: implementation underway.
- Ready for review: local/staging evidence available.
- Released: change is live; verification still required.
- Verified: agreed production check passed and evidence recorded.
- Blocked: name the dependency and next action.

## Task

Finding ID and title: [F-01 / complete]
Status: [choose above]
Owner: [complete]
Affected URLs: [complete]
Acceptance criteria: [observable result]
Implementation reference: [commit, ticket or file]
Review evidence: [test output, screenshot or response]
Release date: [blank until live]
Rollback method: [complete]
Production verification: [method, date and evidence]
Measured outcome: [metric/period or not yet measured]
Next review: [complete]

[Duplicate the task block as needed. Local fixes are not verified production outcomes.]
''',
}
dest.mkdir(parents=True, exist_ok=True)
for name, text in files.items():
    (dest / name).write_text(text, encoding='utf-8')
with ZipFile(dest.parent / 'auditweb-agency-audit-toolkit.zip', 'w', ZIP_DEFLATED) as archive:
    for path in sorted(dest.glob('*.md')):
        archive.write(path, 'auditweb-agency-toolkit/' + path.name)
    archive.write(dest.parent / 'auditweb-website-audit-checklist.pdf', 'auditweb-agency-toolkit/website-audit-checklist.pdf')
print('Created 5 Markdown files and toolkit ZIP with checklist PDF')
