---
order: 67
title: 'Java网络编程'
module: 'java'
category: 'Java'
difficulty: 'intermediate'
description: 'Socket与HTTP客户端'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. HttpClient（Java 11+）

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("https://api.example.com/data"))
  .header("Accept", "application/json")
  .GET()
  .build();

HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
```

## 2. 异步请求

```java
CompletableFuture<HttpResponse<String>> future =
  client.sendAsync(request, BodyHandlers.ofString());
```
