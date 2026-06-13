---
order: 62
title: 'SpringBoot进阶'
module: 'java'
category: 'Java'
difficulty: 'intermediate'
description: 'SpringBoot高级特性'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 自动配置

```java
@Configuration
@ConditionalOnClass(DataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration { }
```

## 2. 自定义 Starter

```
my-spring-boot-starter/
├── autoconfigure/
│   └── MyAutoConfiguration.java
├── starter/
└── pom.xml
```
