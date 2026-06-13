---
order: 75
title: 'Go与配置管理'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'Viper与配置'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Viper

```go
viper.SetConfigName("config")
viper.AddConfigPath(".")
viper.ReadInConfig()

dbURL := viper.GetString("database.url")
port := viper.GetInt("server.port")
```
