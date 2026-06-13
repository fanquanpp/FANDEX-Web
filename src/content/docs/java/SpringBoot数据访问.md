---
order: 64
title: 'SpringBoot数据访问'
module: 'java'
category: 'Java'
difficulty: 'intermediate'
description: 'JPA、MyBatis与数据访问'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. JPA

```java
@Entity
public class User {
  @Id @GeneratedValue
  private Long id;
  private String name;
}

public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByName(String name);
}
```

## 2. MyBatis

```java
@Mapper
public interface UserMapper {
  @Select("SELECT * FROM users WHERE id = #{id}")
  User findById(Long id);
}
```
