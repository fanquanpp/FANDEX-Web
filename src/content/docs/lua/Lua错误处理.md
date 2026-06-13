---
order: 61
title: 'Lua错误处理'
module: 'lua'
category: 'Lua'
difficulty: 'beginner'
description: '错误处理与保护调用'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 错误处理

```lua
-- pcall
local ok, result = pcall(function()
  return riskyOperation()
end)
if not ok then
  print("Error:", result)
end

-- xpcall（带错误处理函数）
local ok, result = xpcall(riskyFn, debug.traceback)
```
