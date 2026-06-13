---
order: 62
title: 'Lua迭代器'
module: 'lua'
category: 'Lua'
difficulty: 'intermediate'
description: '自定义迭代器'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 迭代器

```lua
-- 简单迭代器
function range(n)
  local i = 0
  return function()
    i = i + 1
    if i <= n then return i end
  end
end

for i in range(5) do print(i) end

-- 泛型 for 状态迭代器
function pairs(t)
  return next, t, nil
end
```
