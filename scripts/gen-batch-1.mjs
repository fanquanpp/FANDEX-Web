import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'c:\\Atian\\Project\\Trae\\FANDEX-vue\\src\\content\\docs';

const files = [
  // TypeScript
  {
    module: 'typescript',
    file: '条件类型与infer.md',
    order: 100,
    title: '条件类型与infer',
    desc: 'TypeScript条件类型与infer关键字详解：Conditional Types、类型推断与分布式条件类型。',
    content: `## 1. 条件类型基础

### 1.1 基本语法

条件类型根据类型关系选择不同的类型结果：

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<'hello'>;  // true
type B = IsString<42>;       // false
\`\`\`

语法结构：\`T extends U ? X : Y\`

### 1.2 extends 的含义

\`extends\` 在条件类型中表示"是否可赋值给"：

\`\`\`typescript
type IsAssignable<T, U> = T extends U ? true : false;

type A = IsAssignable<string, any>;     // true
type B = IsAssignable<never, string>;   // never — 特殊行为
type C = IsAssignable<string, number>;  // false
\`\`\`

## 2. 分布式条件类型

### 2.1 自动分发

当条件类型的检查参数是裸类型参数（naked type parameter）时，会自动对联合类型分发：

\`\`\`typescript
type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;
// 等价于：ToArray<string> | ToArray<number>
// 结果：string[] | number[]
\`\`\`

### 2.2 阻止分发

用 \`[T]\` 包裹阻止分发：

\`\`\`typescript
type ToArrayNoDistribute<T> = [T] extends [any] ? T[] : never;

type Result = ToArrayNoDistribute<string | number>;
// 结果：(string | number)[] — 不分发
\`\`\`

### 2.3 实用分发模式

\`\`\`typescript
// 过滤联合类型中的 null/undefined
type NonNullable<T> = T extends null | undefined ? never : T;

type A = NonNullable<string | null | number | undefined>;
// string | number

// 提取函数类型
type ExtractFunction<T> = T extends (...args: any[]) => any ? T : never;

type B = ExtractFunction<string | (() => void) | number>;
// () => void
\`\`\`

## 3. infer 关键字

### 3.1 基本用法

\`infer\` 在 extends 子句中声明类型变量，由 TypeScript 推断：

\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type A = ReturnType<() => string>;     // string
type B = ReturnType<(x: number) => boolean>; // boolean
\`\`\`

### 3.2 提取函数参数

\`\`\`typescript
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

type A = Parameters<(x: string, y: number) => void>;
// [string, number]
\`\`\`

### 3.3 提取 Promise 值

\`\`\`typescript
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type A = Awaited<Promise<string>>;           // string
type B = Awaited<Promise<Promise<number>>>;  // number（递归解包）
\`\`\`

### 3.4 提取数组元素

\`\`\`typescript
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

type A = First<[1, 2, 3]>; // 1
type B = Last<[1, 2, 3]>;  // 3
\`\`\`

### 3.5 提取字符串部分

\`\`\`typescript
type GetPrefix<S extends string> = S extends \`\${infer P}_\${string}\` ? P : S;

type A = GetPrefix<'user_name'>;  // 'user'
type B = GetPrefix<'hello'>;      // 'hello'
\`\`\`

## 4. 多 infer 位置

\`\`\`typescript
// 同时提取函数参数和返回值
type FunctionInfo<T> = T extends (...args: infer Args) => infer Return
  ? { args: Args; return: Return }
  : never;

type Info = FunctionInfo<(x: string, y: number) => boolean>;
// { args: [string, number]; return: boolean }
\`\`\`

## 5. 条件类型实战

### 5.1 深层只读

\`\`\`typescript
type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;
\`\`\`

### 5.2 类型过滤

\`\`\`typescript
type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

type User = { name: string; age: number; active: boolean };
type StringFields = PickByValue<User, string>; // { name: string }
\`\`\`

### 5.3 函数重载推断

\`\`\`typescript
// 获取最后一个重载签名（最具体的）
type LastOverload<T> = T extends {
  (...args: infer A): infer R;
  (...args: any[]): any;
} ? (...args: A) => R : never;
\`\`\``,
  },

  {
    module: 'typescript',
    file: '映射类型与键重映射.md',
    order: 101,
    title: '映射类型与键重映射',
    desc: 'TypeScript映射类型与键重映射详解：Mapped Types、as子句与高级模式。',
    content: `## 1. 映射类型基础

### 1.1 基本语法

\`\`\`typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number }
\`\`\`

### 1.2 映射类型与索引签名

\`\`\`typescript
// 从联合类型创建对象类型
type Flags = { [K in 'read' | 'write' | 'execute']: boolean };
// { read: boolean; write: boolean; execute: boolean }
\`\`\`

## 2. 键重映射（Key Remapping）

### 2.1 as 子句

TypeScript 4.1 引入 \`as\` 子句，允许在映射时转换键名：

\`\`\`typescript
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }
\`\`\`

### 2.2 过滤键

\`\`\`typescript
type RemoveNull<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

type User = { name: string; age: null; email: string | undefined };
type CleanUser = RemoveNull<User>;
// { name: string; email: string | undefined }
\`\`\`

### 2.3 键名转换

\`\`\`typescript
// 添加前缀
type Prefix<T, P extends string> = {
  [K in keyof T as \`\${P}\${Capitalize<string & K>}\`]: T[K];
};

type PrefixedUser = Prefix<User, 'user'>;
// { userName: string; userAge: number }
\`\`\`

## 3. 内置映射类型

| 类型 | 说明 |
| --- | --- |
| \`Partial<T>\` | 所有属性可选 |
| \`Required<T>\` | 所有属性必需 |
| \`Readonly<T>\` | 所有属性只读 |
| \`Pick<T, K>\` | 选取部分属性 |
| \`Omit<T, K>\` | 排除部分属性 |
| \`Record<K, V>\` | 构建键值对类型 |
| \`Exclude<U, E>\` | 从联合类型排除 |
| \`Extract<U, E>\` | 从联合类型提取 |
| \`NonNullable<T>\` | 排除 null/undefined |

## 4. 高级映射模式

### 4.1 深层 Partial

\`\`\`typescript
type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;
\`\`\`

### 4.2 值类型映射

\`\`\`typescript
type MapValues<T, F extends (v: any) => any> = {
  [K in keyof T]: F extends (v: T[K]) => infer R ? R : never;
};
\`\`\`

### 4.3 条件映射

\`\`\`typescript
type ConditionalPick<T, Condition> = {
  [K in keyof T as T[K] extends Condition ? K : never]: T[K];
};

type StringProps = ConditionalPick<User, string>; // { name: string }
\`\`\``,
  },

  {
    module: 'typescript',
    file: '模板字面量类型.md',
    order: 102,
    title: '模板字面量类型',
    desc: 'TypeScript模板字面量类型详解：Template Literal Types与字符串模式匹配。',
    content: `## 1. 模板字面量类型基础

### 1.1 基本语法

\`\`\`typescript
type World = 'world';
type Greeting = \`hello \${World}\`; // 'hello world'
\`\`\`

### 1.2 与联合类型组合

\`\`\`typescript
type Color = 'red' | 'blue' | 'green';
type Size = 'small' | 'medium' | 'large';
type CSSClass = \`\${Size}-\${Color}\`;
// 'small-red' | 'small-blue' | 'small-green' | 'medium-red' | ...
\`\`\`

### 1.3 内置字符串操作类型

\`\`\`typescript
type A = Uppercase<'hello'>;     // 'HELLO'
type B = Lowercase<'HELLO'>;     // 'hello'
type C = Capitalize<'hello'>;    // 'Hello'
type D = Uncapitalize<'Hello'>;  // 'hello'
\`\`\`

## 2. 字符串模式匹配

### 2.1 提取前缀/后缀

\`\`\`typescript
type RemovePrefix<S, P extends string> = S extends \`\${P}\${infer Rest}\` ? Rest : S;

type A = RemovePrefix<'getUserById', 'get'>; // 'UserById'
\`\`\`

### 2.2 事件监听器类型

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type Handler<T> = (event: T) => void;

type ClickHandler = Handler<EventName<'click'>>; // (event: 'onClick') => void
\`\`\`

### 2.3 CSS 属性类型

\`\`\`typescript
type CSSProperty = 'margin' | 'padding';
type Direction = 'top' | 'right' | 'bottom' | 'left';
type CSSShorthand = \`\${CSSProperty}-\${Direction}\`;
// 'margin-top' | 'margin-right' | ...
\`\`\`

## 3. 实战应用

### 3.1 类型安全的路由

\`\`\`typescript
type Routes = '/users' | '/users/:id' | '/posts/:postId/comments';

type Params<T extends string> = T extends \`\${string}:\${infer P}/\${infer Rest}\`
  ? { [K in P | keyof Params<Rest>]: string }
  : T extends \`\${string}:\${infer P}\`
  ? { [K in P]: string }
  : {};

type UserParams = Params<'/users/:id'>; // { id: string }
\`\`\`

### 3.2 类型安全的 API 客户端

\`\`\`typescript
type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = '/users' | '/posts' | '/comments';
type ApiKey = \`\${ApiMethod} \${ApiEndpoint}\`;
// 'GET /users' | 'POST /users' | ...
\`\`\``,
  },

  {
    module: 'typescript',
    file: '类型体操.md',
    order: 103,
    title: '类型体操',
    desc: 'TypeScript类型体操详解：递归类型、斐波那契、深度只读等高级类型编程。',
    content: `## 1. 递归类型

### 1.1 深层 Readonly

\`\`\`typescript
type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

type Obj = { a: { b: { c: string } } };
type DeepObj = DeepReadonly<Obj>;
// { readonly a: { readonly b: { readonly c: string } } }
\`\`\`

### 1.2 深层 Partial

\`\`\`typescript
type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;
\`\`\`

### 1.3 递归展开元组

\`\`\`typescript
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : T;

type A = Flatten<[1, [2, 3], [4, [5]]]>;
// [1, 2, 3, 4, 5]
\`\`\`

## 2. 斐波那契数列

\`\`\`typescript
type Fibonacci<N extends number, T extends any[] = [1], U extends any[] = []> =
  T['length'] extends N
    ? U['length']
    : Fibonacci<N, [...T, 1], [...U, ...T]>;

type Fib5 = Fibonacci<5>; // 5
type Fib8 = Fibonacci<8>; // 21
\`\`\`

## 3. 字符串操作

### 3.1 反转字符串

\`\`\`typescript
type Reverse<S extends string> = S extends \`\${infer First}\${infer Rest}\`
  ? \`\${Reverse<Rest>}\${First}\`
  : S;

type A = Reverse<'hello'>; // 'olleh'
\`\`\`

### 3.2 去除空白

\`\`\`typescript
type TrimStart<S extends string> = S extends \` \${infer Rest}\` ? TrimStart<Rest> : S;
type TrimEnd<S extends string> = S extends \`\${infer Rest} \` ? TrimEnd<Rest> : S;
type Trim<S extends string> = TrimEnd<TrimStart<S>>;
\`\`\`

## 4. 对象操作

### 4.1 深层 Pick

\`\`\`typescript
type DeepPick<T, Path extends string> = Path extends \`\${infer K}.\${infer Rest}\`
  ? K extends keyof T
    ? { [P in K]: DeepPick<T[K], Rest> }
    : never
  : Path extends keyof T
  ? { [P in Path]: T[P] }
  : never;

type Result = DeepPick<{ a: { b: { c: string } } }, 'a.b.c'>;
// { a: { b: { c: string } } }
\`\`\`

### 4.2 合并类型

\`\`\`typescript
type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
    ? A[K]
    : never;
};
\`\`\`

## 5. 元组操作

### 5.1 元组长度

\`\`\`typescript
type Length<T extends any[]> = T['length'];
type A = Length<[1, 2, 3]>; // 3
\`\`\`

### 5.2 元组转联合类型

\`\`\`typescript
type TupleToUnion<T extends any[]> = T[number];
type A = TupleToUnion<[1, 2, 3]>; // 1 | 2 | 3
\`\`\`

### 5.3 超出计数限制

TypeScript 递归深度限制约 1000 层，超过会报错。对于大数运算需使用查表法：

\`\`\`typescript
type NumberMap = {
  0: [1]; 1: [1, 1]; 2: [1, 1, 1];
  // ... 预定义到需要的范围
};
\`\`\``,
  },

  {
    module: 'typescript',
    file: '模块声明与全局类型增强.md',
    order: 104,
    title: '模块声明与全局类型增强',
    desc: 'TypeScript模块声明与全局类型增强：declare module、全局类型扩展。',
    content: `## 1. 声明文件基础

### 1.1 .d.ts 文件

声明文件描述 JavaScript 代码的类型信息，不包含实现：

\`\`\`typescript
// utils.d.ts
declare function formatDate(date: Date, format: string): string;
declare const VERSION: string;
declare class EventEmitter {
  on(event: string, listener: Function): void;
  emit(event: string, ...args: any[]): void;
}
\`\`\`

### 1.2 三斜线指令

\`\`\`typescript
/// <reference path="types.d.ts" />
/// <reference types="node" />
/// <reference lib="es2020" />
\`\`\`

## 2. declare module

### 2.1 为无类型的模块添加类型

\`\`\`typescript
// types/legacy-lib.d.ts
declare module 'legacy-lib' {
  export function init(config: { apiKey: string }): void;
  export function getData(id: string): Promise<{ name: string; value: number }>;
  export const version: string;
  export default class Client {
    constructor(options: { baseUrl: string });
    request(path: string): Promise<any>;
  }
}
\`\`\`

### 2.2 扩展现有模块

\`\`\`typescript
// 扩展 Express 的 Request 类型
declare module 'express' {
  interface Request {
    userId?: string;
    sessionId?: string;
  }
}
\`\`\`

### 2.3 扩展 Vue 组件类型

\`\`\`typescript
declare module 'vue' {
  interface ComponentCustomProperties {
    $api: typeof import('./api').default;
    $format: typeof import('./utils/format');
  }
}
\`\`\`

## 3. 全局类型增强

### 3.1 扩展全局对象

\`\`\`typescript
// global.d.ts
declare global {
  interface Window {
    __APP_CONFIG__: {
      apiBaseUrl: string;
      version: string;
    };
  }

  interface Array<T> {
    last(): T | undefined;
    first(): T | undefined;
  }
}

export {}; // 确保文件被视为模块
\`\`\`

### 3.2 全局变量声明

\`\`\`typescript
declare var __DEV__: boolean;
declare const __APP_VERSION__: string;
declare function ga(command: string, ...args: any[]): void;
\`\`\`

## 4. 类型声明发布

### 4.1 @types 包

\`\`\`bash
# 安装社区类型声明
npm install @types/lodash
npm install @types/node
\`\`\`

### 4.2 自带类型声明

\`\`\`json
// package.json
{
  "name": "my-lib",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  }
}
\`\`\`

## 5. tsconfig 配置

\`\`\`json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./src/types"],
    "types": ["node", "jest"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "src/**/*.d.ts"]
}
\`\`\``,
  },

  {
    module: 'typescript',
    file: 'tsconfig严格模式.md',
    order: 105,
    title: 'tsconfig严格模式',
    desc: 'TypeScript tsconfig严格模式详解：strict、noImplicitAny、strictNullChecks等选项。',
    content: `## 1. strict 总开关

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

\`strict: true\` 等价于同时启用以下所有选项：

| 选项 | 说明 |
| --- | --- |
| \`strictNullChecks\` | null/undefined 不能赋值给其他类型 |
| \`noImplicitAny\` | 禁止隐式 any |
| \`strictFunctionTypes\` | 函数参数逆变检查 |
| \`strictBindCallApply\` | bind/call/apply 严格类型 |
| \`strictPropertyInitialization\` | 类属性必须初始化 |
| \`noImplicitThis\` | 禁止隐式 any 的 this |
| \`alwaysStrict\` | 输出 "use strict" |
| \`useUnknownInCatchVariables\` | catch 变量为 unknown |

## 2. 核心选项详解

### 2.1 noImplicitAny

\`\`\`typescript
// ❌ 隐式 any
function parse(input) { // Parameter 'input' implicitly has an 'any' type
  return input.trim();
}

// ✅ 显式类型
function parse(input: string): string {
  return input.trim();
}
\`\`\`

### 2.2 strictNullChecks

\`\`\`typescript
// ❌ null 不安全
let name: string = null; // Error

// ✅ 明确包含 null
let name: string | null = null;

// 可选链
function greet(name: string | null) {
  console.log(name?.toUpperCase());
}

// 类型守卫
function process(value: string | null) {
  if (value === null) return;
  console.log(value.toUpperCase()); // string
}
\`\`\`

### 2.3 strictFunctionTypes

\`\`\`typescript
// 函数参数逆变
type AnimalHandler = (animal: Animal) => void;
type DogHandler = (dog: Dog) => void;

let handler: AnimalHandler = (dog: Dog) => {}; // ❌ 不安全
\`\`\`

### 2.4 strictPropertyInitialization

\`\`\`typescript
class User {
  name: string; // ❌ 属性未初始化

  constructor() {}

  // ✅ 方式一：构造函数中初始化
  // constructor() { this.name = ''; }

  // ✅ 方式二：确定赋值断言
  // name!: string;

  // ✅ 方式三：可选属性
  // name?: string;
}
\`\`\`

## 3. 其他推荐选项

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "exactOptionalPropertyTypes": true
  }
}
\`\`\`

### noUncheckedIndexedAccess

\`\`\`typescript
const arr = [1, 2, 3];
const item = arr[10]; // number | undefined

const obj: Record<string, string> = {};
const value = obj.key; // string | undefined
\`\`\`

## 4. 渐进式迁移

\`\`\`json
// 逐步启用严格选项
{
  "compilerOptions": {
    "strictNullChecks": true,   // 第一步
    "noImplicitAny": true,      // 第二步
    "strict": true              // 最终目标
  }
}
\`\`\`

对于难以修复的文件，使用 \`// @ts-nocheck\` 或 \`// @ts-ignore\` 临时跳过。`,
  },

  {
    module: 'typescript',
    file: '装饰器标准实现.md',
    order: 106,
    title: '装饰器标准实现',
    desc: 'TypeScript Stage 3装饰器标准实现详解：类装饰器、方法装饰器与元数据。',
    content: `## 1. Stage 3 装饰器概述

### 1.1 与旧版装饰器的区别

| 特性 | Legacy (experimental) | Stage 3 (standard) |
| --- | --- | --- |
| 启用方式 | \`experimentalDecorators\` | 默认支持 |
| API 风格 | 基于函数描述符 | 基于上下文对象 |
| 类型安全 | 较弱 | 强 |
| 元数据 | 需要 \`emitDecoratorMetadata\` | 内置 \`metadata\` |

### 1.2 启用方式

\`\`\`json
{
  "compilerOptions": {
    // Stage 3 装饰器无需额外配置
    // 旧版需要：
    // "experimentalDecorators": true
  }
}
\`\`\`

## 2. 类装饰器

\`\`\`typescript
function logged<T extends { new(...args: any[]): {} }>(
  value: T,
  context: ClassDecoratorContext
) {
  const name = context.name;
  return class extends value {
    constructor(...args: any[]) {
      console.log(\`Creating \${String(name)} with args:\`, args);
      super(...args);
    }
  };
}

@logged
class User {
  constructor(public name: string) {}
}

new User('Alice'); // Creating User with args: ['Alice']
\`\`\`

## 3. 方法装饰器

\`\`\`typescript
function debounce(delay: number) {
  return function(
    value: Function,
    context: ClassMethodDecoratorContext
  ) {
    let timer: ReturnType<typeof setTimeout>;
    return function(this: any, ...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => value.call(this, ...args), delay);
    };
  };
}

class Search {
  @debounce(300)
  handleInput(query: string) {
    console.log('Searching:', query);
  }
}
\`\`\`

## 4. 属性装饰器

\`\`\`typescript
function required(
  value: undefined,
  context: ClassFieldDecoratorContext
) {
  return function(this: any, initialValue: any) {
    if (initialValue === undefined || initialValue === null) {
      throw new Error(\`\${String(context.name)} is required\`);
    }
    return initialValue;
  };
}

class User {
  @required
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
\`\`\`

## 5. 元数据

\`\`\`typescript
function route(path: string) {
  return function(value: Function, context: ClassMethodDecoratorContext) {
    context.metadata.routes ??= {};
    context.metadata.routes[context.name] = path;
  };
}

class ApiController {
  @route('/users')
  getUsers() {}

  @route('/users/:id')
  getUser() {}
}
\`\`\`

## 6. 装饰器组合

\`\`\`typescript
// 多个装饰器从下到上执行（类似函数组合）
@log
@validate
@memoize
class Calculator {
  @debounce(100)
  @throttle(50)
  calculate() {}
}
\`\`\``,
  },

  // Vue3
  {
    module: 'vue3',
    file: 'computed缓存机制与watch执行时机.md',
    order: 100,
    title: 'computed缓存机制与watch执行时机',
    desc: 'Vue 3 computed缓存机制与watch执行时机详解。',
    content: `## 1. computed 缓存机制

### 1.1 惰性求值

computed 只有在被读取时才会计算，且缓存结果：

\`\`\`javascript
const count = ref(0);
const doubled = computed(() => {
  console.log('computed 执行');
  return count.value * 2;
});

// 首次读取：执行计算
console.log(doubled.value); // computed 执行 → 0

// 再次读取：返回缓存
console.log(doubled.value); // 无日志 → 0（缓存）

// 依赖变化
count.value = 1;
// 此时不会重新计算！computed 是惰性的

// 再次读取：重新计算
console.log(doubled.value); // computed 执行 → 2
\`\`\`

### 1.2 脏标记机制

Vue 3 使用脏标记（dirty flag）实现缓存：

\`\`\`
初始状态: dirty = true
首次读取: 执行计算 → dirty = false → 缓存结果
依赖变化: dirty = true → 不立即重新计算
再次读取: dirty === true → 重新计算 → dirty = false
\`\`\`

### 1.3 computed vs methods

| 特性 | computed | methods |
| --- | --- | --- |
| 缓存 | 有 | 无 |
| 响应式 | 是 | 否 |
| 调用方式 | 属性访问 | 函数调用 |
| 副作用 | 不应有 | 可以有 |

## 2. watch 执行时机

### 2.1 默认行为

\`\`\`javascript
const count = ref(0);

watch(count, (newVal, oldVal) => {
  console.log('watch 触发:', newVal);
}, { flush: 'pre' }); // 默认值

count.value = 1;
console.log('同步代码');
// 输出顺序: 同步代码 → watch 触发: 1
\`\`\`

### 2.2 flush 选项

| flush 值 | 执行时机 | 用途 |
| --- | --- | --- |
| \`pre\` | DOM 更新前（默认） | 修改其他响应式数据 |
| \`post\` | DOM 更新后 | 访问更新后的 DOM |
| \`sync\` | 同步执行 | 调试（性能差） |

\`\`\`javascript
watch(count, (newVal) => {
  // pre: DOM 还未更新
}, { flush: 'pre' });

watch(count, (newVal) => {
  // post: DOM 已更新，可安全访问
  document.getElementById('counter').textContent;
}, { flush: 'post' });
\`\`\`

### 2.3 immediate 选项

\`\`\`javascript
watch(source, (newVal, oldVal) => {
  // 创建时立即执行一次
}, { immediate: true });
\`\`\`

### 2.4 deep 选项

\`\`\`javascript
const state = reactive({ nested: { count: 0 } });

watch(state, (newVal) => {
  // 深层变化也会触发
}, { deep: true });

// Vue 3.4+ watch 自动深层监听 reactive 对象
\`\`\`

## 3. watchEffect

\`\`\`javascript
// 自动追踪依赖
watchEffect(() => {
  console.log(count.value); // 自动追踪 count
});

// 与 watch 的区别
// watchEffect: 自动追踪、立即执行、无旧值
// watch: 显式指定、惰性执行、有旧值
\`\`\`

## 4. 停止侦听器

\`\`\`javascript
const stop = watch(source, callback);

// 组件卸载时自动停止
// 手动停止
stop();
\`\`\``,
  },

  {
    module: 'vue3',
    file: '组合式API优势场景.md',
    order: 101,
    title: '组合式API优势场景',
    desc: 'Vue 3组合式API vs 选项式API对比与优势场景分析。',
    content: `## 1. 两种 API 对比

### 1.1 选项式 API

\`\`\`javascript
export default {
  data() { return { count: 0, user: null }; },
  computed: { doubled() { return this.count * 2; } },
  methods: { increment() { this.count++; } },
  mounted() { this.fetchUser(); }
};
\`\`\`

### 1.2 组合式 API

\`\`\`javascript
export default {
  setup() {
    const count = ref(0);
    const user = ref(null);
    const doubled = computed(() => count.value * 2);
    const increment = () => count.value++;
    onMounted(() => fetchUser());
    return { count, user, doubled, increment };
  }
};
\`\`\`

## 2. 组合式 API 优势

### 2.1 逻辑复用

\`\`\`javascript
// 可复用的鼠标位置逻辑
function useMouse() {
  const x = ref(0);
  const y = ref(0);
  const update = (e) => { x.value = e.clientX; y.value = e.clientY; };
  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));
  return { x, y };
}

// 在任何组件中使用
const { x, y } = useMouse();
\`\`\`

### 2.2 逻辑关注点聚合

选项式 API 中，同一功能的代码分散在 data/methods/computed 中；组合式 API 中，相关代码聚合在一起。

### 2.3 更好的类型推导

\`\`\`typescript
// 组合式 API：自动类型推导
const count = ref(0); // Ref<number>
const name = ref(''); // Ref<string>

// 选项式 API：需要额外声明
\`\`\`

## 3. 适用场景

| 场景 | 推荐 API |
| --- | --- |
| 简单组件 | 选项式 API |
| 逻辑复用 | 组合式 API |
| TypeScript 项目 | 组合式 API |
| 大型项目 | 组合式 API |
| 快速原型 | 选项式 API |`,
  },

  {
    module: 'vue3',
    file: '自定义组合函数封装.md',
    order: 102,
    title: '自定义组合函数封装',
    desc: 'Vue 3自定义组合函数（Composables）封装模式与最佳实践。',
    content: `## 1. Composable 设计原则

### 1.1 命名约定

以 \`use\` 开头：\`useMouse\`、\`useFetch\`、\`useLocalStorage\`

### 1.2 输入输出

\`\`\`typescript
// 输入：ref 或 getter
function useExample(source: Ref<T> | (() => T)) {
  const resolved = computed(() => unref(source));
  // ...
  return { /* refs, computed, methods */ };
}
\`\`\`

## 2. 常见 Composable 模式

### 2.1 useFetch

\`\`\`typescript
function useFetch<T>(url: Ref<string> | string) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  const execute = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(unref(url));
      data.value = await res.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  watch(() => unref(url), execute, { immediate: true });

  return { data, error, loading, execute };
}
\`\`\`

### 2.2 useLocalStorage

\`\`\`typescript
function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key);
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue);

  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val));
  }, { deep: true });

  return data;
}
\`\`\`

### 2.3 useEventListener

\`\`\`typescript
function useEventListener(target: Ref<EventTarget | null>, event: string, handler: EventListener) {
  onMounted(() => target.value?.addEventListener(event, handler));
  onUnmounted(() => target.value?.removeEventListener(event, handler));
}
\`\`\`

## 3. 最佳实践

- 始终在 \`onUnmounted\` 中清理副作用
- 返回 \`ref\` 而非 \`reactive\` 对象
- 接受 \`ref\` 或 getter 作为输入
- 提供合理的默认值`,
  },

  {
    module: 'vue3',
    file: 'Teleport传送门应用.md',
    order: 103,
    title: 'Teleport传送门应用',
    desc: 'Vue 3 Teleport传送门组件应用：模态框、通知、全屏遮罩。',
    content: `## 1. Teleport 基础

### 1.1 基本用法

\`\`\`html
<Teleport to="body">
  <div class="modal">模态框内容</div>
</Teleport>
\`\`\`

\`to\` 属性指定目标容器，内容渲染到该容器中，但逻辑仍属于当前组件。

### 1.2 条件传送

\`\`\`html
<Teleport to="body" :disabled="isMobile">
  <Modal />
</Teleport>
\`\`\`

\`disabled\` 为 true 时，内容渲染在原位。

## 2. 实际应用

### 2.1 模态框

\`\`\`html
<Teleport to="body">
  <div v-if="show" class="modal-overlay" @click="show = false">
    <div class="modal-content" @click.stop>
      <slot />
    </div>
  </div>
</Teleport>
\`\`\`

### 2.2 通知系统

\`\`\`html
<Teleport to="#notifications">
  <TransitionGroup name="notification">
    <div v-for="n in notifications" :key="n.id" class="notification">
      {{ n.message }}
    </div>
  </TransitionGroup>
</Teleport>
\`\`\`

### 2.3 全屏遮罩

\`\`\`html
<Teleport to="body">
  <div v-if="loading" class="fullscreen-loading">
    <Spinner />
  </div>
</Teleport>
\`\`\`

## 3. 多 Teleport 同一目标

多个 Teleport 到同一目标时，按渲染顺序追加：

\`\`\`html
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>b</div>
</Teleport>
<!-- 结果：a, b -->
\`\`\``,
  },

  {
    module: 'vue3',
    file: 'KeepAlive缓存与生命周期.md',
    order: 104,
    title: 'KeepAlive缓存与生命周期',
    desc: 'Vue 3 KeepAlive组件缓存机制与activated/deactivated生命周期。',
    content: `## 1. KeepAlive 基础

### 1.1 基本用法

\`\`\`html
<RouterView v-slot="{ Component }">
  <KeepAlive>
    <component :is="Component" />
  </KeepAlive>
</RouterView>
\`\`\`

### 1.2 缓存策略

\`\`\`html
<!-- 缓存指定组件 -->
<KeepAlive include="UserList,Settings">
  <component :is="current" />
</KeepAlive>

<!-- 排除指定组件 -->
<KeepAlive exclude="Login">
  <component :is="current" />
</KeepAlive>

<!-- 最大缓存数 -->
<KeepAlive :max="10">
  <component :is="current" />
</KeepAlive>
\`\`\`

## 2. 生命周期钩子

\`\`\`javascript
import { onActivated, onDeactivated } from 'vue';

export default {
  setup() {
    onActivated(() => {
      console.log('组件被激活');
    });

    onDeactivated(() => {
      console.log('组件被停用');
    });
  }
};
\`\`\`

| 钩子 | 触发时机 |
| --- | --- |
| \`onActivated\` | 组件从缓存激活时 |
| \`onDeactivated\` | 组件被缓存停用时 |

## 3. 缓存刷新

\`\`\`javascript
// 需要刷新缓存时，移除 include 中的组件名
const cachedViews = ref(['UserList', 'Settings']);

function refreshCache(name) {
  cachedViews.value = cachedViews.value.filter(v => v !== name);
  nextTick(() => {
    cachedViews.value.push(name);
  });
}
\`\`\``,
  },

  {
    module: 'vue3',
    file: '异步组件与Suspense.md',
    order: 105,
    title: '异步组件与Suspense',
    desc: 'Vue 3异步组件defineAsyncComponent与Suspense配合使用。',
    content: `## 1. defineAsyncComponent

### 1.1 基本用法

\`\`\`javascript
const AsyncComp = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
);
\`\`\`

### 1.2 完整配置

\`\`\`javascript
const AsyncComp = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,        // 延迟显示 loading
  timeout: 3000,     // 超时显示 error
  suspensible: false, // 不与 Suspense 配合
  onError(error, retry, fail, attempts) {
    if (attempts <= 3) retry();
    else fail();
  }
});
\`\`\`

## 2. Suspense

### 2.1 基本用法

\`\`\`html
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
\`\`\`

### 2.2 配合 async setup

\`\`\`javascript
// 子组件
export default {
  async setup() {
    const data = await fetchData(); // Suspense 等待此 Promise
    return { data };
  }
};
\`\`\`

### 2.3 事件处理

\`\`\`javascript
const suspenseRef = ref();

suspenseRef.value?.onPending();
suspenseRef.value?.onResolve();
suspenseRef.value?.onFallback();
\`\`\`

> ⚠️ Suspense 仍是实验性功能，API 可能变更。`,
  },

  {
    module: 'vue3',
    file: 'Pinia持久化插件.md',
    order: 106,
    title: 'Pinia持久化插件',
    desc: 'Pinia持久化插件pinia-plugin-persistedstate配置与使用。',
    content: `## 1. 安装与配置

\`\`\`bash
npm install pinia-plugin-persistedstate
\`\`\`

\`\`\`javascript
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
\`\`\`

## 2. 基本用法

\`\`\`javascript
export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    token: ''
  }),
  persist: true // 启用持久化
});
\`\`\`

## 3. 高级配置

\`\`\`javascript
export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    token: '',
    preferences: { theme: 'light' }
  }),
  persist: {
    key: 'my-user-store',       // 存储键名
    storage: sessionStorage,    // 存储方式
    pick: ['token', 'preferences'], // 只持久化部分字段
    omit: ['name'],             // 排除部分字段
    beforeHydrate: (ctx) => {   // 恢复前处理
      console.log('about to hydrate', ctx);
    },
    afterHydrate: (ctx) => {    // 恢复后处理
      console.log('hydrated', ctx);
    }
  }
});
\`\`\`

## 4. 自定义存储

\`\`\`javascript
persist: {
  storage: {
    getItem: (key) => {
      return cookies.get(key);
    },
    setItem: (key, value) => {
      cookies.set(key, value, { expires: 7 });
    },
    removeItem: (key) => {
      cookies.remove(key);
    }
  }
}
\`\`\`

## 5. Setup Store 语法

\`\`\`javascript
export const useUserStore = defineStore('user', () => {
  const token = ref('');
  const name = ref('');

  return { token, name };
}, {
  persist: {
    pick: ['token']
  }
});
\`\`\``,
  },

  {
    module: 'vue3',
    file: 'Vue-Router导航守卫.md',
    order: 107,
    title: 'Vue-Router导航守卫',
    desc: 'Vue Router导航守卫详解：全局守卫、路由独享守卫、组件内守卫。',
    content: `## 1. 全局守卫

### 1.1 beforeEach

\`\`\`javascript
router.beforeEach((to, from) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
});
\`\`\`

### 1.2 afterEach

\`\`\`javascript
router.afterEach((to, from, failure) => {
  if (!failure) {
    document.title = to.meta.title || 'App';
  }
});
\`\`\`

## 2. 路由独享守卫

\`\`\`javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from) => {
      if (!isAdmin()) return '/login';
    }
  }
];
\`\`\`

## 3. 组件内守卫

\`\`\`javascript
export default {
  beforeRouteEnter(to, from, next) {
    // 无法访问 this
    next(vm => {
      // 通过 vm 访问组件实例
    });
  },
  beforeRouteUpdate(to, from) {
    // 路由参数变化时（如 /user/1 → /user/2）
  },
  beforeRouteLeave(to, from) {
    // 离开前确认
    if (hasUnsavedChanges) {
      return window.confirm('确认离开？');
    }
  }
};
\`\`\`

## 4. 守卫执行顺序

\`\`\`
1. beforeRouteLeave（离开组件）
2. beforeEach（全局）
3. beforeRouteUpdate（复用组件）
4. beforeEnter（路由配置）
5. beforeRouteEnter（进入组件）
6. afterEach（全局）
\`\`\`

## 5. 返回值

| 返回值 | 效果 |
| --- | --- |
| \`true\` / \`undefined\` | 允许导航 |
| \`false\` | 取消导航 |
| 路由对象 | 重定向 |`,
  },

  {
    module: 'vue3',
    file: 'Vue性能优化详解.md',
    order: 108,
    title: 'Vue性能优化详解',
    desc: 'Vue 3性能优化详解：虚拟滚动、shallowRef、冻结数据、v-memo。',
    content: `## 1. 响应式优化

### 1.1 shallowRef

\`\`\`javascript
// 大型对象不需要深层响应式
const bigData = shallowRef(loadHugeDataset());
// 只有 .value 赋值才触发更新
bigData.value = newData; // 触发
bigData.value.items.push(x); // 不触发
\`\`\`

### 1.2 shallowReactive

\`\`\`javascript
const state = shallowReactive({
  items: [], // 不是响应式的
  count: 0   // 是响应式的（根级属性）
});
\`\`\`

### 1.3 markRaw

\`\`\`javascript
const staticData = markRaw(largeObject);
// 永远不会转为响应式
\`\`\`

### 1.4 Object.freeze

\`\`\`javascript
const frozenList = Object.freeze(hugeArray);
const items = ref(frozenList); // 跳过深层响应式转换
\`\`\`

## 2. 渲染优化

### 2.1 v-memo

\`\`\`html
<div v-for="item in list" :key="item.id" v-memo="[item.selected]">
  <!-- 仅 item.selected 变化时重新渲染 -->
  <ExpensiveComponent :data="item" />
</div>
\`\`\`

### 2.2 v-once

\`\`\`html
<h1 v-once>{{ title }}</h1>
<!-- 只渲染一次，后续更新跳过 -->
\`\`\`

### 2.3 虚拟滚动

\`\`\`html
<template v-for="item in visibleItems" :key="item.id">
  <div :style="{ transform: \`translateY(\${offset}px)\` }">
    {{ item.content }}
  </div>
</template>
\`\`\`

推荐库：\`vue-virtual-scroller\`、\`vue3-virtual-scroll-list\`

## 3. 组件优化

### 3.1 异步组件

\`\`\`javascript
const HeavyChart = defineAsyncComponent(() =>
  import('./HeavyChart.vue')
);
\`\`\`

### 3.2 KeepAlive

\`\`\`html
<KeepAlive :include="['UserList', 'Settings']">
  <RouterView />
</KeepAlive>
\`\`\`

## 4. 编译优化

Vue 3 编译器自动优化：
- 静态提升（Static Hoisting）
- 补丁标记（Patch Flags）
- 块级树（Block Tree）
- 静态属性提升`,
  },

  // React
  {
    module: 'react',
    file: 'React-Compiler自动记忆化.md',
    order: 100,
    title: 'React-Compiler自动记忆化',
    desc: 'React Compiler原理详解：自动记忆化、依赖分析与性能优化。',
    content: `## 1. React Compiler 概述

### 1.1 解决的问题

手动记忆化的痛点：
- \`useMemo\`/\`useCallback\` 过度使用
- 忘记添加依赖导致 Bug
- 依赖数组维护成本高

React Compiler 自动分析组件，插入必要的记忆化。

### 1.2 工作原理

\`\`\`
源代码 → Babel 解析 → AST 分析 → 自动插入记忆化 → 输出代码
\`\`\`

## 2. 编译前后对比

### 2.1 手动记忆化

\`\`\`jsx
function UserCard({ user, onSelect }) {
  const fullName = useMemo(() => \`\${user.first} \${user.last}\`, [user.first, user.last]);
  const handleClick = useCallback(() => onSelect(user.id), [onSelect, user.id]);

  return <Card title={fullName} onClick={handleClick} />;
}
\`\`\`

### 2.2 Compiler 自动处理

\`\`\`jsx
function UserCard({ user, onSelect }) {
  const fullName = \`\${user.first} \${user.last}\`;
  const handleClick = () => onSelect(user.id);

  return <Card title={fullName} onClick={handleClick} />;
}
// Compiler 自动识别需要记忆化的值
\`\`\`

## 3. 启用 Compiler

\`\`\`bash
npm install babel-plugin-react-compiler
\`\`\`

\`\`\`javascript
// babel.config.js
module.exports = {
  presets: ['@babel/preset-react'],
  plugins: ['babel-plugin-react-compiler'],
};
\`\`\`

\`\`\`javascript
// Vite
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '18' }]],
      },
    }),
  ],
});
\`\`\`

## 4. Compiler 规则

### 4.1 纯函数假设

Compiler 假设组件和 Hook 是纯函数：
- 相同输入 → 相同输出
- 无副作用

### 4.2 不可变数据

\`\`\`jsx
// ❌ 直接修改
items.push(newItem);

// ✅ 不可变更新
const newItems = [...items, newItem];
\`\`\`

## 5. 性能影响

Compiler 生成的记忆化代码比手动 \`useMemo\` 更细粒度，通常能带来 2-5 倍的重渲染性能提升。`,
  },

  {
    module: 'react',
    file: 'Server-Components与Client-Components.md',
    order: 101,
    title: 'Server-Components与Client-Components',
    desc: 'React Server Components与Client Components界限划分与最佳实践。',
    content: `## 1. Server Components

### 1.1 特点

- 在服务端渲染，不发送 JS 到客户端
- 可直接访问数据库、文件系统
- 不能使用 useState、useEffect 等客户端 Hook
- 不能监听事件

\`\`\`jsx
// Server Component
async function UserProfile({ userId }) {
  const user = await db.user.findUnique({ where: { id: userId } });

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}
\`\`\`

## 2. Client Components

### 2.1 声明方式

\`\`\`jsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

### 2.2 特点

- 在客户端渲染和交互
- 可使用所有 React Hook
- 可监听事件
- 会发送 JS 到客户端

## 3. 界限划分

| 场景 | Server | Client |
| --- | --- | --- |
| 获取数据 | ✅ | ❌ |
| 访问后端资源 | ✅ | ❌ |
| 交互（点击/输入） | ❌ | ✅ |
| useState/useEffect | ❌ | ✅ |
| 自定义 Hook（依赖状态） | ❌ | ✅ |
| 大型依赖（如 D3） | ✅（不发送 JS） | ❌ |

## 4. 组合模式

\`\`\`jsx
// Server Component
export default function Page() {
  return (
    <div>
      <ServerHeader />        {/* Server Component */}
      <ClientCounter />       {/* Client Component */}
      <ServerFooter />        {/* Server Component */}
    </div>
  );
}
\`\`\`

> ⚠️ Server Component 可以导入 Client Component，但 Client Component 不能导入 Server Component。`,
  },

  {
    module: 'react',
    file: 'Next.js-App-Router.md',
    order: 102,
    title: 'Next.js-App-Router',
    desc: 'Next.js App Router详解：文件夹约定、布局、加载态、错误态。',
    content: `## 1. 文件夹约定

### 1.1 路由结构

\`\`\`
app/
  layout.tsx          # 根布局
  page.tsx            # 首页 /
  loading.tsx         # 全局加载态
  error.tsx           # 全局错误态
  not-found.tsx       # 404 页面
  about/
    page.tsx          # /about
  blog/
    layout.tsx        # /blog 布局
    page.tsx          # /blog
    [slug]/
      page.tsx        # /blog/:slug
\`\`\`

### 1.2 特殊文件

| 文件 | 用途 |
| --- | --- |
| \`layout.tsx\` | 共享布局 |
| \`page.tsx\` | 路由页面 |
| \`loading.tsx\` | 加载状态 |
| \`error.tsx\` | 错误处理 |
| \`not-found.tsx\` | 404 |
| \`template.tsx\` | 重新挂载的布局 |
| \`default.tsx\` | 并行路由默认 |

## 2. 布局嵌套

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>导航</nav>
        {children}
      </body>
    </html>
  );
}

// app/blog/layout.tsx
export default function BlogLayout({ children }) {
  return (
    <div className="blog-layout">
      <Sidebar />
      {children}
    </div>
  );
}
\`\`\`

## 3. 加载态

\`\`\`tsx
// app/blog/loading.tsx
export default function Loading() {
  return <Skeleton />;
}
\`\`\`

Next.js 自动用 Suspense 包裹页面，显示 loading.tsx。

## 4. 错误态

\`\`\`tsx
// app/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>出错了</h2>
      <button onClick={reset}>重试</button>
    </div>
  );
}
\`\`\`

## 5. 数据获取

\`\`\`tsx
// Server Component 中直接 async
async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data.title}</div>;
}
\`\`\``,
  },

  {
    module: 'react',
    file: 'React-19新增API.md',
    order: 103,
    title: 'React-19新增API',
    desc: 'React 19新增API详解：use、ref as prop、文档元数据、Actions。',
    content: `## 1. use() API

\`\`\`jsx
import { use } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise); // 读取 Promise/Context
  return <h1>{user.name}</h1>;
}
\`\`\`

\`use()\` 可以在条件语句中调用（打破 Hook 规则），但仅限 Promise 和 Context。

## 2. ref as prop

\`\`\`jsx
// React 19: ref 作为普通 prop
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// 不再需要 forwardRef
\`\`\`

## 3. 文档元数据

\`\`\`jsx
function BlogPost() {
  return (
    <>
      <title>文章标题</title>
      <meta name="description" content="文章描述" />
      <article>内容</article>
    </>
  );
}
\`\`\`

React 自动将 \`<title>\` 和 \`<meta>\` 提升到 \`<head>\` 中。

## 4. Actions

\`\`\`jsx
import { useActionState } from 'react';

async function submitForm(formData) {
  const response = await fetch('/api/submit', {
    method: 'POST',
    body: formData
  });
  return response.json();
}

function Form() {
  const [state, submitAction, isPending] = useActionState(submitForm, null);

  return (
    <form action={submitAction}>
      <input name="title" />
      <button type="submit" disabled={isPending}>
        {isPending ? '提交中...' : '提交'}
      </button>
    </form>
  );
}
\`\`\`

## 5. useOptimistic

\`\`\`jsx
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function addTodo(title) {
    addOptimistic({ id: Date.now(), title });
    await saveTodo(title);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

## 6. useFormStatus

\`\`\`jsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? '提交中...' : '提交'}</button>;
}
\`\`\``,
  },

  {
    module: 'react',
    file: '并发渲染与可中断更新.md',
    order: 104,
    title: '并发渲染与可中断更新',
    desc: 'React并发渲染与可中断更新详解：Concurrent Rendering原理。',
    content: `## 1. 并发渲染原理

### 1.1 同步 vs 并发

**同步渲染**：一旦开始，不可中断，直到完成。

**并发渲染**：可暂停、恢复、放弃渲染工作。

\`\`\`
同步:  ────渲染───────→ 用户可交互
并发:  ──渲染──╳──高优先级──→──恢复渲染──→ 用户可交互
\`\`\`

### 1.2 Fiber 架构

Fiber 将渲染工作拆分为小单元（Fiber 节点），每个单元可在 5ms 时间片内完成：

\`\`\`
Work Loop:
  while (nextUnitOfWork && !shouldYield()) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
\`\`\`

## 2. 优先级调度

### 2.1 优先级等级

| 优先级 | 场景 | Lane |
| --- | --- | --- |
| 立即 | 用户输入 | SyncLane |
| 高 | 受控输入 | InputContinuousLane |
| 默认 | 数据获取 | DefaultLane |
| 低 | 离屏预渲染 | IdleLane |

### 2.2 优先级插队

\`\`\`jsx
// 低优先级更新进行中
startTransition(() => {
  setSearchResults(heavyFilter(query));
});

// 用户输入插队（高优先级）
setInputValue(e.target.value);
\`\`\`

## 3. startTransition

\`\`\`jsx
import { useState, startTransition } from 'react';

function Search() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    // 高优先级：立即更新输入框
    setInput(e.target.value);

    // 低优先级：延迟更新搜索结果
    startTransition(() => {
      setResults(filterItems(e.target.value));
    });
  }
}
\`\`\`

## 4. useDeferredValue

\`\`\`jsx
import { useDeferredValue } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <Results query={deferredQuery} />
    </>
  );
}
\`\`\`

\`useDeferredValue\` 返回一个延迟版本的值，当有更高优先级更新时，延迟更新。

## 5. Suspense 与并发

\`\`\`jsx
<Suspense fallback={<Loading />}>
  <UserProfile />  {/* 异步获取数据 */}
</Suspense>
\`\`\`

并发模式下，Suspense 不会阻塞整个树，只显示最近的 fallback。`,
  },

  {
    module: 'react',
    file: '错误边界与Sentry集成.md',
    order: 105,
    title: '错误边界与Sentry集成',
    desc: 'React错误边界与Sentry错误监控集成实践。',
    content: `## 1. Error Boundary

### 1.1 类组件实现

\`\`\`jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>出错了</h1>;
    }
    return this.props.children;
  }
}
\`\`\`

## 2. Sentry 集成

### 2.1 初始化

\`\`\`javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://xxx@sentry.io/xxx',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
\`\`\`

### 2.2 React 集成

\`\`\`jsx
import * as Sentry from '@sentry/react';

// Sentry 提供的 ErrorBoundary
<Sentry.ErrorBoundary fallback={<ErrorPage />} showDialog>
  <App />
</Sentry.ErrorBoundary>

// 路由追踪
const SentryRoute = Sentry.withSentryRouting(Route);
\`\`\`

### 2.3 性能监控

\`\`\`javascript
const transaction = Sentry.startTransaction({ name: 'fetch-users' });
const span = transaction.startChild({ op: 'http', description: 'GET /api/users' });

try {
  await fetch('/api/users');
} finally {
  span.finish();
  transaction.finish();
}
\`\`\``,
  },

  {
    module: 'react',
    file: '自定义Hooks复用逻辑.md',
    order: 106,
    title: '自定义Hooks复用逻辑',
    desc: 'React自定义Hooks设计模式：useFetch、useLocalStorage等实用Hook。',
    content: `## 1. useFetch

\`\`\`typescript
function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { ...options, signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
}
\`\`\`

## 2. useLocalStorage

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}
\`\`\`

## 3. useDebounce

\`\`\`typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`

## 4. useToggle

\`\`\`typescript
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
}
\`\`\`

## 5. 设计原则

- 以 \`use\` 开头
- 返回值使用数组或对象
- 清理副作用（定时器、事件监听、AbortController）
- 接受 ref 或回调作为参数以避免闭包陷阱`,
  },
];

for (const f of files) {
  const dir = join(BASE, f.module);
  mkdirSync(dir, { recursive: true });
  const content = `---\norder: ${f.order}\ntitle: '${f.title}'\nmodule: '${f.module}'\ncategory: 'dev-lang'\ndifficulty: 'advanced'\ndescription: '${f.desc}'\nauthor: 'fanquanpp'\nupdated: 2026-06-14\n---\n\n${f.content}`;
  writeFileSync(join(dir, f.file), content, 'utf-8');
  console.log(`Created: ${f.module}/${f.file}`);
}
