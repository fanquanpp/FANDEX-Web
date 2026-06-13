---
order: 74
title: 'Go与依赖注入'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'Wire与依赖注入'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Wire

```go
//go:build wireinject

func InitializeApp() (*App, error) {
  wire.Build(
    NewDB,
    NewRepository,
    NewService,
    NewHandler,
    wire.Struct(new(App), "*"),
  )
  return nil, nil
}
```
