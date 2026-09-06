export interface AuditTool {
  id: string;
  name: string;
  tasks: Array<'crawl' | 'search' | 'speed' | 'accessibility'>;
  access: 'free' | 'free-tier' | 'paid';
  accessLabel: string;
  runs: string;
  fit: string;
  evidence: string;
  limitation: string;
  source: string;
  checked: string;
  guide?: string;
}

export const tasks = [
  { id: 'all', label: 'All tools' },
  { id: 'crawl', label: 'SEO & crawling' },
  { id: 'search', label: 'Search visibility' },
  { id: 'speed', label: 'Page speed' },
  { id: 'accessibility', label: 'Accessibility' },
];

export const auditTools: AuditTool[] = [
  {
    id: 'screaming-frog', name: 'Screaming Frog SEO Spider', tasks: ['crawl'], access: 'free-tier',
    accessLabel: 'Free tier · paid licence', runs: 'Desktop crawler',
    fit: 'Inspecting URLs, redirects and internal links in detail.',
    evidence: 'Response codes, page titles, canonicals and crawl exports.',
    limitation: 'The free crawl is limited to 500 URLs. JavaScript rendering requires a licence.',
    source: 'https://www.screamingfrog.co.uk/seo-spider/', checked: '2026-09-06', guide: 'screaming-frog',
  },
  {
    id: 'ahrefs', name: 'Ahrefs Site Audit', tasks: ['crawl'], access: 'free-tier',
    accessLabel: 'Free tier · paid plans', runs: 'Cloud crawler',
    fit: 'Reviewing technical SEO issues with page-level context.',
    evidence: 'Indexability, redirects, internal links and rendered page data.',
    limitation: 'Free access has crawl allowances. Confirm ownership requirements and project limits.',
    source: 'https://ahrefs.com/site-audit', checked: '2026-09-06', guide: 'ahrefs',
  },
  {
    id: 'semrush', name: 'Semrush Site Audit', tasks: ['crawl'], access: 'free-tier',
    accessLabel: 'Free tier · paid plans', runs: 'Cloud crawler',
    fit: 'Scheduling technical audits alongside other SEO work.',
    evidence: 'Site-wide issues, crawl history and progress reports.',
    limitation: 'Access without the SEO Toolkit allows 100 pages per month. JavaScript rendering requires a higher plan.',
    source: 'https://www.semrush.com/kb/31-site-audit', checked: '2026-09-06', guide: 'semrush',
  },
  {
    id: 'sitebulb', name: 'Sitebulb', tasks: ['crawl'], access: 'paid',
    accessLabel: 'Paid plans · trial available', runs: 'Desktop or cloud crawler',
    fit: 'Explaining technical crawl findings to a team.',
    evidence: 'Prioritised hints, crawl visualisations and PDF reports.',
    limitation: 'Desktop capacity depends on your machine. Cloud crawling is a separate plan choice.',
    source: 'https://sitebulb.com/', checked: '2026-09-06',
  },
  {
    id: 'se-ranking', name: 'SE Ranking Website Audit', tasks: ['crawl'], access: 'paid',
    accessLabel: 'Paid plans · trial available', runs: 'Cloud crawler',
    fit: 'Recurring audits and reporting across client websites.',
    evidence: 'Issue groups, page health, crawl comparisons and exports.',
    limitation: 'Check page allowances and reporting features against the plan you intend to buy.',
    source: 'https://seranking.com/website-audit.html', checked: '2026-09-06', guide: 'se-ranking',
  },
  {
    id: 'woorank', name: 'WooRank', tasks: ['crawl'], access: 'paid',
    accessLabel: 'Paid plans · trial available', runs: 'Cloud SEO platform',
    fit: 'Turning website checks into a marketing task list.',
    evidence: 'Website reviews, technical checks and keyword tracking.',
    limitation: 'A marketing checklist still needs page-level investigation and human prioritisation.',
    source: 'https://www.woorank.com/', checked: '2026-09-06', guide: 'woorank',
  },
  {
    id: 'search-console', name: 'Google Search Console', tasks: ['search'], access: 'free',
    accessLabel: 'Free', runs: 'Verified-property dashboard',
    fit: 'Understanding how Google discovers and shows your site.',
    evidence: 'Search queries, impressions, clicks and URL inspection.',
    limitation: 'Requires property access. It does not replace a complete site crawler.',
    source: 'https://search.google.com/search-console/about', checked: '2026-09-06',
  },
  {
    id: 'lighthouse', name: 'Google Lighthouse', tasks: ['speed', 'accessibility'], access: 'free',
    accessLabel: 'Free · open source', runs: 'Browser or command line',
    fit: 'Diagnosing a page during development or a release review.',
    evidence: 'Lab performance, automated accessibility and SEO checks.',
    limitation: 'Lab results vary with test conditions. Automated checks cannot prove accessibility compliance.',
    source: 'https://developer.chrome.com/docs/lighthouse/overview/', checked: '2026-09-06', guide: 'lighthouse',
  },
  {
    id: 'pagespeed', name: 'PageSpeed Insights', tasks: ['speed'], access: 'free',
    accessLabel: 'Free', runs: 'Web-based page test',
    fit: 'Comparing a page’s lab diagnostics with real-user loading data.',
    evidence: 'Lighthouse diagnostics and Chrome UX Report field data when available.',
    limitation: 'Low-traffic URLs may lack field data. A lab score alone is not a Core Web Vitals verdict.',
    source: 'https://developers.google.com/speed/docs/insights/v5/about', checked: '2026-09-06',
  },
  {
    id: 'wave', name: 'WAVE', tasks: ['accessibility'], access: 'free',
    accessLabel: 'Free web tool & extension', runs: 'Web tool or browser extension',
    fit: 'Finding accessibility issues in the context of a page.',
    evidence: 'On-page annotations for detected errors and structural elements.',
    limitation: 'Human evaluation is still required. API and large-scale services have separate terms.',
    source: 'https://wave.webaim.org/', checked: '2026-09-06',
  },
];
