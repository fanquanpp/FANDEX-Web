import fs from 'fs';
import path from 'path';

const ROOT_DIR = '.';
const SRC_CONTENT_DIR = 'src/content';
const PUBLIC_DIR = 'public';

const REDUNDANT_ROOT_DIRS = [
  'algorithm',
  'c',
  'cpp',
  'cs-fundamentals',
  'css',
  'data-analysis',
  'git',
  'github',
  'html5',
  'java',
  'javascript',
  'lua',
  'markdown',
  'mysql',
  'python',
  'typescript',
  'vue3',
];

const REQUIRED_GITIGNORE_ENTRIES = ['node_modules/', 'dist/', '.astro/', '.DS_Store'];

const LARGE_FILE_THRESHOLD = 50 * 1024 * 1024;

let issues = 0;

function checkRedundantRootDirs() {
  console.log('\n=== 1. Redundant Root Content Directories ===');
  let found = 0;
  for (const dir of REDUNDANT_ROOT_DIRS) {
    const fullPath = path.join(ROOT_DIR, dir);
    if (fs.existsSync(fullPath)) {
      console.log(`  [ISSUE] Redundant directory: ${dir}/`);
      found++;
      issues++;
    }
  }
  if (found === 0) console.log('  [OK] No redundant root content directories');
}

function checkOrphanMarkdownFiles() {
  console.log('\n=== 2. Orphan Markdown Files (outside src/content/) ===');
  const rootFiles = fs.readdirSync(ROOT_DIR).filter((f) => f.endsWith('.md') && f !== 'README.md');
  if (rootFiles.length > 0) {
    for (const f of rootFiles) {
      console.log(`  [ISSUE] Orphan .md at root: ${f}`);
      issues++;
    }
  } else {
    console.log('  [OK] No orphan .md files at root');
  }
}

function checkOrphanImages() {
  console.log('\n=== 3. Orphan Images in public/ ===');
  const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
  const publicImages = [];

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (imageExts.some((ext) => entry.name.endsWith(ext))) {
        publicImages.push(fullPath);
      }
    }
  }

  scanDir(PUBLIC_DIR);

  if (publicImages.length === 0) {
    console.log('  [OK] No images in public/ to check');
    return;
  }

  const allMdContent = [];
  function collectMd(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) collectMd(fullPath);
      else if (entry.name.endsWith('.md')) {
        allMdContent.push(fs.readFileSync(fullPath, 'utf-8'));
      }
    }
  }
  collectMd(SRC_CONTENT_DIR);

  for (const imgPath of publicImages) {
    const imgName = path.basename(imgPath);
    const referenced = allMdContent.some((c) => c.includes(imgName));
    if (!referenced) {
      console.log(`  [ISSUE] Orphan image: ${imgPath}`);
      issues++;
    } else {
      console.log(`  [OK] Referenced: ${imgPath}`);
    }
  }
}

function checkLargeFiles() {
  console.log('\n=== 4. Large Files (>50MB, excluding node_modules) ===');
  let found = false;

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    if (dir.includes('node_modules') || dir.includes('.git')) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else {
        const stat = fs.statSync(fullPath);
        if (stat.size > LARGE_FILE_THRESHOLD) {
          const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
          console.log(`  [ISSUE] Large file: ${fullPath} (${sizeMB} MB)`);
          issues++;
          found = true;
        }
      }
    }
  }

  scanDir(ROOT_DIR);
  if (!found) console.log('  [OK] No files exceed 50MB');
}

function checkGitignore() {
  console.log('\n=== 5. .gitignore Completeness ===');
  const gitignorePath = path.join(ROOT_DIR, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log('  [ISSUE] .gitignore not found!');
    issues++;
    return;
  }

  const content = fs.readFileSync(gitignorePath, 'utf-8');
  for (const entry of REQUIRED_GITIGNORE_ENTRIES) {
    if (!content.includes(entry)) {
      console.log(`  [ISSUE] Missing .gitignore entry: ${entry}`);
      issues++;
    } else {
      console.log(`  [OK] Present: ${entry}`);
    }
  }
}

function checkFrontmatterCompleteness() {
  console.log('\n=== 6. Frontmatter Completeness ===');
  const requiredFields = ['title', 'module', 'order', 'tags', 'difficulty'];
  const missingCounts = {};
  requiredFields.forEach((f) => (missingCounts[f] = 0));

  let total = 0;

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) scanDir(fullPath);
      else if (entry.name.endsWith('.md')) {
        total++;
        const content = fs.readFileSync(fullPath, 'utf-8');
        for (const field of requiredFields) {
          const regex = new RegExp(`^${field}\\s*[:=]`, 'm');
          if (!regex.test(content)) {
            missingCounts[field]++;
          }
        }
      }
    }
  }

  scanDir(path.join(SRC_CONTENT_DIR, 'docs'));

  console.log(`  Total docs files: ${total}`);
  for (const [field, count] of Object.entries(missingCounts)) {
    if (count > 0) {
      console.log(`  [ISSUE] Missing '${field}': ${count} files`);
      issues++;
    } else {
      console.log(`  [OK] All files have '${field}'`);
    }
  }
}

function main() {
  console.log('========================================');
  console.log('  CODEX Codebase Audit Report');
  console.log('========================================');

  checkRedundantRootDirs();
  checkOrphanMarkdownFiles();
  checkOrphanImages();
  checkLargeFiles();
  checkGitignore();
  checkFrontmatterCompleteness();

  console.log('\n========================================');
  console.log(`  Total Issues: ${issues}`);
  console.log('========================================');

  process.exit(issues > 0 ? 1 : 0);
}

main();
