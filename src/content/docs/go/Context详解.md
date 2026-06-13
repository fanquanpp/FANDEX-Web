---
order: 54
title: 'Context详解'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'context.Context与取消传播'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 基本用法

```go
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

result, err := fetchWithTimeout(ctx, url)
```

## 2. 传播取消

```go
func handler(ctx context.Context) {
  go func() {
    select {
    case <-ctx.Done():
      log.Println("Cancelled:", ctx.Err())
    case <-time.After(10 * time.Second):
      log.Println("Done")
    }
  }()
}
```
