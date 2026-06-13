---
order: 63
title: 'Python与Redis'
module: 'python'
category: 'Python'
difficulty: 'intermediate'
description: 'Redis缓存与消息'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Redis 操作

```python
import redis

r = redis.Redis(host='localhost', port=6379)

r.set('user:1:name', 'Alice', ex=3600)
name = r.get('user:1:name')

# 发布/订阅
pubsub = r.pubsub()
pubsub.subscribe('events')
for message in pubsub.listen():
  print(message)
```
