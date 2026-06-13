---
order: 71
title: 'Go与CGO'
module: 'go'
category: 'Go'
difficulty: 'advanced'
description: 'CGO与C互操作'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. CGO

```go
/*
#include <stdio.h>
void say_hello() { printf("Hello from C!\n"); }
*/
import "C"

C.say_hello()
```
