---
order: 73
title: 'Java与Redis'
module: 'java'
category: 'Java'
difficulty: 'intermediate'
description: 'Redis缓存与数据结构'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Spring Data Redis

```java
@Cacheable(value = "users", key = "#id")
public User getUser(Long id) { return repo.findById(id); }

@CacheEvict(value = "users", key = "#user.id")
public void updateUser(User user) { repo.save(user); }
```
