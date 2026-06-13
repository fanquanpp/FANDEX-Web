---
order: 70
title: 'React与微前端'
module: 'react'
category: 'React'
difficulty: 'advanced'
description: 'React微前端架构'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Module Federation

```javascript
// webpack.config.js (远程应用)
new ModuleFederationPlugin({
  name: 'remoteApp',
  filename: 'remoteEntry.js',
  exposes: { './UserList': './src/UserList' },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});

// webpack.config.js (宿主应用)
new ModuleFederationPlugin({
  name: 'hostApp',
  remotes: { remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js' },
});
```

## 2. 使用远程组件

```jsx
const RemoteUserList = React.lazy(() => import('remoteApp/UserList'));

<Suspense fallback="Loading...">
  <RemoteUserList />
</Suspense>;
```
