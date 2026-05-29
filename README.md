<div align="center">

# FANDEX

**开发者知识库** · fanquanpp + memex

覆盖编程语言 · Web 前端 · 数据技术 · 计算机科学

[![在线阅读](https://img.shields.io/badge/在线阅读-fanquanpp.github.io%2FFANDEX-2563eb?style=for-the-badge&logo=github&logoColor=white)](https://fanquanpp.github.io/FANDEX/)
[![Astro 5](https://img.shields.io/badge/Astro-5-ff5d01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![文档数](https://img.shields.io/badge/文档-221+-0ea5e9?style=flat-square)](https://fanquanpp.github.io/FANDEX/)
[![模块数](https://img.shields.io/badge/模块-18-8b5cf6?style=flat-square)](https://fanquanpp.github.io/FANDEX/)

</div>

---

## 学习路径

```
入门  Markdown → Git → GitHub → HTML5 → CSS → JavaScript
前端  JavaScript → TypeScript → Vue 3
数据  Python → 数据分析 | MySQL
系统  C → C++ | Java
进阶  算法与数据结构 → 计算机基础
```

## 模块总览

| 类别       | 模块                                                    |
| :--------- | :------------------------------------------------------ |
| 基础工具   | 入门指南 · Git · GitHub · Markdown                      |
| 编程语言   | C · C++ · Java · JavaScript · TypeScript · Python · Lua |
| Web 前端   | HTML5 · CSS · Vue 3                                     |
| 数据技术   | MySQL · 数据分析                                        |
| 计算机科学 | 算法与数据结构 · 计算机基础                             |

> 221 篇文档 · 32 篇术语表 · 18 个模块 · 交互式测验 · 知识地图

## 功能特性

| 特性        | 说明                                         |
| :---------- | :------------------------------------------- |
| 📊 进度追踪 | localStorage + IndexedDB 备份，支持导出/导入 |
| 💡 术语悬浮 | 自动匹配文档中的专业术语并弹出解释           |
| 🧩 交互测验 | 填空 / 选择 / 代码修正三种题型               |
| 🗺️ 知识地图 | Mermaid 可视化概念关联                       |
| 🔗 前置知识 | 模块间依赖关系展示                           |
| 🔍 全文搜索 | 客户端搜索索引，支持中英文标题/描述/标签检索 |
| 🏷️ 标签索引 | 跨模块知识检索，按模块/难度/相关度筛选       |
| 🛤️ 学习路线 | 5 条职业方向路径可视化                       |
| 📴 离线可用 | Service Worker 缓存                          |
| 🌗 暗色模式 | Dark / Light 主题切换                        |
| 📱 响应式   | 桌面端侧边栏 + 移动端抽屉导航                |

## 技术栈

- **Astro 5** — 静态站点生成 (SSG)
- **Vue 3** — 交互式岛屿组件
- **Shiki** — 双主题代码高亮 (构建时零 JS)
- **Pagefind** — 客户端全文搜索
- **Mermaid** — 知识地图渲染
- **JSON-LD** — 结构化数据 (SEO)
- **Service Worker** — 离线缓存

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm run test

# 预发布质量检查
npm run qa
```

## 项目结构

<details>
<summary>点击展开</summary>

```
FANDEX/
├── .github/workflows/     # GitHub Actions (部署 / CodeQL / 内容审计)
├── .husky/                # Git pre-commit 钩子
├── public/
│   ├── fonts/             # 字体声明
│   ├── data/              # 搜索索引 + 术语索引 (构建生成)
│   ├── sw.js              # Service Worker
│   └── robots.txt         # SEO
├── scripts/               # 工具脚本
│   ├── build-glossary-index.mjs
│   ├── build-search-index.mjs
│   ├── content-audit.mjs
│   └── qa-check.mjs
├── src/
│   ├── components/        # Astro 组件
│   ├── content/
│   │   ├── docs/{18 模块}/ # 文档内容 (221 篇)
│   │   ├── glossary/      # 术语表 (32 篇)
│   │   └── config.ts      # Zod schema
│   ├── islands/           # Vue 岛屿组件
│   │   ├── ThemeToggle.vue
│   │   ├── ProgressToggle.vue
│   │   └── QuizBlock.vue
│   ├── lib/               # 工具函数
│   ├── pages/             # 路由页面
│   └── styles/            # 全局样式
├── astro.config.ts
├── package.json
└── tsconfig.json
```

</details>

## 部署

仓库已配置 GitHub Actions 自动部署 (`.github/workflows/deploy.yml`)，push 到 `main` 分支即自动构建发布。

Settings → Pages → Source 选择 **GitHub Actions** 即可。

## 免责声明

本项目所有内容仅供个人学习与参考使用，不构成任何形式的专业建议、担保或承诺。详见 [免责声明](https://fanquanpp.github.io/FANDEX/)。

## 许可证

本项目仅供个人学习使用。未经授权，禁止将本项目内容用于商业用途。
