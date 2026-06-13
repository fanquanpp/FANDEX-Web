---
order: 73
title: 'Kotlin与协程Channel'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'advanced'
description: 'Channel与Select'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Channel

```kotlin
val channel = Channel<Int>()

launch { for (x in 1..5) channel.send(x) }
launch { repeat(5) { println(channel.receive()) } }
```

## 2. Select

```kotlin
select<Unit> {
  channel1.onReceive { value -> process(value) }
  channel2.onReceive { value -> process(value) }
  onTimeout(1000) { println("Timeout") }
}
```
