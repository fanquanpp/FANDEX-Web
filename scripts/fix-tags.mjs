import fs from 'fs';
import path from 'path';

const DOCS_DIR = 'src/content/docs';

const GARBAGE_TAGS = /^[\d:]+$/;

const TAG_RULES = [
  {
    tag: 'oop',
    keywords: [
      'class',
      'inheritance',
      'polymorphism',
      'encapsulation',
      'abstract class',
      'interface',
      'extends',
      'implements',
      'super(',
    ],
  },
  {
    tag: 'async',
    keywords: [
      'async',
      'await',
      'promise',
      'callback',
      'event loop',
      'concurrent',
      'future',
      'coroutine',
      'asyncio',
    ],
  },
  {
    tag: 'design-patterns',
    keywords: [
      'design pattern',
      'singleton',
      'factory',
      'observer',
      'strategy',
      'decorator',
      'adapter',
      'proxy pattern',
      'mvc',
      'mvvm',
    ],
  },
  {
    tag: 'testing',
    keywords: [
      'unit test',
      'integration test',
      'jest',
      'pytest',
      'junit',
      'mock',
      'assert',
      'test suite',
      'tdd',
    ],
  },
  {
    tag: 'security',
    keywords: [
      'sql injection',
      'xss',
      'csrf',
      'authentication',
      'authorization',
      'encryption',
      'hash',
      'ssl',
      'tls',
      'vulnerability',
    ],
  },
  {
    tag: 'performance',
    keywords: [
      'optimization',
      'profiling',
      'benchmark',
      'caching',
      'lazy load',
      'memoiz',
      'time complexity',
      'space complexity',
      'big o',
    ],
  },
  {
    tag: 'database',
    keywords: [
      'sql',
      'query',
      'index',
      'join',
      'transaction',
      'acid',
      'normaliz',
      'schema',
      'migration',
      'orm',
    ],
  },
  {
    tag: 'networking',
    keywords: [
      'http',
      'tcp',
      'udp',
      'socket',
      'dns',
      'rest',
      'api',
      'request',
      'response',
      'websocket',
    ],
  },
  {
    tag: 'functional',
    keywords: [
      'lambda',
      'map(',
      'filter(',
      'reduce(',
      'closure',
      'pure function',
      'immutab',
      'higher-order',
      'currying',
    ],
  },
  {
    tag: 'memory',
    keywords: [
      'memory',
      'pointer',
      'garbage collection',
      'heap',
      'stack',
      'memory leak',
      'allocation',
      'reference count',
    ],
  },
  {
    tag: 'concurrency',
    keywords: [
      'thread',
      'mutex',
      'lock',
      'semaphore',
      'race condition',
      'deadlock',
      'parallel',
      'concurrent',
      'atomic',
    ],
  },
  {
    tag: 'typescript',
    keywords: [
      'typescript',
      'type system',
      'generic',
      'interface ts',
      'enum',
      'type guard',
      'declaration',
    ],
  },
  {
    tag: 'reactive',
    keywords: [
      'reactive',
      'observable',
      'subscribe',
      'watch',
      'computed',
      'ref(',
      'reactive(',
      'state management',
    ],
  },
  {
    tag: 'css-layout',
    keywords: [
      'flexbox',
      'grid',
      'position',
      'float',
      'responsive',
      'media query',
      'viewport',
      'container query',
    ],
  },
  {
    tag: 'git-workflow',
    keywords: ['branch', 'merge', 'rebase', 'conflict', 'cherry-pick', 'stash', 'bisect', 'hook'],
  },
  {
    tag: 'data-structure',
    keywords: [
      'array',
      'linked list',
      'tree',
      'graph',
      'hash table',
      'queue',
      'stack',
      'heap',
      'trie',
    ],
  },
  {
    tag: 'algorithm',
    keywords: [
      'sorting',
      'searching',
      'dynamic programming',
      'greedy',
      'backtracking',
      'divide and conquer',
      'bfs',
      'dfs',
    ],
  },
  {
    tag: 'web-api',
    keywords: [
      'fetch',
      'dom',
      'event',
      'web worker',
      'service worker',
      'localstorage',
      'sessionstorage',
      'canvas',
      'webgl',
    ],
  },
  {
    tag: 'devops',
    keywords: [
      'docker',
      'kubernetes',
      'ci/cd',
      'pipeline',
      'deploy',
      'container',
      'nginx',
      'monitoring',
    ],
  },
  {
    tag: 'math',
    keywords: [
      'matrix',
      'vector',
      'probability',
      'statistics',
      'linear algebra',
      'calculus',
      'discrete math',
    ],
  },
];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { raw: '', body: content };
  return { raw: match[1], body: content.slice(match[0].length) };
}

function extractCurrentTags(fmRaw) {
  const tagLines = [];
  let inTags = false;
  for (const line of fmRaw.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('tags:')) {
      inTags = true;
      continue;
    }
    if (inTags) {
      if (trimmed.startsWith('- ')) {
        const val = trimmed.slice(2).replace(/["']/g, '').trim();
        tagLines.push(val);
      } else if (trimmed === '' || !trimmed.startsWith(' ')) {
        inTags = false;
      }
    }
  }
  return tagLines;
}

function inferTagsFromBody(body) {
  const lowerBody = body.toLowerCase();
  const inferred = [];
  for (const rule of TAG_RULES) {
    const matchCount = rule.keywords.filter((kw) => lowerBody.includes(kw.toLowerCase())).length;
    if (
      matchCount >= 2 ||
      (matchCount >= 1 &&
        rule.keywords.some((kw) => lowerBody.includes(kw.toLowerCase()) && kw.length > 6))
    ) {
      inferred.push(rule.tag);
    }
  }
  return inferred;
}

function replaceTagsInFrontmatter(fmRaw, newTags) {
  let lines = fmRaw.split('\n');
  let tagStartIdx = -1;
  let tagEndIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('tags:')) {
      tagStartIdx = i;
      continue;
    }
    if (tagStartIdx !== -1 && tagEndIdx === -1) {
      if (lines[i].trim().startsWith('- ')) continue;
      if (lines[i].trim() === '') continue;
      tagEndIdx = i;
    }
  }

  if (tagStartIdx === -1) return fmRaw;

  if (tagEndIdx === -1) tagEndIdx = lines.length;

  while (tagEndIdx > tagStartIdx + 1 && lines[tagEndIdx - 1].trim() === '') {
    tagEndIdx--;
  }

  const before = lines.slice(0, tagStartIdx);
  const after = lines.slice(tagEndIdx);

  const tagLines = newTags.map((t) => `  - "${t}"`);
  const newLines = [...before, `tags:`, ...tagLines, ...after];

  return newLines.join('\n');
}

function main() {
  const allFiles = [];
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) scanDir(fullPath);
      else if (entry.name.endsWith('.md')) allFiles.push(fullPath);
    }
  }
  scanDir(DOCS_DIR);

  let totalModified = 0;
  let totalGarbageRemoved = 0;
  let totalNewTagsAdded = 0;
  const newTagStats = {};

  for (const filePath of allFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { raw, body } = parseFrontmatter(content);

    if (!raw) continue;

    const currentTags = extractCurrentTags(raw);

    const cleanedTags = currentTags.filter((t) => {
      if (GARBAGE_TAGS.test(t)) {
        totalGarbageRemoved++;
        return false;
      }
      return true;
    });

    const moduleTag = cleanedTags.find((t) => {
      return !t.includes('-') && t.length < 15;
    });

    const bodyTags = inferTagsFromBody(body);

    const existingSet = new Set(cleanedTags);
    const newBodyTags = bodyTags.filter((t) => !existingSet.has(t));

    for (const t of newBodyTags) {
      newTagStats[t] = (newTagStats[t] || 0) + 1;
    }

    const finalTags = [];
    if (moduleTag) finalTags.push(moduleTag);
    for (const t of cleanedTags) {
      if (t !== moduleTag && !GARBAGE_TAGS.test(t)) finalTags.push(t);
    }
    for (const t of newBodyTags) {
      if (!finalTags.includes(t)) finalTags.push(t);
    }

    if (JSON.stringify(finalTags) !== JSON.stringify(currentTags)) {
      const newFm = replaceTagsInFrontmatter(raw, finalTags);
      const newContent = `---\n${newFm}\n---${body}`;
      fs.writeFileSync(filePath, newContent, 'utf-8');
      totalModified++;
      totalNewTagsAdded += newBodyTags.length;
      console.log(`[FIXED] ${path.relative(DOCS_DIR, filePath)}: +${newBodyTags.join(', ')}`);
    }
  }

  console.log('\n=== Tag Fix Report ===');
  console.log(`Files modified: ${totalModified}`);
  console.log(`Garbage tags removed: ${totalGarbageRemoved}`);
  console.log(`New cross-module tags added: ${totalNewTagsAdded}`);
  console.log('\nNew tag distribution:');
  Object.entries(newTagStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([tag, count]) => {
      console.log(`  ${tag}: ${count}`);
    });
}

main();
