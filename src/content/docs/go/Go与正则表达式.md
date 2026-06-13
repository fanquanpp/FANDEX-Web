---
order: 81
title: 'Go与正则表达式'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'regexp包详解'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 正则

```go
re := regexp.MustCompile(`\d{4}-\d{2}-\d{2}`)
match := re.FindString("Date: 2026-06-14")
groups := re.FindStringSubmatch("2026-06-14")
result := re.ReplaceAllString(text, "YYYY-MM-DD")
```
