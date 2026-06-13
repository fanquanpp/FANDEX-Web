---
order: 77
title: 'Kotlin与Benchmark'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'intermediate'
description: 'Kotlin性能基准测试'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. JMH with Kotlin

```kotlin
@BenchmarkMode(Mode.AverageTime)
@State(Scope.Benchmark)
class StringBenchmark {
  @Benchmark fun stringConcat() = "Hello" + " " + "World"
  @Benchmark fun stringBuilder() = StringBuilder().append("Hello").append(" ").append("World").toString()
}
```
