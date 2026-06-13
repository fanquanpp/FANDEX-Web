---
order: 84
title: 'Go与HTTP客户端'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'net/http与HTTP请求'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. HTTP 客户端

```go
client := &http.Client{Timeout: 10 * time.Second}
resp, _ := client.Get("https://api.example.com/data")
defer resp.Body.Close()
body, _ := io.ReadAll(resp.Body)
```
