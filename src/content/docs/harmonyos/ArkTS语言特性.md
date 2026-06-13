---
order: 50
title: 'ArkTS语言特性'
module: 'harmonyos'
category: 'HarmonyOS'
difficulty: 'intermediate'
description: 'ArkTS扩展语法与限制'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. ArkTS 特性

```typescript
// 基于 TypeScript，增加了声明式UI
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Column() {
      Text(this.message)
        .fontSize(30)
        .onClick(() => {
          this.message = 'Clicked!'
        })
    }
  }
}
```

## 2. ArkTS 限制

- 不允许使用 any
- 不允许使用运行时类型检查
- 限制使用闭包
- 强制静态类型
