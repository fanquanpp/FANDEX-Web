---
order: 55
title: '条件类型与infer'
module: 'typescript'
category: 'TypeScript'
difficulty: 'advanced'
description: '条件类型、infer关键字与类型推断'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 条件类型基础

```typescript
type IsString<T> = T extends string ? true : false;
type A = IsString<string>; // true
type B = IsString<number>; // false
```

## 2. 分布式条件类型

```typescript
type ToArray<T> = T extends unknown ? T[] : never;
type Result = ToArray<string | number>; // string[] | number[]

// 阻止分布式
type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;
type Result2 = ToArrayNonDist<string | number>; // (string | number)[]
```

## 3. infer 关键字

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Parameters<T> = T extends (...args: infer P) => any ? P : never;
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;
```

## 4. 递归条件类型

```typescript
type PathKeys<T> = T extends object
  ? { [K in keyof T & string]: K | `${K}.${PathKeys<T[K]>}` }[keyof T & string]
  : never;

type IsNever<T> = [T] extends [never] ? true : false;
type IsAny<T> = 0 extends 1 & T ? true : false;
type IsEqual<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
```
