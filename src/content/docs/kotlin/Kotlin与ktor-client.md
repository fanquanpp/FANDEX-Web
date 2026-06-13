---
order: 71
title: 'Kotlin与ktor-client'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'intermediate'
description: 'Ktor HTTP客户端'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. HTTP 客户端

```kotlin
val client = HttpClient(CIO) {
  install(ContentNegotiation) { json() }
}

suspend fun fetchUsers(): List<User> =
  client.get("https://api.example.com/users").body()
```
