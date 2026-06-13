---
order: 57
title: 'Kotlin与Android'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'intermediate'
description: 'Kotlin Android开发'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Activity

```kotlin
class MainActivity : AppCompatActivity() {
  private val viewModel: MainViewModel by viewModels()

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
      MaterialTheme {
        MainScreen(viewModel)
      }
    }
  }
}
```
