---
order: 78
title: 'C++图形编程'
module: 'cpp'
category: 'C++'
difficulty: 'advanced'
description: 'OpenGL与图形基础'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. OpenGL 初始化

```cpp
#include <GL/gl.h>

void render() {
  glClear(GL_COLOR_BUFFER_BIT);
  glBegin(GL_TRIANGLES);
  glColor3f(1, 0, 0); glVertex2f(-0.5f, -0.5f);
  glColor3f(0, 1, 0); glVertex2f(0.5f, -0.5f);
  glColor3f(0, 0, 1); glVertex2f(0.0f, 0.5f);
  glEnd();
}
```
