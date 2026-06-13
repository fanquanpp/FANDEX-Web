---
order: 79
title: 'Java与WebAssembly'
module: 'java'
category: 'Java'
difficulty: 'advanced'
description: 'Java与Wasm交互'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Chicory (Java Wasm Runtime)

```java
import com.dylibso.chicory.runtime.Instance;

Instance instance = Instance.builder(Paths.get("module.wasm")).build();
int result = instance.export("add").apply(1, 2)[0];
```
