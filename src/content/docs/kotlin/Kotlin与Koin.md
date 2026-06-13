---
order: 70
title: 'Kotlin与Koin'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'intermediate'
description: 'Koin依赖注入'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Koin 配置

```kotlin
val appModule = module {
  single { UserRepository(get()) }
  viewModel { UserViewModel(get()) }
}

startKoin {
  modules(appModule)
}
```
