"""Build AuditWeb's printable manual checklist. Requires reportlab."""
from pathlib import Path
from html import escape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'downloads' / 'auditweb-website-audit-checklist.pdf'
SECTIONS = {
    'Technical SEO': [
        ('Crawl access', 'Check robots.txt and crawl responses for important public pages.', 'GSC / crawl'),
        ('Indexing', 'Inspect important URLs. Explain any excluded pages before changing directives.', 'GSC'),
        ('Response codes', 'Important pages return 200; removed URLs return 404/410 or a relevant redirect.', 'HTTP / crawl'),
        ('Core Web Vitals', 'Field targets at p75: LCP <=2.5s; INP <=200ms; CLS <=0.1. Record missing field data.', 'PSI / GSC'),
        ('HTTPS', 'Check certificate validity, HTTP redirects and mixed content on key journeys.', 'Browser / HTTP'),
        ('Mobile usability', 'Test reading, navigation and forms on a narrow viewport with no lost content.', 'Browser'),
        ('Structured data', 'Validate supported markup and match every claim to visible page content.', 'Rich Results Test'),
        ('Redirects', 'Resolve avoidable chains and loops; confirm the final destination is relevant.', 'Crawl'),
        ('XML sitemap', 'Include intended canonical, indexable 200 URLs; remove stale entries.', 'Sitemap / crawl'),
        ('Robots directives', 'Distinguish crawl blocking from noindex. Robots.txt alone does not prevent indexing.', 'HTTP / GSC'),
        ('Rendered content', 'Compare source and rendered HTML; confirm important content and links remain visible.', 'Browser / GSC'),
        ('Server reliability', 'Investigate repeated timeouts and 5xx responses using logs and crawl evidence.', 'Logs / crawl'),
        ('Site architecture', 'Reach important pages through useful internal links; investigate orphan pages.', 'Crawl'),
        ('Duplicate URLs', 'Check parameter and host variants; align canonical tags and internal links.', 'Crawl / GSC'),
        ('International pages', 'Where applicable, check language URLs and reciprocal hreflang references.', 'Crawl'),
    ],
    'On-page SEO': [
        ('Page titles', 'Give important pages accurate, distinctive titles that match their content.', 'Crawl / manual'),
        ('Meta descriptions', 'Describe the page accurately; avoid promises the page does not fulfil.', 'Crawl / manual'),
        ('Headings', 'Use a clear page heading and logical section hierarchy; headings describe their content.', 'Browser / HTML'),
        ('Internal links', 'Link to relevant next steps with descriptive anchor text.', 'Crawl / manual'),
        ('Images', 'Check size, dimensions and useful alt text; decorative images use empty alt text.', 'Browser / HTML'),
        ('Canonical tags', 'Point canonical tags to the intended preferred URL; check for conflicting signals.', 'HTML / GSC'),
        ('URL structure', 'Use understandable, stable URLs; avoid changing indexed URLs without a redirect plan.', 'Crawl'),
        ('Social previews', 'Check title, description and image previews for important shareable pages.', 'HTML / preview'),
        ('Breadcrumbs', 'Show accurate parent-child navigation and check its links.', 'Browser'),
        ('Intent alignment', 'Match the title and main answer to the task a searcher wants to complete.', 'Search / manual'),
        ('Priority-page access', 'Give commercial and useful resource pages contextual links from relevant hubs.', 'Crawl / manual'),
        ('Broken links', 'Repair broken internal destinations and review external links that no longer help.', 'Crawl'),
    ],
    'Content quality': [
        ('Answer completeness', 'Answer the main question early and cover the decisions needed to act.', 'Manual review'),
        ('Search intent', 'Check whether visitors need a tool, example, comparison, explanation or service.', 'Search / manual'),
        ('Competing pages', 'Review query-page overlap before assuming two pages need consolidation.', 'GSC'),
        ('Freshness', 'Verify time-sensitive claims and record the actual review date.', 'Primary sources'),
        ('Evidence and authorship', 'Identify the responsible expert and link factual claims to supporting evidence.', 'Manual review'),
        ('Low-value pages', 'Identify pages with little distinct value; review their purpose before removal.', 'Crawl / analytics'),
        ('Repeated content', 'Give pages a distinct job; merge only with evidence and a redirect plan.', 'Crawl / manual'),
        ('Readability', 'Use descriptive headings, direct answers and language the audience understands.', 'Manual review'),
        ('Topic coverage', 'Cover necessary subtopics without adding unrelated material.', 'Manual review'),
        ('Demand gaps', 'Compare real queries and customer questions with existing page coverage.', 'GSC / customer input'),
        ('Useful media', 'Use relevant examples or visuals with accessible descriptions and factual captions.', 'Browser'),
        ('Next action', 'Offer a relevant next step and ensure the promised download or form works.', 'Browser'),
        ('Engagement evidence', 'Check consent and event definitions before interpreting engagement or conversion rates.', 'Analytics / browser'),
    ],
    'Off-page signals': [
        ('Relevant referring sites', 'Review links from relevant, credible pages. Raw domain count is not a quality score.', 'Backlink tool'),
        ('Anchor context', 'Review anchor text in context and investigate links that appear manipulated.', 'Backlink tool'),
        ('Suspicious links', 'Investigate evidence of spam or manual actions; do not disavow on a tool score alone.', 'GSC / manual'),
        ('Link changes', 'Investigate meaningful new or lost links; separate data-provider changes from real changes.', 'Backlink tool'),
        ('Competitor sources', 'Identify relevant publications and resources that could use your original work.', 'Backlink / manual'),
        ('Brand mentions', 'Check accuracy and context of business mentions and linked destinations.', 'Search / manual'),
        ('Local information', 'Where applicable, check business name, contact details and service-area accuracy.', 'Business listings'),
        ('Reviews', 'Verify review provenance and respond to real service issues; do not invent testimonials.', 'Review platforms'),
        ('Official profiles', 'Check official profile links and consistent business identity.', 'Manual review'),
        ('Authority context', 'Treat third-party authority scores as comparative diagnostics, not Google metrics.', 'Backlink / GSC'),
    ],
}

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CellSmall', fontName='Helvetica', fontSize=8, leading=10, textColor=colors.HexColor('#1e293b')))
styles.add(ParagraphStyle(name='TableHead', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.white))
styles['Title'].textColor = colors.HexColor('#0f172a')
styles['Title'].alignment = TA_LEFT
styles['Heading1'].textColor = colors.HexColor('#0f172a')
styles['BodyText'].fontSize = 10
styles['BodyText'].leading = 15
styles['BodyText'].spaceAfter = 9

def p(text, style='CellSmall'):
    return Paragraph(escape(text), styles[style])

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#0891b2'))
    canvas.line(36, 34, A4[0] - 36, 34)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#475569'))
    canvas.drawString(36, 22, 'AuditWeb | Manual website audit checklist | 5 September 2026')
    canvas.drawRightString(A4[0] - 36, 22, str(doc.page))
    canvas.restoreState()

def table(rows, widths):
    t = Table(rows, colWidths=widths, repeatRows=1, hAlign='LEFT')
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f172a')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f1f5f9')]),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6), ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LINEBELOW', (0, 0), (-1, 0), 2, colors.HexColor('#0891b2')),
        ('LINEBELOW', (0, 1), (-1, -1), .3, colors.HexColor('#cbd5e1')),
    ]))
    return t

story = [p('Website audit checklist', 'Title'), p('50 checks. Evidence first. A practical action plan.', 'Heading2')]
for text in [
    'Use this printable template to review a website manually. It does not scan URLs or certify compliance. Record evidence for each score and investigate critical issues even if the total score is high.',
    'Website: _________________________________________________',
    'Reviewer: _____________________  Review date: _______________',
    'Scope / sampled URLs: ______________________________________',
    'Start with technical access. Review on-page content next. Finish with external evidence and an action plan. Use the check IDs to connect findings to affected URLs.',
]: story.append(p(text, 'BodyText'))
story += [p('Scoring', 'Heading2')]
for text in ['0 = Critical failure supported by evidence.', '1 = Significant issue requiring investigation or a fix.', '2 = A specific improvement remains.', '3 = Meets the stated check within the reviewed scope.', 'N/A = Not applicable. Blank = Not checked. Neither counts as a completed check.', 'Progress = scored checks / applicable checks. Score = sum of numeric scores / (3 x scored checks) x 100. Leave the score blank when no checks are scored. Always report progress alongside the score.']:
    story.append(p(text, 'BodyText'))
story += [p('Use and limitations', 'Heading2'), p('Free for personal and commercial use. You may adapt and redistribute this template. Attribution to auditweb.site is appreciated. Standards and tool behaviour can change; verify the references before acting. Review counts and scores are organisational aids, not predictions of rankings or revenue.', 'BodyText')]
count = 0
for section, checks in SECTIONS.items():
    story += [PageBreak(), p(section, 'Heading1'), p(f'{len(checks)} checks | Record 0-3, N/A, or leave blank until checked.', 'BodyText')]
    rows = [[p(v, 'TableHead') for v in ['ID / check', 'Evidence to review', 'Method', 'Score']]]
    for name, standard, method in checks:
        count += 1
        rows.append([p(f'{count:02d}. {name}'), p(standard), p(method), p('____')])
    story.append(table(rows, [111, 259, 105, 48]))
    story += [Spacer(1, 12), p('Evidence notes: record check ID, affected URL, observation and source.', 'BodyText'), p('____________________________________________________________________', 'BodyText')]
assert count == 50
story += [PageBreak(), p('Action plan and references', 'Heading1'), p('Choose the next actions from observed evidence. Assign an owner and a verification step to each fix. Critical failures take priority over an average score.', 'BodyText')]
rows = [[p(v, 'TableHead') for v in ['Check / URL', 'Finding and proposed fix', 'Owner / date', 'Verification']]]
rows += [[p('________________'), p('________________________\n\n________________________'), p('____________'), p('____________')] for _ in range(5)]
story += [table(rows, [111, 202, 105, 105]), Spacer(1, 15), p('Primary references', 'Heading2')]
for label, url in [
    ('Google Search: SEO fundamentals', 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide'),
    ('Web Vitals: field metrics and thresholds', 'https://web.dev/articles/vitals'),
    ('Google Search: robots.txt', 'https://developers.google.com/search/docs/crawling-indexing/robots/intro'),
    ('Google Search: canonical URLs', 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls'),
]:
    story.append(Paragraph(f'<b>{escape(label)}</b><br/><link href="{url}" color="#036779">{escape(url)}</link>', styles['BodyText']))
story += [p('Glossary: GSC = Google Search Console. PSI = PageSpeed Insights. p75 = 75th percentile. A crawl is an inventory of fetched URLs and their responses.', 'BodyText')]
OUT.parent.mkdir(parents=True, exist_ok=True)
SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=36, leftMargin=36, topMargin=35, bottomMargin=48, title='AuditWeb: 50-check website audit template', author='AuditWeb').build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)
