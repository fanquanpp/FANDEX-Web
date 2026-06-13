---
order: 72
title: 'C++工具链'
module: 'cpp'
category: 'C++'
difficulty: 'intermediate'
description: 'CMake、vcpkg与包管理'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. CMake

```cmake
cmake_minimum_required(VERSION 3.20)
project(MyProject LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)

find_package(fmt REQUIRED)
find_package(range-v3 REQUIRED)

add_executable(app main.cpp)
target_link_libraries(app fmt::fmt range-v3::range-v3)
```

## 2. vcpkg

```bash
vcpkg install fmt range-v3
cmake -B build -DCMAKE_TOOLCHAIN_FILE=[vcpkg root]/scripts/buildsystems/vcpkg.cmake
```
