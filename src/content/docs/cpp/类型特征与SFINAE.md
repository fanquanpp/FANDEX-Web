---
order: 66
title: '类型特征与SFINAE'
module: 'cpp'
category: 'C++'
difficulty: 'advanced'
description: '类型特征与编译期类型判断'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 类型特征

```cpp
#include <type_traits>

static_assert(std::is_integral_v<int>);
static_assert(std::is_pointer_v<int*>);
static_assert(std::is_same_v<int, int32_t>);
static_assert(std::is_constructible_v<std::string, const char*>);

// 条件类型
using Type = std::conditional_t<is_64bit, int64_t, int32_t>;
```

## 2. SFINAE

```cpp
template<typename T>
std::enable_if_t<std::is_arithmetic_v<T>, T>
abs(T value) { return value < 0 ? -value : value; }
```
