---
order: 89
title: 'Go与限流'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: '限流与熔断'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 限流

```go
import "golang.org/x/time/rate"

limiter := rate.NewLimiter(100, 10) // 100/s, burst 10
if !limiter.Allow() {
  http.Error(w, "Too Many Requests", 429)
  return
}
```
