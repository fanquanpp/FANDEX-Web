---
order: 72
title: 'Go与Wasm'
module: 'go'
category: 'Go'
difficulty: 'advanced'
description: 'Go编译为WebAssembly'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 编译

```bash
GOOS=js GOARCH=wasm go build -o main.wasm
```

## 2. 与 JavaScript 交互

```go
import "syscall/js"

js.Global().Get("console").Call("log", "Hello from Go!")
```
