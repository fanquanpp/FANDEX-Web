---
order: 79
title: 'Kotlin与正则'
module: 'kotlin'
category: 'Kotlin'
difficulty: 'beginner'
description: 'Kotlin正则表达式'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 正则操作

```kotlin
val regex = Regex("""\d{4}-\d{2}-\d{2}""")
"Date: 2026-06-14".contains(regex)  // true

val match = regex.find("2026-06-14")
match?.value  // "2026-06-14"

// 替换
"2026-06-14".replace(regex, "YYYY-MM-DD")

// 分割
"a,b,c".split(Regex(","))
```
