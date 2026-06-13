---
order: 82
title: 'Go与时间'
module: 'go'
category: 'Go'
difficulty: 'beginner'
description: 'time包详解'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 时间操作

```go
now := time.Now()
tomorrow := now.Add(24 * time.Hour)
formatted := now.Format("2006-01-02 15:04:05")
parsed, _ := time.Parse("2006-01-02", "2026-06-14")

// 计时
start := time.Now()
doWork()
elapsed := time.Since(start)
```
