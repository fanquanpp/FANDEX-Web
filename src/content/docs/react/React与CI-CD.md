---
order: 76
title: 'React与CI-CD'
module: 'react'
category: 'React'
difficulty: 'intermediate'
description: 'React项目CI/CD实践'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. GitHub Actions

```yaml
name: CI/CD
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions: { pages: write, id-token: write }
    environment: { name: github-pages }
    steps:
      - uses: actions/deploy-pages@v4
```
