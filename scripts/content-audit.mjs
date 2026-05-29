import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DOCS = 'src/content/docs';
const issues = [];

const OUTDATED_KEYWORDS = [
  { keyword: 'actions-gh-pages@v3', fix: 'actions-gh-pages@v4', severity: 'high' },
  { keyword: 'matplotlib.pyplot.show()', fix: '保存为图片文件', severity: 'medium' },
  { keyword: 'Thread.sleep()', fix: '使用虚拟线程/Project Loom', severity: 'low' },
];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.md')) {
      const raw = readFileSync(full, 'utf-8');
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!match) {
        issues.push({ file: full, issue: 'NO_FRONTMATTER', severity: 'high' });
        continue;
      }
      const fm = match[1];
      const body = raw.slice(match[0].length).trim();
      const titleLine = fm.match(/title:\s*["']?(.*?)["']?\s*$/m);
      const title = titleLine ? titleLine[1] : '';
      const modLine = fm.match(/module:\s*["']?(.*?)["']?\s*$/m);
      const mod = modLine ? modLine[1] : '';
      const orderLine = fm.match(/order:\s*(\d+)/m);
      const order = orderLine ? orderLine[1] : '';
      const diffLine = fm.match(/difficulty:\s*["']?(.*?)["']?\s*$/m);
      const diff = diffLine ? diffLine[1] : '';

      if (!title || title === '#')
        issues.push({ file: full, issue: `BAD_TITLE: "${title}"`, severity: 'high' });
      if (!mod) issues.push({ file: full, issue: 'MISSING_MODULE', severity: 'high' });
      if (!order && order !== '0')
        issues.push({ file: full, issue: 'MISSING_ORDER', severity: 'medium' });
      if (!diff) issues.push({ file: full, issue: 'MISSING_DIFFICULTY', severity: 'medium' });
      if (body.length < 30)
        issues.push({ file: full, issue: `THIN_BODY: ${body.length} chars`, severity: 'medium' });

      OUTDATED_KEYWORDS.forEach(({ keyword, fix, severity }) => {
        if (body.includes(keyword)) {
          issues.push({
            file: full,
            issue: `OUTDATED: "${keyword}" → "${fix}"`,
            severity,
          });
        }
      });

      if (body.length > 10000 && !body.includes('## 前置知识') && !body.includes('## 学习目标')) {
        issues.push({
          file: full,
          issue: `MISSING_PREAMBLE: 长文档(${body.length}字符)缺少前置知识/学习目标`,
          severity: 'low',
        });
      }

      const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
      let m;
      while ((m = linkPattern.exec(body)) !== null) {
        const href = m[2];
        if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) continue;
        issues.push({ file: full, issue: `INTERNAL_LINK: ${href}`, severity: 'low' });
      }

      const wikiPattern = /\[\[([^\]]+)\]\]/g;
      while ((m = wikiPattern.exec(body)) !== null) {
        issues.push({ file: full, issue: `WIKILINK: [[${m[1]}]]`, severity: 'medium' });
      }
    }
  }
}

walk(DOCS);

const severityOrder = { high: 0, medium: 1, low: 2 };
issues.sort((a, b) => (severityOrder[a.severity] || 1) - (severityOrder[b.severity] || 1));

const byType = {};
for (const i of issues) {
  const type = i.issue.split(':')[0];
  if (!byType[type]) byType[type] = [];
  byType[type].push(i);
}

console.log('\n=== FANDEX Content Quality Audit ===\n');

const highCount = issues.filter((i) => i.severity === 'high').length;
const medCount = issues.filter((i) => i.severity === 'medium').length;
const lowCount = issues.filter((i) => i.severity === 'low').length;

console.log(
  `Summary: ${issues.length} issues (HIGH: ${highCount}, MEDIUM: ${medCount}, LOW: ${lowCount})\n`
);

for (const [type, items] of Object.entries(byType)) {
  console.log(`\n[${type}] (${items.length} issues)`);
  items.slice(0, 10).forEach((i) => {
    const tag = i.severity ? `[${i.severity.toUpperCase()}]` : '';
    console.log(`  ${tag} ${i.file}: ${i.issue}`);
  });
  if (items.length > 10) console.log(`  ... and ${items.length - 10} more`);
}

console.log(`\nTotal issues: ${issues.length}`);

if (highCount > 0) {
  console.log(`\n❌ ${highCount} HIGH severity issues found!`);
  process.exit(1);
} else {
  console.log('\n✅ No HIGH severity issues found.');
  process.exit(0);
}
