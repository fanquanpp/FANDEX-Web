---
order: 70
title: 'Go与性能分析'
module: 'go'
category: 'Go'
difficulty: 'advanced'
description: 'pprof与性能调优'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. pprof

```go
import _ "net/http/pprof"

go http.ListenAndServe(":6060", nil)
```

```bash
go tool pprof http://localhost:6060/debug/pprof/profile
go tool pprof http://localhost:6060/debug/pprof/heap
```
