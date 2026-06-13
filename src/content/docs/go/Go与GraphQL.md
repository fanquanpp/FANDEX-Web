---
order: 62
title: 'Go与GraphQL'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'gqlgen GraphQL框架'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. gqlgen

```go
//go:generate go run github.com/99designs/gqlgen generate

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
  return r.userService.GetAll(ctx)
}
```
