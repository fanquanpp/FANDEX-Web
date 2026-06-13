---
order: 62
title: 'C#与最小API'
module: 'csharp'
category: 'C#'
difficulty: 'beginner'
description: '.NET Minimal API'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Minimal API

```csharp
var app = WebApplication.CreateBuilder(args).Build();

app.MapGet("/hello", () => "Hello World!");
app.MapGet("/users/{id}", (int id) => userService.GetById(id));
app.MapPost("/users", (User user) => userService.Create(user));

app.Run();
```
