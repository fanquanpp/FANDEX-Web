---
order: 74
title: 'C++与Python交互'
module: 'cpp'
category: 'C++'
difficulty: 'advanced'
description: 'pybind11与C++/Python互操作'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. pybind11

```cpp
#include <pybind11/pybind11.h>

int add(int a, int b) { return a + b; }

PYBIND11_MODULE(mymod, m) {
  m.def("add", &add, "Add two numbers");
}
```

```python
import mymod
mymod.add(1, 2)  # 3
```
