---
order: 74
title: 'Kotlin与编译器插件'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'advanced'
description: 'kapt、KSP与编译器插件'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. KSP（Kotlin Symbol Processing）

```kotlin
// build.gradle.kts
plugins {
  id("com.google.devtools.ksp") version "2.0.0-1.0.21"
}

dependencies {
  ksp("com.example:processor:1.0.0")
}
```

KSP 比 kapt 更快，因为直接操作 Kotlin AST。
