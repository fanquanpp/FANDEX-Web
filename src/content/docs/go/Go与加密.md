---
order: 78
title: 'Go与加密'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'crypto包与安全编程'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 加密

```go
import "crypto/sha256"
hash := sha256.Sum256([]byte("hello"))

import "crypto/rand"
token := make([]byte, 32)
rand.Read(token)
```
