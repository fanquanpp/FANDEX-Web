import fs from 'fs';
import path from 'path';

const DOCS_DIR = 'src/content/docs';

const MODULE_ORDER_PRIORITY = {
  overview: -10,
  'quick-start': -5,
};

const DIFFICULTY_HEURISTICS = {
  beginner: [
    'overview',
    'quick-start',
    'syntax-basics',
    'setup-and-init',
    'mysql-install',
    'basic-operations',
    'variables-and-constants',
    'data-types',
    'syntax-structure',
  ],
  advanced: [
    'advanced',
    'optimization',
    'profiling',
    'performance',
    'injection-attacks',
    'injection-defense',
    'multithreading',
    'jvm-memory-model',
    'memory-management',
    'compilation',
    'internals',
    'hooks-and-lfs',
    'debugging',
  ],
};

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { raw: '', body: content };
  return { raw: match[1], body: content.slice(match[0].length) };
}

function hasField(frontmatterRaw, fieldName) {
  const regex = new RegExp(`^${fieldName}\\s*[:=]`, 'm');
  return regex.test(frontmatterRaw);
}

function getFieldValue(frontmatterRaw, fieldName) {
  const regex = new RegExp(`^${fieldName}\\s*:\\s*["']?(.+?)["']?\\s*$`, 'm');
  const match = frontmatterRaw.match(regex);
  return match ? match[1].trim().replace(/["']/g, '') : null;
}

function inferDifficulty(filename) {
  const base = filename.replace(/\.md$/, '');
  for (const [level, patterns] of Object.entries(DIFFICULTY_HEURISTICS)) {
    if (patterns.some((p) => base.includes(p))) return level;
  }
  return 'intermediate';
}

function inferTags(module, category, filename) {
  const tags = [module];
  if (category && category !== module) tags.push(category.toLowerCase().replace(/[/\s]/g, '-'));
  const base = filename.replace(/\.md$/, '');
  if (base.includes('exercise')) tags.push('exercises');
  if (base.includes('glossary')) tags.push('glossary');
  if (base.includes('project')) tags.push('project');
  if (base.includes('theory')) tags.push('theory');
  return [...new Set(tags)];
}

function addFieldToFrontmatter(frontmatterRaw, fieldName, value) {
  if (fieldName === 'tags') {
    return frontmatterRaw + `\ntags:\n${value.map((t) => `  - "${t}"`).join('\n')}`;
  }
  if (typeof value === 'number') {
    return frontmatterRaw + `\n${fieldName}: ${value}`;
  }
  return frontmatterRaw + `\n${fieldName}: "${value}"`;
}

function processModule(moduleDir) {
  const moduleFiles = fs
    .readdirSync(moduleDir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md');

  const entries = [];

  for (const file of moduleFiles) {
    const filePath = path.join(moduleDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { raw, body } = parseFrontmatter(content);

    const module = getFieldValue(raw, 'module') || path.basename(moduleDir);
    const category = getFieldValue(raw, 'category') || '';

    entries.push({ file, filePath, content, raw, body, module, category });
  }

  const subDirs = fs.readdirSync(moduleDir, { withFileTypes: true }).filter((d) => d.isDirectory());

  for (const subDir of subDirs) {
    const subPath = path.join(moduleDir, subDir.name);
    const subFiles = fs.readdirSync(subPath).filter((f) => f.endsWith('.md'));
    for (const file of subFiles) {
      const filePath = path.join(subPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { raw, body } = parseFrontmatter(content);
      const module = getFieldValue(raw, 'module') || path.basename(moduleDir);
      const category = getFieldValue(raw, 'category') || '';
      entries.push({ file, filePath, content, raw, body, module, category });
    }
  }

  entries.sort((a, b) => {
    const aBase = a.file.replace(/\.md$/, '');
    const bBase = b.file.replace(/\.md$/, '');
    const aPri = MODULE_ORDER_PRIORITY[aBase] || 0;
    const bPri = MODULE_ORDER_PRIORITY[bBase] || 0;
    if (aPri !== bPri) return bPri - aPri;
    return aBase.localeCompare(bBase);
  });

  return entries;
}

function main() {
  const modules = fs.readdirSync(DOCS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());

  let totalModified = 0;
  let totalOrderAdded = 0;
  let totalTagsAdded = 0;
  let totalDifficultyAdded = 0;

  for (const mod of modules) {
    const moduleDir = path.join(DOCS_DIR, mod.name);
    const entries = processModule(moduleDir);

    let orderCounter = 10;

    for (const entry of entries) {
      let modified = false;
      let fm = entry.raw;

      if (!hasField(fm, 'order')) {
        fm = addFieldToFrontmatter(fm, 'order', orderCounter);
        totalOrderAdded++;
        modified = true;
      }
      orderCounter += 10;

      if (!hasField(fm, 'tags')) {
        const tags = inferTags(entry.module, entry.category, entry.file);
        fm = addFieldToFrontmatter(fm, 'tags', tags);
        totalTagsAdded++;
        modified = true;
      }

      if (!hasField(fm, 'difficulty')) {
        const difficulty = inferDifficulty(entry.file);
        fm = addFieldToFrontmatter(fm, 'difficulty', difficulty);
        totalDifficultyAdded++;
        modified = true;
      }

      if (modified) {
        const newContent = `---\n${fm}\n---${entry.body}`;
        fs.writeFileSync(entry.filePath, newContent, 'utf-8');
        totalModified++;
        console.log(`[FIXED] ${path.relative(DOCS_DIR, entry.filePath)}`);
      }
    }
  }

  console.log('\n=== Frontmatter Fix Report ===');
  console.log(`Files modified:  ${totalModified}`);
  console.log(`order added:     ${totalOrderAdded}`);
  console.log(`tags added:      ${totalTagsAdded}`);
  console.log(`difficulty added: ${totalDifficultyAdded}`);
}

main();
