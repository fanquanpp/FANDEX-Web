---
order: 78
title: 'Kotlin与IO'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'intermediate'
description: 'kotlinx-io与文件操作'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 文件操作

```kotlin
// 读取
val lines = File("data.txt").readLines()
val text = File("data.txt").readText()

// 写入
File("output.txt").writeText("Hello, World!")
File("output.txt").appendText("More content")

// 遍历
File(".").walkTopDown().filter { it.extension == "kt" }.forEach { println(it) }
```
