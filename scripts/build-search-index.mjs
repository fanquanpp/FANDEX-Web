import { readdir, readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { join, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = join(__dirname, '..', 'src', 'content', 'docs');
const OUTPUT_DIR = join(__dirname, '..', 'public', 'data');
const OUTPUT_FILE = join(OUTPUT_DIR, 'search-index.json');
const MAX_SIZE = 100 * 1024;

async function walkDir(dir, ext, fn) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walkDir(full, ext, fn);
    else if (entry.name.endsWith(ext)) await fn(full);
  }
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const raw = match[1];
  const data = {};
  let key = null;
  let inArray = false;
  let arrayVals = [];

  for (const line of raw.split('\n')) {
    if (inArray) {
      const itemMatch = line.match(/^\s+-\s+['"]?(.+?)['"]?\s*$/);
      if (itemMatch) {
        arrayVals.push(itemMatch[1]);
        continue;
      }
      data[key] = arrayVals;
      inArray = false;
      key = null;
      arrayVals = [];
    }
    const kvMatch = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kvMatch) {
      const k = kvMatch[1];
      const v = kvMatch[2].trim();
      if (v === '') {
        key = k;
        inArray = true;
        arrayVals = [];
      } else {
        data[k] = v.replace(/^['"]|['"]$/g, '');
      }
    }
  }
  if (inArray && key) data[key] = arrayVals;
  return data;
}

function slugFromPath(filePath) {
  const rel = filePath.replace(DOCS_DIR + sep, '').replace(/[/\\]/g, '/');
  return rel.replace(/\.md$/, '');
}

async function main() {
  const entries = [];

  await walkDir(DOCS_DIR, '.md', async (filePath) => {
    const content = await readFile(filePath, 'utf-8');
    const fm = parseFrontmatter(content);
    if (!fm.title) return;

    entries.push({
      slug: slugFromPath(filePath),
      title: fm.title || '',
      description: fm.description || '',
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      module: fm.module || '',
      order: Number(fm.order) || 0,
      difficulty: fm.difficulty || '',
      updated: fm.updated || '',
    });
  });

  entries.sort((a, b) => a.module.localeCompare(b.module) || a.order - b.order);

  await mkdir(OUTPUT_DIR, { recursive: true });
  const json = JSON.stringify(entries);
  const size = Buffer.byteLength(json, 'utf-8');

  if (size > MAX_SIZE) {
    const trimmed = entries.map((e) => ({
      s: e.slug,
      t: e.title,
      d: e.description.slice(0, 80),
      g: e.tags,
      m: e.module,
      o: e.order,
      f: e.difficulty,
      u: e.updated,
    }));
    const compressed = JSON.stringify(trimmed);
    const cSize = Buffer.byteLength(compressed, 'utf-8');
    if (cSize <= MAX_SIZE) {
      await writeFile(OUTPUT_FILE, compressed, 'utf-8');
      console.log(
        `Search index: ${entries.length} docs written (${(cSize / 1024).toFixed(1)}KB, compressed keys) to ${OUTPUT_FILE}`
      );
      return;
    }
  }

  await writeFile(OUTPUT_FILE, json, 'utf-8');
  console.log(
    `Search index: ${entries.length} docs written (${(size / 1024).toFixed(1)}KB) to ${OUTPUT_FILE}`
  );
}

main().catch(console.error);
