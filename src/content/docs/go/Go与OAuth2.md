---
order: 87
title: 'Go与OAuth2'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'OAuth2客户端实现'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. golang.org/x/oauth2

```go
config := &oauth2.Config{
  ClientID:     "client-id",
  ClientSecret: "client-secret",
  Scopes:       []string{"openid", "profile"},
  Endpoint:     google.Endpoint,
}
url := config.AuthCodeURL("state")
token, _ := config.Exchange(ctx, code)
client := config.Client(ctx, token)
```
