---
order: 81
title: 'Kotlin与并发安全'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'advanced'
description: '协程并发与线程安全'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Mutex

```kotlin
val mutex = Mutex()
var counter = 0

repeat(1000) {
  launch {
    mutex.withLock {
      counter++
    }
  }
}
```

## 2. Actor

```kotlin
fun CoroutineScope.counterActor() = actor<CounterMsg> {
  var counter = 0
  for (msg in channel) {
    when (msg) {
      is Inc -> counter++
      is Get -> msg.response.complete(counter)
    }
  }
}
```
