# 02-模块与包 | Modules and Packages
> @Author: fanquanpp
> @Category: Lua Basics
> @Description: 02-模块与包 | Modules and Packages
> @Updated: 2026-05-03
---
## 目录
1. [模块基础 | Module Basics](#模块基础-|-module-basics)
2. [模块的实现方式 | Module Implementation](#模块的实现方式-|-module-implementation)
3. [包管理 | Package Management](#包管理-|-package-management)
4. [模块的高级用法 | Advanced Module Usage](#模块的高级用法-|-advanced-module-usage)
5. [实践案例 | Practical Examples](#实践案例-|-practical-examples)
6. [模块设计最佳实践 | Module Design Best Practices](#模块设计最佳实践-|-module-design-best-practices)
7. [总结 | Summary](#总结-|-summary)
---
## 1. 模块基础 | Module Basics
### 1.1 模块的概念
在 Lua 中，模块是一种组织代码的方式，将相关的函数、变量和常量封装在一个命名空间中，避免全局命名冲突：
```lua
 True-- 创建一个简单的模块
 Truelocal MyModule = {}
 function MyModule.add(a, b)
  return a + b
 Trueend
 function MyModule.multiply(a, b)
  return a * b
 Trueend
 return MyModule
 ```

### 1.2 加载模块
使用 `require` 函数加载模块：
```lua
 True-- 加载模块
 Truelocal MyModule = require("mymodule")
 True-- 使用模块中的函数
 print(MyModule.add(1, 2)) -- 输出 3
 print(MyModule.multiply(3, 4)) -- 输出 12
 ```

## 2. 模块的实现方式 | Module Implementation
### 2.1 表模块模式
最常见的模块实现方式是使用表：
```lua
 True-- mymodule.lua
 Truelocal M = {}
 True-- 私有变量
 Truelocal privateVar = "私有变量"
 True-- 私有函数
 Truelocal function privateFunction()
  return "私有函数"
 Trueend
 True-- 公共函数
 function M.publicFunction()
  return "公共函数"
 Trueend
 function M.accessPrivate()
  return privateVar .. ", " .. privateFunction()
 Trueend
 return M
 ```

### 2.2 环境模块模式
使用 `setfenv` 或 `_ENV`（Lua 5.2+）创建模块环境：
```lua
 True-- mymodule.lua
 Truelocal M = {}
 Truelocal _ENV = M
 True-- 私有变量
 Truelocal privateVar = "私有变量"
 True-- 公共函数
 function add(a, b)
  return a + b
 Trueend
 function multiply(a, b)
  return a * b
 Trueend
 return M
 ```

## 3. 包管理 | Package Management
### 3.1 LuaRocks 包管理器
LuaRocks 是 Lua 的包管理器，用于安装和管理 Lua 库：
```bash
 # 安装 LuaRocks（Ubuntu）
 Truesudo apt install luarocks
 # 安装包
 Trueluarocks install luasocket
 # 卸载包
 Trueluarocks remove luasocket
 # 列出已安装的包
 Trueluarocks list
 ```

### 3.2 包搜索路径
Lua 使用 `package.path` 来搜索模块：
```lua
 True-- 查看包搜索路径
 print(package.path)
 True-- 添加自定义搜索路径
 package.path = package.path .. ";/path/to/modules/?.lua"
 ```

## 4. 模块的高级用法 | Advanced Module Usage
### 4.1 模块的缓存
`require` 函数会缓存已加载的模块，避免重复加载：
```lua
 True-- 第一次加载模块
 Truelocal M1 = require("mymodule")
 True-- 第二次加载，返回缓存的模块
 Truelocal M2 = require("mymodule")
 print(M1 == M2) -- 输出  
 ```

### 4.2 模块的重载
如果需要重新加载模块，可以清除缓存：
```lua
 True-- 清除模块缓存
 package.loaded["mymodule"] = nil
 True-- 重新加载模块
 Truelocal M = require("mymodule")
 ```

### 4.3 模块的继承
模块可以继承其他模块：
```lua
 True-- 基础模块
 Truelocal BaseModule = {
  baseMethod = function(self)
  return "基础方法"
  end
 True}
 True-- 派生模块
 Truelocal DerivedModule = setmetatable({}, {__index = BaseModule})
 function DerivedModule.derivedMethod(self)
  return "派生方法"
 Trueend
 return DerivedModule
 ```

## 5. 实践案例 | Practical Examples
### 5.1 数学工具模块
```lua
 True-- mathutils.lua
 Truelocal M = {}
 function M.add(a, b)
  return a + b
 Trueend
 function M.subtract(a, b)
  return a - b
 Trueend
 function M.multiply(a, b)
  return a * b
 Trueend
 function M.divide(a, b)
  if b == 0 then
  error("除数不能为零")
  end
  return a / b
 Trueend
 function M.pow(a, b)
  return a ^ b
 Trueend
 function M.sqrt(a)
  return math.sqrt(a)
 Trueend
 return M
 ```

### 5.2 配置模块
```lua
 True-- config.lua
 Truelocal M = {}
 True-- 默认配置
 Truelocal defaultConfig = {
  host = "localhost",
  port = 8080,
  timeout = 30,
  debug = false
 True}
 True-- 加载配置
 function M.load(config)
  for k, v in pairs(config or {}) do
  defaultConfig[k] = v
  end
  return defaultConfig
 Trueend
 True-- 获取配置
 function M.get(key)
  return defaultConfig[key]
 Trueend
 True-- 设置配置
 function M.set(key, value)
  defaultConfig[key] = value
 Trueend
 return M
 ```

### 5.3 事件系统模块
```lua
 True-- events.lua
 Truelocal M = {}
 Truelocal listeners = {}
 function M.on(event, callback)
  if not listeners[event] then
  listeners[event] = {}
  end
  table.insert(listeners[event], callback)
 Trueend
 function M.off(event, callback)
  if listeners[event] then
  for i, listener in ipairs(listeners[event]) do
  if listener == callback then
  table.remove(listeners[event], i)
  break
  end
  end
  end
 Trueend
 function M.emit(event, ...)
  if listeners[event] then
  for _, callback in ipairs(listeners[event]) do
  callback(...)
  end
  end
 Trueend
 return M
 ```

## 6. 模块设计最佳实践 | Module Design Best Practices
### 6.1 命名规范
- **模块名**：使用小写字母和下划线，避免使用特殊字符
- **文件名**：与模块名保持一致，使用 `.lua` 扩展名
- **函数名**：使用驼峰命名法或下划线命名法，保持一致性
### 6.2 代码组织
- **单一职责**：每个模块只负责一个功能领域
- **清晰接口**：提供简洁明了的公共接口
- **合理封装**：将实现细节设为私有
- **文档注释**：为模块和公共函数添加文档注释
### 6.3 性能考虑
- **避免全局变量**：使用局部变量和模块表
- **合理使用缓存**：对于频繁访问的数据，考虑使用缓存
- **避免循环依赖**：模块之间应避免循环依赖
## 7. 总结 | Summary
- 模块是 Lua 中组织代码的重要方式，避免全局命名冲突
- 最常见的模块实现方式是使用表和返回值
- `require` 函数用于加载模块，并会缓存已加载的模块
- LuaRocks 是 Lua 的包管理器，用于安装和管理 Lua 库
- 模块设计应遵循单一职责、清晰接口、合理封装等原则
通过掌握模块和包的使用，可以编写更加模块化、可维护的 Lua 代码，特别是在大型项目中。
