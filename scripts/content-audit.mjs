import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DOCS = 'src/content/docs';
const issues = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.md')) {
      const raw = readFileSync(full, 'utf-8');
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!match) {
        issues.push({ file: full, issue: 'NO_FRONTMATTER' });
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

      if (!title || title === '#') issues.push({ file: full, issue: `BAD_TITLE: "${title}"` });
      if (!mod) issues.push({ file: full, issue: 'MISSING_MODULE' });
      if (!order && order !== '0') issues.push({ file: full, issue: 'MISSING_ORDER' });
      if (!diff) issues.push({ file: full, issue: 'MISSING_DIFFICULTY' });
      if (body.length < 30) issues.push({ file: full, issue: `THIN_BODY: ${body.length} chars` });

      const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
      let m;
      while ((m = linkPattern.exec(body)) !== null) {
        const href = m[2];
        if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) continue;
        issues.push({ file: full, issue: `INTERNAL_LINK: ${href}` });
      }

      const wikiPattern = /\[\[([^\]]+)\]\]/g;
      while ((m = wikiPattern.exec(body)) !== null) {
        issues.push({ file: full, issue: `WIKILINK: [[${m[1]}]]` });
      }
    }
  }
}

walk(DOCS);

const byType = {};
for (const i of issues) {
  const type = i.issue.split(':')[0];
  if (!byType[type]) byType[type] = [];
  byType[type].push(i);
}

console.log('\n=== CODEX Content Quality Audit ===\n');
for (const [type, items] of Object.entries(byType)) {
  console.log(`\n[${type}] (${items.length} issues)`);
  items.slice(0, 10).forEach((i) => console.log(`  ${i.file}: ${i.issue}`));
  if (items.length > 10) console.log(`  ... and ${items.length - 10} more`);
}

console.log(`\nTotal issues: ${issues.length}`);
