---
order: 61
title: 'Kotlin序列化'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'intermediate'
description: 'kotlinx.serialization'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 序列化

```kotlin
@Serializable
data class User(val name: String, val age: Int)

val json = Json { ignoreUnknownKeys = true }
val user = json.decodeFromString<User>("""{"name":"Alice","age":25}""")
val jsonString = json.encodeToString(user)
```
