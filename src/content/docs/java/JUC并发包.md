---
order: 53
title: 'JUC并发包'
module: 'java'
category: 'Java'
difficulty: 'advanced'
description: 'java.util.concurrent并发工具'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 线程池

```java
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> doWork());
pool.shutdown();

// 自定义线程池
ThreadPoolExecutor executor = new ThreadPoolExecutor(
  2, 4, 60L, TimeUnit.SECONDS,
  new LinkedBlockingQueue<>(100),
  new ThreadPoolExecutor.CallerRunsPolicy()
);
```

## 2. 并发集合

| 类                      | 说明         |
| ----------------------- | ------------ |
| `ConcurrentHashMap`     | 并发哈希表   |
| `CopyOnWriteArrayList`  | 写时复制列表 |
| `BlockingQueue`         | 阻塞队列     |
| `ConcurrentSkipListMap` | 并发跳表     |

## 3. 原子类

```java
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();
counter.compareAndSet(0, 1);
```
