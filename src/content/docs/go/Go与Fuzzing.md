---
order: 69
title: 'Go与Fuzzing'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'Go模糊测试'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Fuzzing

```go
func FuzzReverse(f *testing.F) {
  f.Add("hello")
  f.Fuzz(func(t *testing.T, orig string) {
    rev := reverse(orig)
    if reverse(rev) != orig {
      t.Errorf("reverse(reverse(%q)) = %q", orig, reverse(rev))
    }
  })
}
```
