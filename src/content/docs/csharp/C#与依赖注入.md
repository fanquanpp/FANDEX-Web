---
order: 61
title: 'C#与依赖注入'
module: 'csharp'
category: 'C#'
difficulty: 'intermediate'
description: '.NET依赖注入容器'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 注册与使用

```csharp
// 注册
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<ICache, MemoryCache>();

// 使用
public class UserController {
  private readonly IUserService _service;
  public UserController(IUserService service) => _service = service;
}
```
