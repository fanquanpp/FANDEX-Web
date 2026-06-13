---
order: 86
title: 'Java模块系统'
module: 'java'
category: 'Java'
difficulty: 'advanced'
description: 'JPMS模块系统'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. module-info.java

```java
module com.example.app {
  requires java.sql;
  requires transitive com.example.api;
  exports com.example.app.service;
  opens com.example.app.model to com.fasterxml.jackson.databind;
}
```
