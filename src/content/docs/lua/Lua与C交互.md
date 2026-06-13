---
order: 55
title: 'Lua与C交互'
module: 'lua'
category: 'Lua'
difficulty: 'advanced'
description: 'Lua C API'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. C 函数注册

```c
static int l_add(lua_State *L) {
  double a = luaL_checknumber(L, 1);
  double b = luaL_checknumber(L, 2);
  lua_pushnumber(L, a + b);
  return 1;
}

lua_register(L, "add", l_add);
```
