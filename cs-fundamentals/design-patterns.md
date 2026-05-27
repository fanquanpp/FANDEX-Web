# 设计模式

> @Version: v4.0.0
> @Author: fanquanpp
> @Category: Computer Science / Design Patterns
> @Description: GoF 23 种设计模式的分类体系、实现原理与状态机视角的行为建模。

---

## 目录

- [1. 设计模式概述与分类体系](#1-设计模式概述与分类体系)
- [2. 创建型模式（5 种）](#2-创建型模式5-种)
- [3. 结构型模式（7 种）](#3-结构型模式7-种)
- [4. 行为型模式（11 种）](#4-行为型模式11-种)
- [5. 模式间的协作与竞争关系](#5-模式间的协作与竞争关系)
- [6. 设计模式的状态机视角](#6-设计模式的状态机视角)
- [7. 从体系结构看设计模式](#7-从体系结构看设计模式)
- [延伸阅读](#延伸阅读)

---

## 1. 设计模式概述与分类体系

设计模式的定义、三大分类（创建型/结构型/行为型）与六大设计原则（SRP/OCP/LSP/ISP/DIP/LoD）。本节绘制 23 种模式的分类体系结构图，说明每种模式的核心意图与适用场景的决策树。

---

## 2. 创建型模式（5 种）

- **Singleton** — 全局唯一实例的创建控制与线程安全状态机
- **Factory Method** — 创建逻辑的延迟绑定与开闭原则
- **Abstract Factory** — 产品族的创建协议与一致性保证
- **Builder** — 复杂对象的分步构建与构建过程状态机
- **Prototype** — 基于克隆的创建与深/浅拷贝的体系结构

本节以状态机描述 Singleton 的懒加载线程安全实现、Builder 的分步构建流程，以体系结构图展示 Factory 层次结构。

---

## 3. 结构型模式（7 种）

- **Adapter** — 接口转换的协议栈思想（类适配器 vs 对象适配器）
- **Bridge** — 抽象与实现的解耦层次结构
- **Composite** — 树形结构的统一接口与递归组合
- **Decorator** — 透明包装的洋葱模型与职责链
- **Facade** — 子系统简化接口的封装层
- **Flyweight** — 共享细粒度对象的内存优化体系结构
- **Proxy** — 访问控制的中间层与远程代理的协议栈

本节以体系结构图展示各模式在对象组合中的层次关系，分析 Decorator 链的调用协议栈。

---

## 4. 行为型模式（11 种）

- **Chain of Responsibility** — 请求沿链传递的协议栈模型
- **Command** — 请求的参数化与撤销/重做状态机
- **Interpreter** — 语法树遍历与微型编译器
- **Iterator** — 遍历协议与游标状态机
- **Mediator** — 中介者的集中调度与星型体系结构
- **Memento** — 状态快照与回滚的状态机
- **Observer** — 发布-订阅的事件驱动协议
- **State** — 对象状态转移的显式状态机
- **Strategy** — 算法族的运行时切换与策略选择状态机
- **Template Method** — 算法骨架与钩子方法的继承协议
- **Visitor** — 双分派的操作分离与编译器 AST 遍历

本节重点以状态机建模 State、Command（撤销栈）、Memento、Iterator 四种模式的动态行为。

---

## 5. 模式间的协作与竞争关系

模式不是孤立的：Composite + Visitor、Strategy + State、Decorator + Composite 等常见组合。本节以依赖图呈现模式间的协作关系，分析功能重叠模式（Bridge vs Adapter、Strategy vs State）的选择决策树。

---

## 6. 设计模式的状态机视角

将行为型模式统一到状态机框架下：State 是显式状态机、Command 的撤销/重做是状态回溯、Iterator 是遍历状态机、Memento 是状态快照机。本节给出统一的状态机元模型，说明如何从状态机视角选择合适的行为型模式。

---

## 7. 从体系结构看设计模式

将设计模式映射到体系结构的分层思想：Facade 是子系统边界、Proxy 是中间层、Bridge 是层次解耦、Decorator 是协议栈封装。本节以体系结构图展示模式在软件架构中的层次定位，分析模式与架构风格（分层/管道/微内核）的关系。

---

## 延伸阅读

- *Design Patterns: Elements of Reusable Object-Oriented Software* — GoF
- *Head First Design Patterns* — Freeman & Robson
- *Pattern-Oriented Software Architecture* — Buschmann et al.
- *Refactoring: Improving the Design of Existing Code* — Martin Fowler
