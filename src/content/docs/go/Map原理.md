---
order: 51
title: 'Map原理'
module: 'go'
category: 'Go'
difficulty: 'advanced'
description: 'Go map底层实现'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 哈希表结构

```go
type hmap struct {
  count     int
  B         uint8
  hash0     uint32
  buckets   unsafe.Pointer
  oldbuckets unsafe.Pointer
}
```

## 2. 渐进式扩容

- 等量扩容：整理溢出桶
- 增量扩容：桶数翻倍，搬迁分批进行

## 3. 非并发安全

```go
// 并发读写 panic
// 使用 sync.RWMutex 或 sync.Map
```
