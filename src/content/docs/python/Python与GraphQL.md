---
order: 64
title: 'Python与GraphQL'
module: 'python'
category: 'Python'
difficulty: 'intermediate'
description: 'Strawberry与Ariadne'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Strawberry

```python
import strawberry

@strawberry.type
class User:
  name: str
  age: int

@strawberry.type
class Query:
  @strawberry.field
  def user(self, id: int) -> User:
    return get_user(id)

schema = strawberry.Schema(query=Query)
```
