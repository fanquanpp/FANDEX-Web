export const categoryLabels: Record<string, string> = {
  toolchain: '工具链',
  'dev-lang': '开发语言',
  database: '数据库',
  'comp-sci': '计算机科学',
  'eng-infra': '工程与基础设施',
  data: '数据技术',
};

/** 每个模块一个统一颜色，跨分类一致 */
const C = {
  gettingStarted: '#6366f1',
  markdown: '#6366f1',
  git: '#f05032',
  github: '#24292e',
  html5: '#e34c26',
  css: '#264de4',
  javascript: '#f7df1e',
  typescript: '#3178c6',
  vue3: '#42b883',
  react: '#61dafb',
  c: '#a8b9cc',
  cpp: '#00599c',
  java: '#ed8b00',
  kotlin: '#7f52ff',
  csharp: '#68217a',
  python: '#3776ab',
  go: '#00add8',
  lua: '#000080',
  harmonyos: '#0a59f7',
  mysql: '#4479a1',
  sql: '#e38c00',
  postgresql: '#336791',
  redis: '#dc382d',
  algorithm: '#8b5cf6',
  csFundamentals: '#8b5cf6',
  calculus: '#ec4899',
  discreteMath: '#ec4899',
  devops: '#f97316',
  networking: '#0ea5e9',
  cybersecurity: '#ef4444',
  cloudComputing: '#38bdf8',
  iot: '#22c55e',
  softwareTesting: '#a78bfa',
  agent: '#06b6d4',
  dataAnalysis: '#0ea5e9',
} as const;

export const modules = [
  // ── 工具链 ──
  {
    id: 'getting-started',
    title: '入门指南',
    description: '零基础环境搭建与学习规划',
    category: 'toolchain',
    color: C.gettingStarted,
  },
  {
    id: 'markdown',
    title: 'Markdown',
    description: '文档标记与写作规范',
    category: 'toolchain',
    color: C.markdown,
  },
  {
    id: 'git',
    title: 'Git',
    description: '版本控制与分支管理',
    category: 'toolchain',
    color: C.git,
  },
  {
    id: 'github',
    title: 'GitHub',
    description: '代码协作与CI/CD',
    category: 'toolchain',
    color: C.github,
  },

  // ── 开发语言 ──
  {
    id: 'html5',
    title: 'HTML5',
    description: 'Web结构与语义',
    category: 'dev-lang',
    color: C.html5,
  },
  { id: 'css', title: 'CSS', description: '样式与视觉布局', category: 'dev-lang', color: C.css },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: '动态类型脚本语言',
    category: 'dev-lang',
    color: C.javascript,
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: '静态类型JavaScript',
    category: 'dev-lang',
    color: C.typescript,
  },
  {
    id: 'vue3',
    title: 'Vue 3',
    description: '响应式前端框架',
    category: 'dev-lang',
    color: C.vue3,
  },
  {
    id: 'react',
    title: 'React',
    description: '组件化前端框架',
    category: 'dev-lang',
    color: C.react,
  },
  { id: 'c', title: 'C', description: '底层系统编程', category: 'dev-lang', color: C.c },
  { id: 'cpp', title: 'C++', description: '高性能与泛型编程', category: 'dev-lang', color: C.cpp },
  { id: 'java', title: 'Java', description: '企业级应用开发', category: 'dev-lang', color: C.java },
  {
    id: 'kotlin',
    title: 'Kotlin',
    description: 'JVM现代编程语言',
    category: 'dev-lang',
    color: C.kotlin,
  },
  {
    id: 'csharp',
    title: 'C#',
    description: '.NET生态核心语言',
    category: 'dev-lang',
    color: C.csharp,
  },
  {
    id: 'python',
    title: 'Python',
    description: '通用编程与自动化',
    category: 'dev-lang',
    color: C.python,
  },
  { id: 'go', title: 'Go', description: '云原生系统编程', category: 'dev-lang', color: C.go },
  { id: 'lua', title: 'Lua', description: '嵌入式脚本引擎', category: 'dev-lang', color: C.lua },
  {
    id: 'harmonyos',
    title: '鸿蒙开发',
    description: 'HarmonyOS应用开发',
    category: 'dev-lang',
    color: C.harmonyos,
  },

  // ── 数据库 ──
  {
    id: 'mysql',
    title: 'MySQL',
    description: '关系型数据存储',
    category: 'database',
    color: C.mysql,
  },
  { id: 'sql', title: 'SQL', description: '结构化查询语言', category: 'database', color: C.sql },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: '高级关系型数据库',
    category: 'database',
    color: C.postgresql,
  },
  {
    id: 'redis',
    title: 'Redis',
    description: '内存数据库与缓存',
    category: 'database',
    color: C.redis,
  },

  // ── 计算机科学 ──
  {
    id: 'algorithm',
    title: '算法与数据结构',
    description: '复杂度分析与算法设计',
    category: 'comp-sci',
    color: C.algorithm,
  },
  {
    id: 'cs-fundamentals',
    title: '计算机基础',
    description: '体系结构·操作系统·网络·编译',
    category: 'comp-sci',
    color: C.csFundamentals,
  },
  {
    id: 'calculus',
    title: '高等数学',
    description: '微积分与数学分析',
    category: 'comp-sci',
    color: C.calculus,
  },
  {
    id: 'discrete-math',
    title: '离散数学',
    description: '组合·图论·代数系统',
    category: 'comp-sci',
    color: C.discreteMath,
  },

  // ── 工程与基础设施 ──
  {
    id: 'devops',
    title: 'DevOps',
    description: '运维与SRE实践',
    category: 'eng-infra',
    color: C.devops,
  },
  {
    id: 'networking',
    title: '网络技术',
    description: '协议·路由·系统管理',
    category: 'eng-infra',
    color: C.networking,
  },
  {
    id: 'cybersecurity',
    title: '网络安全',
    description: '攻防·渗透·应急响应',
    category: 'eng-infra',
    color: C.cybersecurity,
  },
  {
    id: 'cloud-computing',
    title: '云计算',
    description: '云架构与容器编排',
    category: 'eng-infra',
    color: C.cloudComputing,
  },
  {
    id: 'iot',
    title: '物联网',
    description: '嵌入式与边缘计算',
    category: 'eng-infra',
    color: C.iot,
  },
  {
    id: 'software-testing',
    title: '软件测试',
    description: '质量保障与测试工程',
    category: 'eng-infra',
    color: C.softwareTesting,
  },
  {
    id: 'agent',
    title: 'AI Agent',
    description: '智能体架构与应用',
    category: 'eng-infra',
    color: C.agent,
  },

  // ── 数据技术 ──
  {
    id: 'data-analysis',
    title: '数据分析',
    description: '统计建模与可视化',
    category: 'data',
    color: C.dataAnalysis,
  },
] as const;

export function getModule(id: string) {
  return modules.find((m) => m.id === id);
}

export function getModulesByCategory(category: string) {
  return modules.filter((m) => m.category === category);
}

/** 从 content collection id 中提取 slug（文件名去除 .md 后缀） */
export function docSlug(id: string): string {
  return (id.split('/').pop() || id).replace(/\.md$/, '');
}

export const categoryOrder = ['toolchain', 'dev-lang', 'database', 'comp-sci', 'eng-infra', 'data'];

export const modulePrerequisites: Record<string, string[]> = {
  github: ['git'],
  html5: ['markdown'],
  css: ['html5'],
  javascript: ['html5', 'css'],
  typescript: ['javascript'],
  vue3: ['javascript', 'html5', 'css'],
  react: ['javascript', 'html5', 'css'],
  python: [],
  'data-analysis': ['python'],
  mysql: [],
  sql: [],
  c: [],
  cpp: ['c'],
  csharp: [],
  java: [],
  kotlin: ['java'],
  go: [],
  lua: [],
  algorithm: [],
  'cs-fundamentals': [],
  'discrete-math': [],
  calculus: [],
  agent: ['python'],
  devops: ['git'],
  iot: ['c', 'python'],
  networking: [],
  cybersecurity: ['networking'],
  'cloud-computing': ['devops'],
  postgresql: ['sql'],
  redis: [],
  harmonyos: ['javascript', 'typescript'],
  'software-testing': [],
  git: [],
  markdown: [],
};
