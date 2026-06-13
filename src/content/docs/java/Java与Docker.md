---
order: 74
title: 'Java与Docker'
module: 'java'
category: 'Java'
difficulty: 'intermediate'
description: 'Java容器化部署'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Dockerfile

```dockerfile
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/app.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## 2. 多阶段构建

```dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build
COPY . .
RUN mvn package -DskipTests

FROM eclipse-temurin:21-jre-alpine
COPY --from=build target/app.jar .
ENTRYPOINT ["java", "-jar", "app.jar"]
```
