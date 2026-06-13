---
order: 83
title: 'C++与WebAssembly'
module: 'cpp'
category: 'C++'
difficulty: 'advanced'
description: 'C++编译为WebAssembly'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Emscripten

```bash
emcc hello.cpp -o hello.js
emcc hello.cpp -o hello.html
```

## 2. 与 JavaScript 交互

```cpp
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int add(int a, int b) { return a + b; }
```

```javascript
const module = await Module();
const result = module._add(1, 2); // 3
```
