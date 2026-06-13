---
order: 63
title: 'SpringBoot安全'
module: 'java'
category: 'Java'
difficulty: 'intermediate'
description: 'Spring Security与认证授权'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 基本配置

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/public/**").permitAll()
        .anyRequest().authenticated()
      )
      .oauth2Login(Customizer.withDefaults());
    return http.build();
  }
}
```
