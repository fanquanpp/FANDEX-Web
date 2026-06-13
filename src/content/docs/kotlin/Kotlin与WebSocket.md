---
order: 82
title: 'Kotlin与WebSocket'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'intermediate'
description: 'Ktor WebSocket'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. WebSocket 服务器

```kotlin
routing {
  webSocket("/ws") {
    for (frame in incoming) {
      if (frame is Frame.Text) {
        val text = frame.readText()
        send(Frame.Text("Echo: $text"))
      }
    }
  }
}
```
