---
order: 76
title: 'Go与日志'
module: 'go'
category: 'Go'
difficulty: 'beginner'
description: 'slog与结构化日志'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. slog（Go 1.21+）

```go
import "log/slog"

slog.Info("request processed",
  "method", r.Method,
  "path", r.URL.Path,
  "duration", elapsed,
)
```
