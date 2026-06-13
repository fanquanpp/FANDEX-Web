---
order: 66
title: 'Go与Redis'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'go-redis客户端'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. go-redis

```go
rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379"})
rdb.Set(ctx, "key", "value", time.Hour)
val, _ := rdb.Get(ctx, "key").Result()
```
