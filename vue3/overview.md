# 01-概述与环境 | Overview & Environment
> @Author: fanquanpp
> @Category: Vue3 Basics
> @Description: 01-概述与环境 | Overview & Environment
> @Updated: 2026-05-03
---
## 目录
1. [Vue3 概述 | Vue3 Overview](#vue3-概述-|-vue3-overview)
2. [环境搭建 | Environment Setup](#环境搭建-|-environment-setup)
3. [第一个 Vue3 应用 | First Vue3 App](#第一个-vue3-应用-|-first-vue3-app)
4. [开发工具推荐 | Recommended Tools](#开发工具推荐-|-recommended-tools)
5. [学习资源 | Learning Resources](#学习资源-|-learning-resources)
6. [常见问题 | Common Issues](#常见问题-|-common-issues)
7. [小结 | Summary](#小结-|-summary)
---
## 1. Vue3 概述 | Vue3 Overview
Vue3 是 Vue.js 框架的第三个主要版本，于 2020 年 9 月正式发布。它带来了许多重要的改进和新特性，包括：
- **组合式 API (Composition API)**：提供了一种新的方式来组织组件逻辑，使代码更易于维护和复用
- **响应式系统重构**：使用 ES6 Proxy 替代 Object.defineProperty，提供更强大的响应式能力
- **更好的 TypeScript 支持**：全面提升了 TypeScript 类型推断能力
- **性能优化**：包括虚拟 DOM 重写、编译器优化等，性能显著提升
- **更小的包体积**：通过 tree-shaking 等技术，减小了运行时体积
## 2. 环境搭建 | Environment Setup
### 2.1 安装 Node.js
Vue3 项目需要 Node.js 18+ 环境。可以从 [Node.js 官网](https://nodejs.org/) 下载并安装最新版本。
### 2.2 创建 Vue3 项目
使用 Vite 创建 Vue3 项目是推荐的方式：
```bash
 # 使用 npm
 Truenpm create vite@latest my-vue3-app -- --template vue
 # 使用 yarn
 Trueyarn create vite my-vue3-app --template vue
 # 使用 pnpm
 Truepnpm create vite my-vue3-app --template vue
 ```

### 2.3 项目结构
创建的 Vue3 项目结构如下：
```
 Truemy-vue3-app/
 True├── node_modules/ # 依赖包
 True├── public/ # 静态资源
 True├── src/ # 源代码
 True│ ├── assets/ # 资源文件
 True│ ├── components/ # 组件
 True│ ├── router/ # 路由（需手动创建）
 True│ ├── store/ # 状态管理（需手动创建）
 True│ ├── views/ # 页面（需手动创建）
 True│ ├── App.vue # 根组件
 True│ └── main.js # 入口文件
 True├── .gitignore # Git 忽略文件
 True├── index.html # HTML 模板
 True├── package.json # 项目配置
 True├── vite.config.js # Vite 配置
 True└── README.md # 项目说明
 ```

### 2.4 安装常用依赖
```bash
 # 安装 Vue Router
 Truenpm install vue-router@4
 # 安装 Pinia（Vue3 推荐的状态管理库）
 Truenpm install pinia
 # 安装 TypeScript（可选）
 Truenpm install typescript
 # 安装 ESLint 和 Prettier（可选）
 Truenpm install eslint prettier
 ```

## 3. 第一个 Vue3 应用 | First Vue3 App
### 3.1 修改 App.vue
```vue
 <template>
  <div class="app">
  <h1>Hello Vue3!</h1>
  <button @click="count++">Count: {{ count }}</button>
  </div>
 </template>
 <script setup>
 import { ref } from 'vue'
 const count = ref(0)
 </script>
 <style scoped>
 .app {
  text-align: center;
  margin-top: 50px;
 True}
 Trueh1 {
  color: #42b983;
 True}
 Truebutton {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
 True}
 Truebutton:hover {
  background-color: #35495e;
 True}
 </style>
 ```

### 3.2 运行项目
```bash
 # 进入项目目录
 Truecd my-vue3-app
 # 安装依赖
 Truenpm install
 # 启动开发服务器
 Truenpm run dev
 ```

访问终端中显示的地址（通常是 <http://localhost:5173），即可看到你的第一个> Vue3 应用。
## 4. 开发工具推荐 | Recommended Tools
- **VS Code**：推荐的代码编辑器
- **Volar**：Vue3 官方推荐的 VS Code 扩展，提供更好的 Vue3 支持
- **Vue DevTools**：浏览器扩展，用于调试 Vue 应用
- **ESLint**：代码质量检查工具
- **Prettier**：代码格式化工具
## 5. 学习资源 | Learning Resources
- [Vue3 官方文档](https://vuejs.org/docs/) <!-- nofollow -->
- [Vue3 组合式 API 文档](https://vuejs.org/api/composition-api.html) <!-- nofollow -->
- [Vite 官方文档](https://vitejs.dev/) <!-- nofollow -->
## 6. 常见问题 | Common Issues
### 6.1 无法启动开发服务器
- 检查 Node.js 版本是否符合要求
- 检查端口是否被占用
- 检查依赖是否正确安装
### 6.2 组件不显示
- 检查组件是否正确导入
- 检查组件名称是否正确
- 检查模板语法是否正确
### 6.3 响应式数据不更新
- 检查是否使用了 `ref` 或 `reactive` 来创建响应式数据
- 检查是否正确访问响应式数据（对于 `ref`，需要使用 `.value`）
- 检查是否在模板中正确使用响应式数据（模板中自动解包，不需要 `.value`）
## 7. 小结 | Summary
Vue3 带来了许多新特性和改进，使前端开发更加高效和愉快。通过本章节的学习，你已经了解了 Vue3 的基本概念和环境搭建方法，为后续的学习打下了基础。
接下来，我们将深入学习 Vue3 的组合式 API、响应式系统、组件系统等核心特性，帮助你构建更加复杂和功能丰富的 Vue3 应用。

## 延伸阅读

- [[javascript/overview|JavaScript]]
- [[typescript/overview|TypeScript]]
- [[html5/overview-and-semantics|HTML5]]
- [[css/overview-and-syntax|CSS]]
