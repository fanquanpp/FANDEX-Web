---
order: 88
title: 'Go与分布式追踪'
module: 'go'
category: 'Go'
difficulty: 'advanced'
description: 'OpenTelemetry集成'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. OpenTelemetry

```go
import "go.opentelemetry.io/otel"

ctx, span := otel.Tracer("app").Start(ctx, "process")
defer span.End()
// ... 业务逻辑
span.SetAttributes(attribute.String("key", "value"))
```
