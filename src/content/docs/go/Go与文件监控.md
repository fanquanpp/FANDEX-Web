---
order: 80
title: 'Go与文件监控'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'fsnotify与文件变更'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. fsnotify

```go
watcher, _ := fsnotify.NewWatcher()
watcher.Add("./config.yaml")

for {
  select {
  case event := <-watcher.Events:
    if event.Has(fsnotify.Write) { reloadConfig() }
  case err := <-watcher.Errors:
    log.Println("Error:", err)
  }
}
```
