export const categoryLabels: Record<string, string> = {
  'basic-tools': '工具链',
  programming: '编程语言',
  'web-frontend': '前端工程',
  data: '数据技术',
  cs: '计算理论',
  math: '数学基础',
  infrastructure: '基础设施',
  emerging: '新兴领域',
};

export const modules = [
  {
    id: 'getting-started',
    title: '入门指南',
    description: '零基础环境搭建与学习规划',
    category: 'basic-tools',
    color: '#6366f1',
  },
  {
    id: 'git',
    title: 'Git',
    description: '版本控制与分支管理',
    category: 'basic-tools',
    color: '#6366f1',
  },
  {
    id: 'github',
    title: 'GitHub',
    description: '代码协作与CI/CD',
    category: 'basic-tools',
    color: '#6366f1',
  },
  {
    id: 'markdown',
    title: 'Markdown',
    description: '文档标记与写作规范',
    category: 'basic-tools',
    color: '#6366f1',
  },
  { id: 'c', title: 'C', description: '底层系统编程', category: 'programming', color: '#10b981' },
  {
    id: 'cpp',
    title: 'C++',
    description: '高性能与泛型编程',
    category: 'programming',
    color: '#10b981',
  },
  {
    id: 'java',
    title: 'Java',
    description: '企业级应用开发',
    category: 'programming',
    color: '#10b981',
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: '动态类型脚本语言',
    category: 'programming',
    color: '#10b981',
  },
  {
    id: 'python',
    title: 'Python',
    description: '通用编程与自动化',
    category: 'programming',
    color: '#10b981',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: '静态类型JavaScript',
    category: 'programming',
    color: '#10b981',
  },
  {
    id: 'lua',
    title: 'Lua',
    description: '嵌入式脚本引擎',
    category: 'programming',
    color: '#10b981',
  },
  {
    id: 'html5',
    title: 'HTML5',
    description: 'Web结构与语义',
    category: 'web-frontend',
    color: '#f59e0b',
  },
  {
    id: 'css',
    title: 'CSS',
    description: '样式与视觉布局',
    category: 'web-frontend',
    color: '#f59e0b',
  },
  {
    id: 'vue3',
    title: 'Vue 3',
    description: '响应式前端框架',
    category: 'web-frontend',
    color: '#f59e0b',
  },
  {
    id: 'mysql',
    title: 'MySQL',
    description: '关系型数据存储',
    category: 'data',
    color: '#ef4444',
  },
  {
    id: 'data-analysis',
    title: '数据分析',
    description: '统计建模与可视化',
    category: 'data',
    color: '#ef4444',
  },
  {
    id: 'algorithm',
    title: '算法',
    description: '数据结构与算法设计',
    category: 'cs',
    color: '#8b5cf6',
  },
  {
    id: 'cs-fundamentals',
    title: 'CS基础',
    description: '操作系统与网络原理',
    category: 'cs',
    color: '#8b5cf6',
  },
  {
    id: 'kotlin',
    title: 'Kotlin',
    description: 'JVM现代编程语言',
    category: 'programming',
    color: '#10b981',
  },
  {
    id: 'go',
    title: 'Go',
    description: '云原生系统编程',
    category: 'programming',
    color: '#10b981',
  },
  {
    id: 'csharp',
    title: 'C#',
    description: '.NET生态核心语言',
    category: 'programming',
    color: '#10b981',
  },
  { id: 'sql', title: 'SQL', description: '结构化查询语言', category: 'data', color: '#ef4444' },
  {
    id: 'react',
    title: 'React',
    description: '组件化前端框架',
    category: 'web-frontend',
    color: '#f59e0b',
  },
  {
    id: 'calculus',
    title: '高等数学',
    description: '微积分与数学分析',
    category: 'math',
    color: '#ec4899',
  },
  {
    id: 'discrete-math',
    title: '离散数学',
    description: '组合与图论基础',
    category: 'math',
    color: '#ec4899',
  },
  {
    id: 'agent',
    title: 'AI Agent',
    description: '智能体架构与应用',
    category: 'emerging',
    color: '#06b6d4',
  },
  {
    id: 'devops',
    title: '运维',
    description: 'DevOps与SRE实践',
    category: 'infrastructure',
    color: '#f97316',
  },
  {
    id: 'iot',
    title: '物联网',
    description: '嵌入式与边缘计算',
    category: 'infrastructure',
    color: '#f97316',
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

export const categoryOrder = [
  'basic-tools',
  'programming',
  'web-frontend',
  'data',
  'cs',
  'math',
  'infrastructure',
  'emerging',
];

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
  devops: ['git', 'linux'],
  iot: ['c', 'python'],
  git: [],
  markdown: [],
};
