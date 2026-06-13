---
order: 56
title: '类型注解与mypy'
module: 'python'
category: 'Python'
difficulty: 'intermediate'
description: 'Python类型系统与静态检查'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 类型注解

```python
from typing import Optional, Union, List, Dict, Callable

def greet(name: str, age: int = 0) -> str:
  return f"Hello, {name}!"

def process(data: list[int] | None = None) -> dict[str, float]:
  return {}

# 类型别名
type Vector = list[float]
type Matrix = list[Vector]
```

## 2. mypy

```bash
mypy --strict my_module.py
```
