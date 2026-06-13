---
order: 56
title: 'JVM调优'
module: 'java'
category: 'Java'
difficulty: 'advanced'
description: 'JVM参数与性能调优'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 常用参数

```bash
-Xms512m          # 初始堆大小
-Xmx2g            # 最大堆大小
-Xmn256m          # 新生代大小
-XX:+UseG1GC      # 使用 G1
-XX:MaxGCPauseMillis=200  # 目标停顿时间
```

## 2. 诊断工具

```bash
jps               # 查看Java进程
jstat -gc pid     # GC统计
jmap -heap pid    # 堆信息
jstack pid        # 线程栈
jcmd pid GC.heap_info  # 堆信息
```
