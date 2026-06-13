---
order: 83
title: 'Kotlin与安全'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'intermediate'
description: 'Kotlin安全编程'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 安全实践

```kotlin
// 使用空安全避免 NPE
fun process(value: String?) {
  value?.let { /* 非空时执行 */ }
}

// 密码哈希
import org.mindrot.jbcrypt.BCrypt
val hash = BCrypt.hashpw(password, BCrypt.gensalt())
BCrypt.checkpw(input, hash)
```
