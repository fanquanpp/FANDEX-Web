export const categoryLabels: Record<string, string> = {
  toolchain: '工具链',
  'dev-lang': '开发语言',
  database: '数据库',
  'comp-sci': '计算机科学',
  'eng-infra': '工程与基础设施',
  data: '数据技术',
};

/** 每个分类一种统一颜色，同分类内所有模块共享 */
const C = {
  toolchain: '#6366f1',
  'dev-lang': '#3178c6',
  database: '#4479a1',
  'comp-sci': '#8b5cf6',
  'eng-infra': '#f97316',
  data: '#0ea5e9',
} as const;

export const categoryColors: Record<string, string> = C;

export const modules = [
  // ── 工具链 ──
  {
    id: 'getting-started',
    title: '入门指南',
    description: '零基础环境搭建与学习规划',
    category: 'toolchain',
    color: C.toolchain,
  },
  {
    id: 'markdown',
    title: 'Markdown',
    description: '文档标记与写作规范',
    category: 'toolchain',
    color: C.toolchain,
  },
  {
    id: 'git',
    title: 'Git',
    description: '版本控制与分支管理',
    category: 'toolchain',
    color: C.toolchain,
  },
  {
    id: 'github',
    title: 'GitHub',
    description: '代码协作与CI/CD',
    category: 'toolchain',
    color: C.toolchain,
  },

  // ── 开发语言 ──
  {
    id: 'html5',
    title: 'HTML5',
    description: 'Web结构与语义',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'css',
    title: 'CSS',
    description: '样式与视觉布局',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: '动态类型脚本语言',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: '静态类型JavaScript',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'vue3',
    title: 'Vue 3',
    description: '响应式前端框架',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'react',
    title: 'React',
    description: '组件化前端框架',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  { id: 'c', title: 'C', description: '底层系统编程', category: 'dev-lang', color: C['dev-lang'] },
  {
    id: 'cpp',
    title: 'C++',
    description: '高性能与泛型编程',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'java',
    title: 'Java',
    description: '企业级应用开发',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'kotlin',
    title: 'Kotlin',
    description: 'JVM现代编程语言',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'csharp',
    title: 'C#',
    description: '.NET生态核心语言',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'python',
    title: 'Python',
    description: '通用编程与自动化',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'go',
    title: 'Go',
    description: '云原生系统编程',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'lua',
    title: 'Lua',
    description: '嵌入式脚本引擎',
    category: 'dev-lang',
    color: C['dev-lang'],
  },
  {
    id: 'harmonyos',
    title: '鸿蒙开发',
    description: 'HarmonyOS应用开发',
    category: 'dev-lang',
    color: C['dev-lang'],
  },

  // ── 数据库 ──
  {
    id: 'mysql',
    title: 'MySQL',
    description: '关系型数据存储',
    category: 'database',
    color: C.database,
  },
  {
    id: 'sql',
    title: 'SQL',
    description: '结构化查询语言',
    category: 'database',
    color: C.database,
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: '高级关系型数据库',
    category: 'database',
    color: C.database,
  },
  {
    id: 'redis',
    title: 'Redis',
    description: '内存数据库与缓存',
    category: 'database',
    color: C.database,
  },

  // ── 计算机科学 ──
  {
    id: 'algorithm',
    title: '算法与数据结构',
    description: '复杂度分析与算法设计',
    category: 'comp-sci',
    color: C['comp-sci'],
  },
  {
    id: 'cs-fundamentals',
    title: '计算机基础',
    description: '体系结构·操作系统·网络·编译',
    category: 'comp-sci',
    color: C['comp-sci'],
  },
  {
    id: 'calculus',
    title: '高等数学',
    description: '微积分与数学分析',
    category: 'comp-sci',
    color: C['comp-sci'],
  },
  {
    id: 'discrete-math',
    title: '离散数学',
    description: '组合·图论·代数系统',
    category: 'comp-sci',
    color: C['comp-sci'],
  },

  // ── 工程与基础设施 ──
  {
    id: 'devops',
    title: 'DevOps',
    description: '运维与SRE实践',
    category: 'eng-infra',
    color: C['eng-infra'],
  },
  {
    id: 'networking',
    title: '网络技术',
    description: '协议·路由·系统管理',
    category: 'eng-infra',
    color: C['eng-infra'],
  },
  {
    id: 'cybersecurity',
    title: '网络安全',
    description: '攻防·渗透·应急响应',
    category: 'eng-infra',
    color: C['eng-infra'],
  },
  {
    id: 'cloud-computing',
    title: '云计算',
    description: '云架构与容器编排',
    category: 'eng-infra',
    color: C['eng-infra'],
  },
  {
    id: 'iot',
    title: '物联网',
    description: '嵌入式与边缘计算',
    category: 'eng-infra',
    color: C['eng-infra'],
  },
  {
    id: 'software-testing',
    title: '软件测试',
    description: '质量保障与测试工程',
    category: 'eng-infra',
    color: C['eng-infra'],
  },
  {
    id: 'agent',
    title: 'AI Agent',
    description: '智能体架构与应用',
    category: 'eng-infra',
    color: C['eng-infra'],
  },

  // ── 数据技术 ──
  {
    id: 'data-analysis',
    title: '数据分析',
    description: '统计建模与可视化',
    category: 'data',
    color: C.data,
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
