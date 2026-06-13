---
order: 72
title: 'Kotlin与测试'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'intermediate'
description: 'Kotlin测试框架'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Kotlin Test

```kotlin
class UserTest : StringSpec({
  "should create user" {
    val user = User("Alice", 25)
    user.name shouldBe "Alice"
  }

  "should validate age" {
    shouldThrow<IllegalArgumentException> {
      User("Alice", -1)
    }
  }
})
```
