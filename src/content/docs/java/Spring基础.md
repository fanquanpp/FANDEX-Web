---
order: 61
title: 'Spring基础'
module: 'java'
category: 'Java'
difficulty: 'intermediate'
description: 'Spring框架核心概念'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. IoC 容器

```java
@Service
public class UserService {
  @Autowired
  private UserRepository repo;
}
```

## 2. AOP

```java
@Aspect
@Component
public class LoggingAspect {
  @Around("@annotation(Loggable)")
  public Object log(ProceedingJoinPoint pjp) throws Throwable {
    log.info("Before: {}", pjp.getSignature());
    Object result = pjp.proceed();
    log.info("After");
    return result;
  }
}
```
