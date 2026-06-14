import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'c:\\Atian\\Project\\Trae\\FANDEX-vue\\src\\content\\docs';

const files = [
  // C
  {
    module: 'c',
    file: '内存对齐.md',
    order: 100,
    title: '内存对齐',
    desc: 'C语言内存对齐详解：struct大小计算、#pragma pack与对齐规则。',
    content: `## 1. 对齐规则

### 1.1 基本规则

1. 成员对齐：每个成员的偏移量必须是 \`min(成员大小, 默认对齐数)\` 的整数倍
2. 结构体对齐：结构体总大小必须是最大成员对齐数的整数倍
3. 默认对齐数：VS 为 8，GCC 无默认值（按成员大小对齐）

### 1.2 示例

\`\`\`c
struct A {
    char a;    // 1 字节，偏移 0
    int b;     // 4 字节，偏移 4（填充 3 字节）
    short c;   // 2 字节，偏移 8
};
// sizeof = 12（填充到 4 的倍数）
\`\`\`

\`\`\`c
struct B {
    int b;     // 4 字节，偏移 0
    short c;   // 2 字节，偏移 4
    char a;    // 1 字节，偏移 6
};
// sizeof = 8（更紧凑）
\`\`\`

## 2. #pragma pack

\`\`\`c
#pragma pack(push, 1)  // 1 字节对齐
struct Packed {
    char a;    // 偏移 0
    int b;     // 偏移 1
    short c;   // 偏移 5
};
#pragma pack(pop)
// sizeof = 7
\`\`\`

## 3. 对齐计算公式

$$\\text{offset} = \\lceil \\frac{\\text{current offset}}{\\text{alignment}} \\rceil \\times \\text{alignment}$$

$$\\text{struct size} = \\lceil \\frac{\\text{last member end}}{\\text{max alignment}} \\rceil \\times \\text{max alignment}$$

## 4. 为什么要对齐

- CPU 访问对齐的内存更快（单次总线传输）
- 某些架构访问未对齐内存会触发异常
- 空间换时间的权衡`,
  },

  {
    module: 'c',
    file: '函数调用栈帧.md',
    order: 101,
    title: '函数调用栈帧',
    desc: 'C语言函数调用栈帧详解：局部变量、返回地址、寄存器保存。',
    content: `## 1. 栈帧结构

\`\`\`
高地址
┌─────────────────┐
│   参数 n         │
│   ...            │
│   参数 1         │
│   返回地址        │ ← 调用前的栈顶
├─────────────────┤
│   保存的 EBP     │ ← 当前 EBP
├─────────────────┤
│   局部变量 1     │
│   局部变量 2     │
│   ...            │
├─────────────────┤
│   临时空间       │ ← ESP
└─────────────────┘
低地址
\`\`\`

## 2. 调用过程

\`\`\`asm
; 调用前
push arg2        ; 参数从右到左入栈
push arg1
call func        ; push 返回地址，jmp func

; func 入口
push ebp         ; 保存旧 EBP
mov ebp, esp     ; 设置新 EBP
sub esp, N       ; 分配局部变量空间

; func 退出
mov esp, ebp     ; 释放局部变量
pop ebp          ; 恢复 EBP
ret              ; pop 返回地址，jmp 回去
\`\`\`

## 3. 调用约定

| 约定 | 参数传递 | 栈清理 | 名称修饰 |
| --- | --- | --- | --- |
| cdecl | 从右到左入栈 | 调用者 | _func |
| stdcall | 从右到左入栈 | 被调用者 | _func@N |
| fastcall | ECX, EDX + 栈 | 被调用者 | @func@N |

## 4. 栈溢出

\`\`\`c
void recursive() {
    char buffer[1024]; // 每次分配 1KB
    recursive();       // 无限递归 → 栈溢出
}
\`\`\`

栈大小通常为 1-8MB，超出即崩溃。`,
  },

  {
    module: 'c',
    file: '指针与数组的区别.md',
    order: 102,
    title: '指针与数组的区别',
    desc: 'C语言指针与数组的区别：sizeof、&运算、传参差异。',
    content: `## 1. sizeof 差异

\`\`\`c
int arr[10];
int *ptr = arr;

sizeof(arr);  // 40 = 10 * sizeof(int)
sizeof(ptr);  // 8（64位系统）或 4（32位系统）
\`\`\`

数组：\`sizeof\` 返回整个数组大小
指针：\`sizeof\` 返回指针本身大小

## 2. & 运算差异

\`\`\`c
int arr[10];

&arr;    // 类型: int (*)[10]，指向整个数组的指针
&arr + 1 // 偏移 sizeof(int[10]) = 40 字节

arr;     // 类型: int*，指向首元素
arr + 1  // 偏移 sizeof(int) = 4 字节
\`\`\`

## 3. 赋值差异

\`\`\`c
int arr[10];
int *ptr = arr; // ✅ 数组名可隐式转为指针

arr = ptr;      // ❌ 数组名不可赋值（不是左值）
arr++;          // ❌ 数组名不可自增
ptr++;          // ✅ 指针可自增
\`\`\`

## 4. 函数参数

\`\`\`c
// 数组作为参数时退化为指针
void func(int arr[]) {
    sizeof(arr); // 8（指针大小，不是数组大小）
}

// 等价于
void func(int *arr) {
    sizeof(arr); // 8
}
\`\`\`

## 5. 多维数组

\`\`\`c
int matrix[3][4];

// matrix 的类型: int (*)[4]
// matrix[i] 的类型: int*
// matrix[i][j] 的类型: int

sizeof(matrix);     // 48 = 3*4*sizeof(int)
sizeof(matrix[0]);  // 16 = 4*sizeof(int)
\`\`\``,
  },

  {
    module: 'c',
    file: '二级指针与指针数组.md',
    order: 103,
    title: '二级指针与指针数组',
    desc: 'C语言二级指针与指针数组详解及应用场景。',
    content: `## 1. 二级指针

\`\`\`c
int x = 42;
int *p = &x;     // 一级指针：指向 int
int **pp = &p;   // 二级指针：指向 int*

**pp;  // 42
*pp;   // &x (p 的值)
pp;    // &p
\`\`\`

## 2. 指针数组 vs 数组指针

\`\`\`c
// 指针数组：数组的每个元素是指针
int *arr[5];  // 5 个 int* 元素

// 数组指针：指向数组的指针
int (*ptr)[5]; // 指向 int[5] 的指针
\`\`\`

## 3. 应用场景

### 3.1 修改调用者的指针

\`\`\`c
void allocate(int **pp) {
    *pp = malloc(sizeof(int));
    **pp = 42;
}

int *p = NULL;
allocate(&p);  // p 现在指向分配的内存
\`\`\`

### 3.2 字符串数组

\`\`\`c
const char *names[] = {"Alice", "Bob", "Charlie"};
// names 是指针数组，每个元素指向一个字符串字面量
\`\`\`

### 3.3 命令行参数

\`\`\`c
int main(int argc, char **argv) {
    // argv 是指针数组，每个元素指向一个参数字符串
    for (int i = 0; i < argc; i++) {
        printf("%s\\n", argv[i]);
    }
}
\`\`\``,
  },

  {
    module: 'c',
    file: '函数指针回调与跳转表.md',
    order: 104,
    title: '函数指针回调与跳转表',
    desc: 'C语言函数指针回调机制与跳转表实现。',
    content: `## 1. 函数指针

\`\`\`c
int add(int a, int b) { return a + b; }
int (*op)(int, int) = add;

op(3, 4);  // 7
\`\`\`

## 2. 回调函数

\`\`\`c
typedef void (*Callback)(int result);

void asyncOperation(int input, Callback cb) {
    int result = input * 2;
    cb(result);
}

void onResult(int result) {
    printf("Result: %d\\n", result);
}

asyncOperation(21, onResult);  // Result: 42
\`\`\`

## 3. 跳转表

\`\`\`c
double add(double a, double b) { return a + b; }
double sub(double a, double b) { return a - b; }
double mul(double a, double b) { return a * b; }
double divide(double a, double b) { return b != 0 ? a / b : 0; }

double (*ops[])(double, double) = { add, sub, mul, divide };

double calculate(int op, double a, double b) {
    if (op >= 0 && op < 4) return ops[op](a, b);
    return 0;
}
\`\`\`

跳转表替代 switch-case，代码更简洁，O(1) 查找。`,
  },

  {
    module: 'c',
    file: '动态库与静态库.md',
    order: 105,
    title: '动态库与静态库',
    desc: 'C语言动态库与静态库：.so/.a生成与链接。',
    content: `## 1. 静态库（.a）

\`\`\`bash
# 编译为目标文件
gcc -c mathlib.c -o mathlib.o

# 打包为静态库
ar rcs libmath.a mathlib.o

# 使用
gcc main.c -L. -lmath -o main
\`\`\`

## 2. 动态库（.so）

\`\`\`bash
# 编译为位置无关代码
gcc -fPIC -c mathlib.c -o mathlib.o

# 生成动态库
gcc -shared -o libmath.so mathlib.o

# 使用
gcc main.c -L. -lmath -o main

# 运行时需要设置库路径
export LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH
\`\`\`

## 3. 对比

| 特性 | 静态库 | 动态库 |
| --- | --- | --- |
| 链接时机 | 编译时 | 运行时 |
| 文件大小 | 可执行文件大 | 可执行文件小 |
| 更新 | 需重新编译 | 替换 .so 即可 |
| 内存 | 每个进程一份 | 多进程共享 |
| 扩展名 | .a (Linux) .lib (Windows) | .so (Linux) .dll (Windows) |`,
  },

  {
    module: 'c',
    file: 'volatile关键字.md',
    order: 106,
    title: 'volatile关键字',
    desc: 'C语言volatile关键字作用与使用场景。',
    content: `## 1. volatile 的作用

告诉编译器该变量可能被外部因素修改，禁止优化：

\`\`\`c
// 无 volatile：编译器可能优化掉循环中的读取
int *p = (int*)0x1000;
while (*p) { /* 编译器可能只读一次 */ }

// 有 volatile：每次循环都重新读取
volatile int *p = (volatile int*)0x1000;
while (*p) { /* 每次都从内存读取 */ }
\`\`\`

## 2. 使用场景

### 2.1 硬件寄存器

\`\`\`c
volatile uint32_t *GPIO_REG = (volatile uint32_t *)0x40020000;
*GPIO_REG = 0x01;  // 写入硬件寄存器
\`\`\`

### 2.2 中断服务程序共享变量

\`\`\`c
volatile int flag = 0;

void ISR() {
    flag = 1;  // 中断中修改
}

int main() {
    while (!flag) { /* 等待中断 */ }
}
\`\`\`

### 2.3 多线程共享变量

\`\`\`c
volatile int shared = 0;
// 注意：volatile 不保证原子性！
// 多线程应使用 atomic 或锁
\`\`\`

## 3. volatile 不保证原子性

\`\`\`c
volatile int counter = 0;
counter++;  // 不是原子操作（读-改-写三步）
// 应使用 atomic_fetch_add
\`\`\``,
  },

  {
    module: 'c',
    file: '位域.md',
    order: 107,
    title: '位域',
    desc: 'C语言位域（bit fields）节省内存详解。',
    content: `## 1. 位域语法

\`\`\`c
struct Flags {
    unsigned int is_active  : 1;  // 1 位
    unsigned int priority   : 3;  // 3 位（0-7）
    unsigned int category   : 4;  // 4 位（0-15）
    unsigned int reserved   : 8;  // 8 位
};
// sizeof(struct Flags) 可能是 2 或 4 字节（取决于对齐）
\`\`\`

## 2. 节省内存

\`\`\`c
// 不用位域：每个字段至少 4 字节
struct FlagsNormal {
    unsigned int is_active;   // 4 字节
    unsigned int priority;    // 4 字节
    unsigned int category;    // 4 字节
};
// sizeof = 12 字节

// 用位域：共享存储空间
struct FlagsBitfield {
    unsigned int is_active  : 1;
    unsigned int priority   : 3;
    unsigned int category   : 4;
};
// sizeof = 4 字节
\`\`\`

## 3. 注意事项

- 位域的布局依赖编译器实现，不可移植
- 不能对位域成员取地址（\`&\`）
- 位域的符号性取决于声明类型
- 相邻位域可能跨边界（编译器决定）`,
  },

  // C++
  {
    module: 'cpp',
    file: 'RAII资源管理.md',
    order: 100,
    title: 'RAII资源管理',
    desc: 'C++ RAII资源管理详解：智能指针、锁守卫与确定性析构。',
    content: `## 1. RAII 原则

RAII（Resource Acquisition Is Initialization）：资源获取即初始化，资源释放即析构。

\`\`\`cpp
class FileHandle {
    FILE* file_;
public:
    FileHandle(const char* path, const char* mode)
        : file_(fopen(path, mode)) {
        if (!file_) throw std::runtime_error("Failed to open file");
    }
    ~FileHandle() { fclose(file_); }

    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;

    FILE* get() { return file_; }
};
\`\`\`

## 2. 智能指针

\`\`\`cpp
// unique_ptr：独占所有权
auto p1 = std::make_unique<int>(42);

// shared_ptr：共享所有权（引用计数）
auto p2 = std::make_shared<int>(42);

// weak_ptr：不增加引用计数
std::weak_ptr<int> wp = p2;
\`\`\`

## 3. 锁守卫

\`\`\`cpp
std::mutex mtx;

void safeOperation() {
    std::lock_guard<std::mutex> lock(mtx);
    // 临界区代码
    // 离开作用域自动 unlock
}

// 或使用 unique_lock（更灵活）
void flexibleOperation() {
    std::unique_lock<std::mutex> lock(mtx);
    // 可以手动 unlock/lock
    lock.unlock();
    lock.lock();
}
\`\`\`

## 4. RAII 的优势

- 异常安全：即使抛出异常，析构函数也会执行
- 避免忘记释放资源
- 代码更简洁，无需手动管理`,
  },

  {
    module: 'cpp',
    file: '移动语义详解.md',
    order: 101,
    title: '移动语义详解',
    desc: 'C++移动语义详解：移动构造、移动赋值、std::move与右值引用。',
    content: `## 1. 左值与右值

\`\`\`cpp
int x = 42;    // x 是左值
int&& r = 42;  // 42 是右值，r 是右值引用
\`\`\`

## 2. 移动构造与移动赋值

\`\`\`cpp
class Buffer {
    int* data_;
    size_t size_;
public:
    // 移动构造
    Buffer(Buffer&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    // 移动赋值
    Buffer& operator=(Buffer&& other) noexcept {
        if (this != &other) {
            delete[] data_;
            data_ = other.data_;
            size_ = other.size_;
            other.data_ = nullptr;
            other.size_ = 0;
        }
        return *this;
    }
};
\`\`\`

## 3. std::move

\`\`\`cpp
std::vector<int> a = {1, 2, 3};
std::vector<int> b = std::move(a);
// a 现在为空（有效但未指定状态）
// b 拥有原来的数据
\`\`\`

\`std::move\` 本身不移动任何东西，只是将左值转为右值引用。

## 4. 完美转发

\`\`\`cpp
template<typename T, typename... Args>
auto make_unique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}
\`\`\``,
  },

  {
    module: 'cpp',
    file: '完美转发与引用折叠.md',
    order: 102,
    title: '完美转发与引用折叠',
    desc: 'C++完美转发与引用折叠详解：std::forward与转发引用。',
    content: `## 1. 引用折叠规则

| T 的类型 | T&& 的结果 |
| --- | --- |
| U& | U& (& && → &) |
| U&& | U&& (&& && → &&) |

## 2. 转发引用

\`\`\`cpp
template<typename T>
void wrapper(T&& arg) {
    // T&& 是转发引用（不是右值引用）
    // arg 可以绑定到左值或右值
}
\`\`\`

## 3. std::forward

\`\`\`cpp
template<typename T>
void wrapper(T&& arg) {
    target(std::forward<T>(arg));
}

// 传入左值 → T = int& → forward 转发为左值
// 传入右值 → T = int → forward 转发为右值
\`\`\`

## 4. 完美转发的意义

保持参数的值类别（左值/右值），避免不必要的拷贝。`,
  },

  {
    module: 'cpp',
    file: '虚函数表与多态内存布局.md',
    order: 103,
    title: '虚函数表与多态内存布局',
    desc: 'C++虚函数表与多态内存布局详解：vtable、vptr。',
    content: `## 1. 虚函数表（vtable）

每个含虚函数的类都有一个 vtable，存储虚函数指针：

\`\`\`cpp
class Base {
public:
    virtual void foo() { }
    virtual void bar() { }
};

class Derived : public Base {
public:
    void foo() override { }
};

// Base vtable:  [&Base::foo, &Base::bar]
// Derived vtable: [&Derived::foo, &Base::bar]
\`\`\`

## 2. 虚指针（vptr）

每个对象含一个 vptr，指向类的 vtable：

\`\`\`cpp
Base b;
Derived d;

// b 的内存布局: [vptr → Base vtable]
// d 的内存布局: [vptr → Derived vtable, Base 成员, Derived 成员]
\`\`\`

## 3. 多态调用过程

\`\`\`cpp
Base* ptr = new Derived;
ptr->foo();
// 1. 通过 ptr 找到 vptr
// 2. 通过 vptr 找到 Derived 的 vtable
// 3. 从 vtable 中找到 Derived::foo 的地址
// 4. 调用 Derived::foo
\`\`\`

## 4. 开销

- 每个对象增加一个指针大小（8字节/64位）
- 虚函数调用有一次间接寻址
- 阻止编译器内联优化`,
  },

  {
    module: 'cpp',
    file: '智能指针循环引用.md',
    order: 104,
    title: '智能指针循环引用',
    desc: 'C++智能指针循环引用问题与weak_ptr解决方案。',
    content: `## 1. 循环引用问题

\`\`\`cpp
struct Node {
    std::shared_ptr<Node> next;
    ~Node() { std::cout << "destroyed\\n"; }
};

auto a = std::make_shared<Node>();
auto b = std::make_shared<Node>();
a->next = b;
b->next = a;  // 循环引用！两个都不会被销毁
\`\`\`

引用计数永远不为 0，内存泄漏。

## 2. weak_ptr 解决

\`\`\`cpp
struct Node {
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev;  // 使用 weak_ptr 打破循环

    ~Node() { std::cout << "destroyed\\n"; }
};

auto a = std::make_shared<Node>();
auto b = std::make_shared<Node>();
a->next = b;
b->prev = a;  // weak_ptr 不增加引用计数
// a 和 b 都能正确销毁
\`\`\`

## 3. weak_ptr 使用

\`\`\`cpp
std::weak_ptr<Node> wp = a;

// 访问前需要 lock
if (auto sp = wp.lock()) {
    sp->doSomething();
} else {
    // 对象已被销毁
}

// 检查是否过期
wp.expired();  // true/false
\`\`\``,
  },

  {
    module: 'cpp',
    file: 'Lambda捕获详解.md',
    order: 105,
    title: 'Lambda捕获详解',
    desc: 'C++ Lambda捕获详解：值捕获、引用捕获、初始化捕获、*this。',
    content: `## 1. 捕获方式

\`\`\`cpp
int x = 10;
int y = 20;

// 值捕获
auto f1 = [x]() { return x; };

// 引用捕获
auto f2 = [&x]() { return x; };

// 全部值捕获
auto f3 = [=]() { return x + y; };

// 全部引用捕获
auto f4 = [&]() { return x + y; };

// 混合捕获
auto f5 = [x, &y]() { return x + y; };
\`\`\`

## 2. 初始化捕获（C++14）

\`\`\`cpp
auto ptr = std::make_unique<int>(42);

// 移动捕获
auto f = [p = std::move(ptr)]() { return *p; };
\`\`\`

## 3. *this 捕获（C++17）

\`\`\`cpp
struct S {
    int x;
    auto getCallback() {
        // [*this] 值拷贝当前对象
        return [*this]() { return x; };
    }
};
\`\`\`

## 4. 注意事项

- 引用捕获可能导致悬空引用
- 值捕获的是创建时的副本
- 避免捕获局部变量的引用`,
  },

  {
    module: 'cpp',
    file: '类型萃取与SFINAE.md',
    order: 106,
    title: '类型萃取与SFINAE',
    desc: 'C++类型萃取与SFINAE详解：type_traits与编译期类型判断。',
    content: `## 1. type_traits

\`\`\`cpp
#include <type_traits>

static_assert(std::is_integral<int>::value);
static_assert(std::is_pointer<int*>::value);
static_assert(std::is_same<int, int32_t>::value);

// C++17 简写
static_assert(std::is_integral_v<int>);
\`\`\`

## 2. SFINAE

替换失败不是错误（Substitution Failure Is Not An Error）：

\`\`\`cpp
// 仅当 T 是整数类型时启用
template<typename T>
std::enable_if_t<std::is_integral_v<T>, T>
process(T value) {
    return value * 2;
}

// 仅当 T 是浮点类型时启用
template<typename T>
std::enable_if_t<std::is_floating_point_v<T>, T>
process(T value) {
    return value * 2.0;
}
\`\`\`

## 3. void_t 技巧（C++17）

\`\`\`cpp
template<typename T, typename = void>
struct has_toString : std::false_type {};

template<typename T>
struct has_toString<T, std::void_t<decltype(std::declval<T>().toString())>>
    : std::true_type {};
\`\`\`

## 4. C++20 Concepts 替代

\`\`\`cpp
template<std::integral T>
T process(T value) { return value * 2; }
\`\`\``,
  },

  {
    module: 'cpp',
    file: '可变参数模板与折叠表达式.md',
    order: 107,
    title: '可变参数模板与折叠表达式',
    desc: 'C++可变参数模板与折叠表达式详解。',
    content: `## 1. 可变参数模板

\`\`\`cpp
template<typename... Args>
void print(Args... args) {
    (std::cout << ... << args) << '\\n';  // C++17 折叠表达式
}

print(1, "hello", 3.14);  // 1hello3.14
\`\`\`

## 2. 折叠表达式

\`\`\`cpp
// 左折叠
(... op expr)   // ((e1 op e2) op e3) op ...

// 右折叠
(expr op ...)   // e1 op (e2 op (... op en))

// 带初始值
(... op expr, init)
(expr op ..., init)
\`\`\`

示例：

\`\`\`cpp
template<typename... Args>
auto sum(Args... args) {
    return (args + ...);  // 右折叠
}

sum(1, 2, 3, 4);  // 10
\`\`\`

## 3. 参数包展开

\`\`\`cpp
template<typename T, typename... Args>
std::unique_ptr<T> make_unique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}
\`\`\``,
  },

  {
    module: 'cpp',
    file: 'C++20协程.md',
    order: 108,
    title: 'C++20协程',
    desc: 'C++20协程详解：co_await、co_yield、co_return。',
    content: `## 1. 协程关键字

- \`co_await\`：挂起协程，等待异步操作
- \`co_yield\`：挂起协程并产出值
- \`co_return\`：从协程返回

## 2. Generator 示例

\`\`\`cpp
#include <coroutine>

Generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i) {
        co_yield i;
    }
}

for (auto val : range(0, 5)) {
    std::cout << val << " ";  // 0 1 2 3 4
}
\`\`\`

## 3. 协程 Promise 类型

\`\`\`cpp
struct Task::promise_type {
    Task get_return_object() { return Task{Handle::from_promise(*this)}; }
    std::suspend_never initial_suspend() { return {}; }
    std::suspend_never final_suspend() noexcept { return {}; }
    void return_void() {}
    void unhandled_exception() { std::terminate(); }
};
\`\`\`

## 4. co_await 机制

\`\`\`cpp
auto result = co_await asyncOperation();
// 1. 调用 awaitable.await_ready()
// 2. 如果 false，调用 awaitable.await_suspend(handle)
// 3. 恢复时调用 awaitable.await_resume() 获取结果
\`\`\``,
  },

  {
    module: 'cpp',
    file: 'C++20概念.md',
    order: 109,
    title: 'C++20概念',
    desc: 'C++20 Concepts约束模板详解。',
    content: `## 1. 定义概念

\`\`\`cpp
template<typename T>
concept Integral = std::is_integral_v<T>;

template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};
\`\`\`

## 2. 使用概念约束模板

\`\`\`cpp
// 方式一：requires 子句
template<typename T> requires Integral<T>
T process(T value) { return value * 2; }

// 方式二：概念名替代 typename
template<Integral T>
T process(T value) { return value * 2; }

// 方式三：尾置 requires
auto process(auto value) requires Integral<decltype(value)> {
    return value * 2;
}
\`\`\`

## 3. 标准库概念

\`\`\`cpp
#include <concepts>

std::integral<T>        // 整数类型
std::floating_point<T>  // 浮点类型
std::same_as<T, U>      // 相同类型
std::derived_from<T, B> // 派生关系
std::convertible_to<T, U> // 可转换
std::invocable<F, Args...>  // 可调用
\`\`\`

## 4. requires 表达式

\`\`\`cpp
template<typename T>
concept Container = requires(T t) {
    typename T::value_type;
    { t.begin() } -> std::same_as<typename T::iterator>;
    { t.end() } -> std::same_as<typename T::iterator>;
    { t.size() } -> std::convertible_to<std::size_t>;
};
\`\`\``,
  },

  {
    module: 'cpp',
    file: 'C++23新特性.md',
    order: 110,
    title: 'C++23新特性',
    desc: 'C++23新特性详解：std::print、std::flat_map等。',
    content: `## 1. std::print

\`\`\`cpp
#include <print>

std::print("Hello, {}!\\n", "World");
std::println("Value: {}", 42);
std::print(stderr, "Error: {}\\n", message);
\`\`\`

## 2. std::flat_map / std::flat_set

\`\`\`cpp
#include <flat_map>

std::flat_map<std::string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;

// 基于排序连续存储，缓存友好
// 适合小数据量、读多写少场景
\`\`\`

## 3. std::expected

\`\`\`cpp
#include <expected>

std::expected<int, std::string> divide(int a, int b) {
    if (b == 0) return std::unexpected("division by zero");
    return a / b;
}

auto result = divide(10, 2);
if (result) {
    std::print("{}\\n", result.value());  // 5
} else {
    std::print("{}\\n", result.error());
}
\`\`\`

## 4. std::generator

\`\`\`cpp
#include <generator>

std::generator<int> fibonacci() {
    int a = 0, b = 1;
    while (true) {
        co_yield a;
        auto tmp = a;
        a = b;
        b = tmp + b;
    }
}
\`\`\`

## 5. 其他特性

- \`if consteval\`：编译期判断
- \`std::is_implicit_lifetime\`
- \`std::unreachable()\`
- \`std::string::contains()\`
- 多维下标运算符 \`operator[]\``,
  },

  {
    module: 'cpp',
    file: '内存序与无锁编程.md',
    order: 111,
    title: '内存序与无锁编程',
    desc: 'C++内存序与无锁编程详解：std::memory_order。',
    content: `## 1. 内存序

\`\`\`cpp
enum memory_order {
    memory_order_relaxed,  // 无顺序保证
    memory_order_consume,  // 数据依赖顺序
    memory_order_acquire,  // 获取语义
    memory_order_release,  // 释放语义
    memory_order_acq_rel,  // 获取+释放
    memory_order_seq_cst   // 顺序一致（默认）
};
\`\`\`

## 2. 各内存序含义

### 2.1 relaxed

\`\`\`cpp
std::atomic<int> counter{0};
counter.fetch_add(1, std::memory_order_relaxed);
// 只保证原子性，不保证顺序
\`\`\`

### 2.2 acquire/release

\`\`\`cpp
std::atomic<bool> ready{false};
int data = 0;

// 线程 A
data = 42;
ready.store(true, std::memory_order_release);

// 线程 B
while (!ready.load(std::memory_order_acquire)) {}
// 保证看到 data = 42
\`\`\`

## 3. 无锁编程示例

\`\`\`cpp
template<typename T>
class LockFreeStack {
    struct Node {
        T data;
        Node* next;
    };
    std::atomic<Node*> head_{nullptr};

public:
    void push(T value) {
        Node* new_node = new Node{std::move(value), head_.load(std::memory_order_relaxed)};
        while (!head_.compare_exchange_weak(new_node->next, new_node,
            std::memory_order_release, std::memory_order_relaxed)) {}
    }
};
\`\`\`

## 4. ABA 问题

CAS 操作可能遇到 ABA 问题：值从 A 变为 B 再变回 A，CAS 认为没有变化。解决方案：带版本号的指针或 \`std::atomic<std::shared_ptr>\`。`,
  },

  // Java
  {
    module: 'java',
    file: 'JVM调优.md',
    order: 100,
    title: 'JVM调优',
    desc: 'JVM调优详解：堆参数、GC日志、MAT分析。',
    content: `## 1. 堆内存参数

\`\`\`bash
# 堆大小
-Xms512m          # 初始堆大小
-Xmx2g            # 最大堆大小
-Xmn256m          # 新生代大小

# 元空间
-XX:MetaspaceSize=256m
-XX:MaxMetaspaceSize=512m

# 栈大小
-Xss512k          # 每个线程栈大小
\`\`\`

## 2. GC 日志

\`\`\`bash
# JDK 8
-XX:+PrintGCDetails -XX:+PrintGCDateStamps -Xloggc:gc.log

# JDK 11+
-Xlog:gc*:file=gc.log:time,uptime,level,tags
\`\`\`

## 3. 常用调优策略

### 3.1 选择 GC 算法

| GC | 适用场景 |
| --- | --- |
| Serial | 单核、小内存 |
| Parallel | 吞吐量优先 |
| CMS | 低延迟（已废弃） |
| G1 | 通用、平衡 |
| ZGC | 超低延迟 |

### 3.2 G1 调优

\`\`\`bash
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200  # 目标停顿时间
-XX:G1HeapRegionSize=8m   # Region 大小
-XX:InitiatingHeapOccupancyPercent=45  # 触发并发标记的堆占用率
\`\`\`

## 4. MAT 分析

1. 使用 jmap 生成堆转储：\`jmap -dump:format=b,file=heap.hprof <pid>\`
2. 用 MAT 打开 heap.hprof
3. 查看 Dominator Tree 找到最大对象
4. 查看 Leak Suspects 报告`,
  },

  {
    module: 'java',
    file: '并发编程详解.md',
    order: 101,
    title: '并发编程详解',
    desc: 'Java并发编程详解：synchronized、Lock、AQS、原子类、线程池。',
    content: `## 1. synchronized

\`\`\`java
// 修饰实例方法：锁当前对象
public synchronized void method() {}

// 修饰静态方法：锁 Class 对象
public static synchronized void method() {}

// 修饰代码块
synchronized(obj) { /* 临界区 */ }
\`\`\`

## 2. Lock 接口

\`\`\`java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // 临界区
} finally {
    lock.unlock();  // 必须在 finally 中释放
}

// 可中断锁
lock.lockInterruptibly();

// 尝试获取锁
if (lock.tryLock(1, TimeUnit.SECONDS)) {
    try { /* ... */ } finally { lock.unlock(); }
}
\`\`\`

## 3. AQS 原理

AbstractQueuedSynchronizer 是 Lock 的实现基础：

- 内部维护一个 volatile int state 和一个 FIFO 等待队列
- ReentrantLock: state = 0 未锁定，> 0 锁定次数
- Semaphore: state = 许可数
- CountDownLatch: state = 计数器

## 4. 原子类

\`\`\`java
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();    // CAS +1
count.compareAndSet(0, 1); // CAS 操作

LongAdder adder = new LongAdder();  // 高并发下更优
adder.add(1);
\`\`\`

## 5. 线程池

\`\`\`java
ThreadPoolExecutor pool = new ThreadPoolExecutor(
    4,                           // 核心线程数
    8,                           // 最大线程数
    60, TimeUnit.SECONDS,       // 空闲线程存活时间
    new LinkedBlockingQueue<>(100), // 任务队列
    new ThreadPoolExecutor.CallerRunsPolicy() // 拒绝策略
);
\`\`\``,
  },

  {
    module: 'java',
    file: 'CompletableFuture异步编排.md',
    order: 102,
    title: 'CompletableFuture异步编排',
    desc: 'Java CompletableFuture异步编排详解。',
    content: `## 1. 创建异步任务

\`\`\`java
// 无返回值
CompletableFuture<Void> f1 = CompletableFuture.runAsync(() -> {
    // 异步任务
});

// 有返回值
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> {
    return "result";
});
\`\`\`

## 2. 串行编排

\`\`\`java
f2.thenApply(result -> result.toUpperCase())     // 转换
  .thenAccept(r -> System.out.println(r))        // 消费
  .thenRun(() -> System.out.println("done"));    // 执行
\`\`\`

## 3. 组合编排

\`\`\`java
// 两个任务都完成后合并
CompletableFuture<String> name = CompletableFuture.supplyAsync(() -> "Alice");
CompletableFuture<Integer> age = CompletableFuture.supplyAsync(() -> 30);

name.thenCombine(age, (n, a) -> n + " is " + a);

// 任一完成
CompletableFuture.anyOf(f1, f2, f3);

// 全部完成
CompletableFuture.allOf(f1, f2, f3);
\`\`\`

## 4. 异常处理

\`\`\`java
f2.exceptionally(ex -> "default")
  .handle((result, ex) -> ex != null ? "error" : result)
  .whenComplete((result, ex) -> { /* 最终处理 */ });
\`\`\``,
  },

  {
    module: 'java',
    file: 'ThreadLocal内存泄漏.md',
    order: 103,
    title: 'ThreadLocal内存泄漏',
    desc: 'Java ThreadLocal内存泄漏原因与解决方案。',
    content: `## 1. 泄漏原因

ThreadLocal 存储在 Thread 的 ThreadLocalMap 中，key 是弱引用，value 是强引用：

\`\`\`
Thread → ThreadLocalMap → Entry[WeakRef<ThreadLocal>, value]
                              ↑ 弱引用           ↑ 强引用
\`\`\`

当 ThreadLocal 对象被回收后，key 变为 null，但 value 仍被强引用，无法回收。

## 2. 解决方案

\`\`\`java
ThreadLocal<Connection> tl = new ThreadLocal<>();

try {
    tl.set(connection);
    // 使用 tl.get()
} finally {
    tl.remove();  // 必须手动清理！
}
\`\`\`

## 3. 线程池中的风险

\`\`\`java
ExecutorService pool = Executors.newFixedThreadPool(10);

// 线程被复用，ThreadLocal 值不会自动清理
pool.submit(() -> {
    tl.set(data);
    // 忘记 remove → 下一个任务可能读到脏数据
});
\`\`\`

## 4. 最佳实践

- 使用后必须 \`remove()\`
- 声明为 \`private static final\`
- 使用 try-finally 确保清理`,
  },

  {
    module: 'java',
    file: '反射与动态代理.md',
    order: 104,
    title: '反射与动态代理',
    desc: 'Java反射与动态代理详解：JDK Proxy、CGLib。',
    content: `## 1. 反射

\`\`\`java
Class<?> clazz = Class.forName("com.example.User");
Method method = clazz.getMethod("setName", String.class);
Object instance = clazz.getDeclaredConstructor().newInstance();
method.invoke(instance, "Alice");
\`\`\`

## 2. JDK 动态代理

\`\`\`java
interface UserService {
    String getName(int id);
}

UserService proxy = (UserService) Proxy.newProxyInstance(
    UserService.class.getClassLoader(),
    new Class[]{UserService.class},
    (obj, method, args) -> {
        System.out.println("Before: " + method.getName());
        Object result = method.invoke(target, args);
        System.out.println("After: " + method.getName());
        return result;
    }
);
\`\`\`

限制：只能代理接口。

## 3. CGLib 动态代理

\`\`\`java
Enhancer enhancer = new Enhancer();
enhancer.setSuperclass(UserServiceImpl.class);
enhancer.setCallback((MethodInterceptor) (obj, method, args, proxy) -> {
    System.out.println("Before");
    Object result = proxy.invokeSuper(obj, args);
    System.out.println("After");
    return result;
});
UserServiceImpl proxy = (UserServiceImpl) enhancer.create();
\`\`\`

优势：可以代理类（通过生成子类）。

## 4. 对比

| 特性 | JDK Proxy | CGLib |
| --- | --- | --- |
| 代理目标 | 接口 | 类 |
| 性能 | 较快 | 较慢（生成子类） |
| 依赖 | JDK 内置 | 第三方库 |
| final 方法 | 不适用 | 无法代理 |`,
  },

  {
    module: 'java',
    file: '注解处理器.md',
    order: 105,
    title: '注解处理器',
    desc: 'Java注解处理器详解：Annotation Processor编译时生成代码。',
    content: `## 1. 基本结构

\`\`\`java
@SupportedAnnotationTypes("com.example.MyAnnotation")
@SupportedSourceVersion(SourceVersion.RELEASE_17)
public class MyProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (Element element : roundEnv.getElementsAnnotatedWith(MyAnnotation.class)) {
            // 生成代码
            generateCode(element);
        }
        return true;
    }
}
\`\`\`

## 2. 注册处理器

\`\`\`
META-INF/services/javax.annotation.processing.Processor
内容：com.example.MyProcessor
\`\`\`

## 3. 代码生成

\`\`\`java
void generateCode(Element element) {
    String className = element.getSimpleName() + "Generated";
    JavaFileObject file = processingEnv.getFiler().createSourceFile(className);
    try (PrintWriter writer = new PrintWriter(file.openWriter())) {
        writer.println("package com.example;");
        writer.println("public class " + className + " {");
        writer.println("  public static void generated() {}");
        writer.println("}");
    }
}
\`\`\`

## 4. 实际应用

- Lombok：生成 getter/setter/builder
- Dagger：依赖注入代码生成
- AutoValue：不可变值类生成
- Room：数据库访问代码生成`,
  },

  {
    module: 'java',
    file: '分代ZGC详解.md',
    order: 106,
    title: '分代ZGC详解',
    desc: 'JDK 21分代ZGC详解：原理、配置与调优。',
    content: `## 1. ZGC 概述

ZGC（Z Garbage Collector）是低延迟垃圾收集器，目标停顿时间 < 1ms。

### 1.1 核心技术

- 着色指针（Colored Pointers）
- 读屏障（Load Barrier）
- 并发整理（Concurrent Compaction）

## 2. 分代 ZGC（JDK 21）

### 2.1 为什么分代

- 大多数对象朝生夕死（弱分代假说）
- 分代可以更频繁地回收新生代
- 减少全堆扫描的开销

### 2.2 启用

\`\`\`bash
java -XX:+UseZGC -XX:+ZGenerational -jar app.jar
\`\`\`

## 3. 配置参数

\`\`\`bash
-XX:+UseZGC              # 启用 ZGC
-XX:+ZGenerational       # 启用分代模式
-XX:ZAllocationSpikeTolerance=2  # 分配峰值容忍度
-XX:SoftMaxHeapSize=1g   # 软最大堆大小
-XX:ConcGCThreads=4      # 并发 GC 线程数
\`\`\`

## 4. 适用场景

- 要求极低延迟（< 10ms 停顿）
- 大堆内存（TB 级别）
- 实时交易系统
- 在线游戏服务器`,
  },

  // Kotlin
  {
    module: 'kotlin',
    file: '协程调度器与上下文.md',
    order: 100,
    title: '协程调度器与上下文',
    desc: 'Kotlin协程调度器与上下文详解：Dispatchers选择与切换。',
    content: `## 1. Dispatchers

\`\`\`kotlin
// 主线程（UI 操作）
withContext(Dispatchers.Main) {
    updateUI()
}

// IO 线程池（网络、文件）
withContext(Dispatchers.IO) {
    val data = fetchData()
}

// 默认线程池（CPU 密集型）
withContext(Dispatchers.Default) {
    heavyComputation()
}

// 不限制（继承父协程调度器）
launch(Dispatchers.Unconfined) { }
\`\`\`

## 2. 调度器选择

| 调度器 | 线程数 | 适用场景 |
| --- | --- | --- |
| Main | 1 | UI 更新 |
| IO | 64（默认） | 网络、文件、数据库 |
| Default | CPU 核数 | 排序、解析、计算 |
| Unconfined | 不固定 | 测试、特殊场景 |

## 3. 上下文组合

\`\`\`kotlin
// 组合调度器和异常处理器
val context = Dispatchers.IO + CoroutineExceptionHandler { _, e ->
    Log.e("Coroutine", "Error", e)
}

launch(context) { /* ... */ }
\`\`\`

## 4. withContext 切换

\`\`\`kotlin
suspend fun loadData(): Data {
    val data = withContext(Dispatchers.IO) {
        api.fetchData()  // IO 操作
    }
    return data  // 自动切回原调度器
}
\`\`\``,
  },

  {
    module: 'kotlin',
    file: 'Flow冷流与SharedFlow和StateFlow.md',
    order: 101,
    title: 'Flow冷流与SharedFlow和StateFlow',
    desc: 'Kotlin Flow冷流与SharedFlow和StateFlow详解。',
    content: `## 1. Flow（冷流）

\`\`\`kotlin
val numbers = flow {
    for (i in 1..5) {
        emit(i)
        delay(100)
    }
}

// 每个收集者独立执行
numbers.collect { println(it) }  // 1,2,3,4,5
numbers.collect { println(it) }  // 1,2,3,4,5（重新执行）
\`\`\`

## 2. SharedFlow（热流）

\`\`\`kotlin
val sharedFlow = MutableSharedFlow<String>()

// 发射
sharedFlow.emit("event")

// 多个收集者共享
sharedFlow.collect { println("A: $it") }
sharedFlow.collect { println("B: $it") }
\`\`\`

配置：

\`\`\`kotlin
MutableSharedFlow<String>(
    replay = 0,        // 新订阅者重放数量
    extraBufferCapacity = 64,
    onBufferOverflow = BufferOverflow.SUSPEND
)
\`\`\`

## 3. StateFlow

\`\`\`kotlin
val state = MutableStateFlow(0)  // 必须有初始值

state.value = 1  // 更新值
state.collect { println(it) }  // 总是能获取最新值
\`\`\`

## 4. 对比

| 特性 | Flow | SharedFlow | StateFlow |
| --- | --- | --- | --- |
| 冷/热 | 冷 | 热 | 热 |
| 多收集者 | 各自执行 | 共享 | 共享 |
| 初始值 | 无 | 无 | 必须 |
| 值缓存 | 无 | replay 配置 | 最新值 |
| 去重 | 无 | 无 | 自动（值相同不发射） |`,
  },

  {
    module: 'kotlin',
    file: 'Channel与BroadcastChannel.md',
    order: 102,
    title: 'Channel与BroadcastChannel',
    desc: 'Kotlin Channel与BroadcastChannel详解。',
    content: `## 1. Channel

\`\`\`kotlin
val channel = Channel<Int>()

launch { channel.send(1) }
val value = channel.receive()  // 1
\`\`\`

### 1.1 容量类型

| 类型 | 说明 |
| --- | --- |
| RENDEZVOUS | 无缓冲（默认） |
| UNLIMITED | 无限缓冲 |
| BUFFERED | 固定缓冲（默认64） |
| CONFLATED | 新值覆盖旧值 |

\`\`\`kotlin
Channel<Int>(capacity = Channel.BUFFERED)
Channel<Int>(capacity = Channel.CONFLATED)
\`\`\`

## 2. Channel 操作

\`\`\`kotlin
// 遍历接收
for (item in channel) {
    println(item)
}

// produce 创建生产者
val producer = produce {
    repeat(10) { send(it) }
}

// consumeEach 消费
channel.consumeEach { println(it) }
\`\`\`

## 3. BroadcastChannel（已废弃）

使用 SharedFlow 替代：

\`\`\`kotlin
// 旧方式（已废弃）
// val broadcast = BroadcastChannel<Int>(1)

// 新方式
val broadcast = MutableSharedFlow<Int>(
    replay = 0,
    extraBufferCapacity = 1,
    onBufferOverflow = BufferOverflow.DROP_OLDEST
)
\`\`\``,
  },

  {
    module: 'kotlin',
    file: '密封类与密封接口.md',
    order: 103,
    title: '密封类与密封接口',
    desc: 'Kotlin密封类与密封接口详解：受限继承与穷举检查。',
    content: `## 1. 密封类

\`\`\`kotlin
sealed class Result<out T> {
    data class Success<T>(val value: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

fun handle(result: Result<Int>) = when (result) {
    is Result.Success -> println(result.value)
    is Result.Error -> println(result.message)
    Result.Loading -> println("Loading...")
    // 不需要 else 分支，编译器检查穷举
}
\`\`\`

## 2. 密封接口

\`\`\`kotlin
sealed interface Action {
    data class Click(val x: Int, val y: Int) : Action
    data class Swipe(val direction: Direction) : Action
    object Idle : Action
}
\`\`\`

## 3. 优势

- 编译器保证穷举所有子类
- 限定继承范围（同一文件/包）
- 与 when 配合实现类型安全
- 适合建模有限状态机、UI 事件、网络结果`,
  },

  {
    module: 'kotlin',
    file: '内联类.md',
    order: 104,
    title: '内联类',
    desc: 'Kotlin内联类inline class避免装箱开销。',
    content: `## 1. 基本用法

\`\`\`kotlin
@JvmInline
value class UserId(val id: String)

@JvmInline
value class Meter(val value: Double)
\`\`\`

## 2. 避免装箱

\`\`\`kotlin
// 不用内联类：Int 装箱为 Integer
data class Wrapper(val value: Int)
val list = listOf(Wrapper(1), Wrapper(2))  // 每个都装箱

// 用内联类：编译为原始类型
@JvmInline
value class InlineWrapper(val value: Int)
val list2 = listOf(InlineWrapper(1), InlineWrapper(2))  // 无装箱
\`\`\`

## 3. 类型安全

\`\`\`kotlin
@JvmInline
value class UserId(val id: String)

@JvmInline
value class OrderId(val id: String)

fun getUser(id: UserId) { /* ... */ }

getUser(UserId("123"))  // ✅
getUser(OrderId("123")) // ❌ 编译错误，类型不匹配
\`\`\`

## 4. 限制

- 必须有且仅有一个 val 属性
- 不能有 init 块
- 不能继承其他类
- 运行时可能退化为底层类型（泛型、可空时）`,
  },

  {
    module: 'kotlin',
    file: '扩展函数的编译原理.md',
    order: 105,
    title: '扩展函数的编译原理',
    desc: 'Kotlin扩展函数编译原理详解。',
    content: `## 1. 扩展函数本质

\`\`\`kotlin
fun String.addExclamation(): String = this + "!"
\`\`\`

编译为静态方法：

\`\`\`java
public static final String addExclamation(String receiver) {
    return receiver + "!";
}
\`\`\`

## 2. 关键特性

### 2.1 不修改原类

扩展函数是静态解析的，不会真正修改被扩展的类。

### 2.2 静态分发

\`\`\`kotlin
open class Animal
class Dog : Animal()

fun Animal.sound() = "Generic"
fun Dog.sound() = "Woof"

val animal: Animal = Dog()
animal.sound()  // "Generic" — 静态分发，看声明类型
\`\`\`

### 2.3 不能访问私有成员

扩展函数不能访问类的 private 成员，因为它本质上是外部静态方法。

## 3. 与成员函数冲突

\`\`\`kotlin
class Foo {
    fun bar() = "member"
}

fun Foo.bar() = "extension"

Foo().bar()  // "member" — 成员函数优先
\`\`\``,
  },

  {
    module: 'kotlin',
    file: '作用域函数区别.md',
    order: 106,
    title: '作用域函数区别',
    desc: 'Kotlin作用域函数区别：let、run、with、apply、also。',
    content: `## 1. 对比表

| 函数 | 对象引用 | 返回值 | 是否扩展函数 |
| --- | --- | --- | --- |
| let | it | lambda 结果 | 是 |
| run | this | lambda 结果 | 是 |
| with | this | lambda 结果 | 否（参数） |
| apply | this | 对象本身 | 是 |
| also | it | 对象本身 | 是 |

## 2. 使用场景

### 2.1 let — 空安全与转换

\`\`\`kotlin
val length = name?.let {
    println("Name: $it")
    it.length
}
\`\`\`

### 2.2 apply — 对象配置

\`\`\`kotlin
val person = Person().apply {
    name = "Alice"
    age = 30
}
\`\`\`

### 2.3 also — 附加操作

\`\`\`kotlin
val numbers = mutableListOf(1, 2, 3).also {
    println("Original: $it")
}
\`\`\`

### 2.4 run — 执行块

\`\`\`kotlin
val result = run {
    val a = computeA()
    val b = computeB()
    a + b
}
\`\`\`

### 2.5 with — 非空对象操作

\`\`\`kotlin
with(configuration) {
    host = "localhost"
    port = 8080
    debug = true
}
\`\`\``,
  },

  {
    module: 'kotlin',
    file: '协程异常处理.md',
    order: 107,
    title: '协程异常处理',
    desc: 'Kotlin协程异常处理：CoroutineExceptionHandler、SupervisorJob。',
    content: `## 1. 异常传播

\`\`\`kotlin
val scope = CoroutineScope(Dispatchers.Default)

// 默认：子协程失败会取消父协程和兄弟协程
scope.launch {
    launch { throw Exception("child 1 fails") }
    launch { delay(1000); println("child 2") }  // 被取消
}
\`\`\`

## 2. SupervisorJob

\`\`\`kotlin
// 子协程失败不影响其他子协程
val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

scope.launch {
    launch { throw Exception("child 1 fails") }
    launch { delay(1000); println("child 2") }  // 正常执行
}
\`\`\`

## 3. CoroutineExceptionHandler

\`\`\`kotlin
val handler = CoroutineExceptionHandler { _, exception ->
    println("Caught: $exception")
}

scope.launch(handler) {
    throw Exception("error")
}
\`\`\`

## 4. supervisorScope

\`\`\`kotlin
supervisorScope {
    launch { throw Exception("A fails") }
    launch { delay(100); println("B runs") }
}
// A 失败不影响 B
\`\`\`

## 5. try-catch 限制

\`\`\`kotlin
// ❌ 捕获不到 launch 的异常
try {
    launch { throw Exception() }
} catch (e: Exception) { }

// ✅ 使用 async + await
try {
    val deferred = async { throw Exception() }
    deferred.await()
} catch (e: Exception) { }
\`\`\``,
  },

  {
    module: 'kotlin',
    file: 'Kotlin跨平台.md',
    order: 108,
    title: 'Kotlin跨平台',
    desc: 'Kotlin跨平台详解：Kotlin/JS与Kotlin/Native。',
    content: `## 1. Kotlin Multiplatform

\`\`\`kotlin
// 共享代码
expect fun getPlatformName(): String

// 平台实现
// androidMain
actual fun getPlatformName() = "Android"

// iosMain
actual fun getPlatformName() = "iOS"

// jsMain
actual fun getPlatformName() = "JavaScript"
\`\`\`

## 2. Kotlin/JS

\`\`\`kotlin
// 调用 JavaScript API
external fun alert(message: String)

// 使用 DOM
document.getElementById("app")?.innerHTML = "<h1>Hello</h1>"
\`\`\`

## 3. Kotlin/Native

\`\`\`kotlin
// 直接编译为原生二进制
// 无需 JVM
// 适用于 iOS、嵌入式、WASM

// 内存管理：自动引用计数（ARC）
\`\`\`

## 4. 共享模块策略

\`\`\`
shared/
  commonMain/     # 所有平台共享
  androidMain/    # Android 特定
  iosMain/        # iOS 特定
  jsMain/         # JS 特定
  desktopMain/    # JVM Desktop 特定
\`\`\``,
  },

  // C#
  {
    module: 'csharp',
    file: 'LINQ延迟与立即执行.md',
    order: 100,
    title: 'LINQ延迟与立即执行',
    desc: 'C# LINQ延迟执行与立即执行详解。',
    content: `## 1. 延迟执行

\`\`\`csharp
var query = numbers.Where(n => n > 3);  // 不执行
var results = query.ToList();  // 此时才执行
\`\`\`

延迟执行的方法：Where, Select, OrderBy, GroupBy, Skip, Take, Concat, Union, ...

## 2. 立即执行

\`\`\`csharp
var count = numbers.Count();        // 立即执行
var list = numbers.ToList();        // 立即执行
var first = numbers.First();        // 立即执行
var any = numbers.Any(n => n > 5);  // 立即执行
\`\`\`

## 3. 延迟执行的陷阱

\`\`\`csharp
var numbers = new List<int> { 1, 2, 3 };
var query = numbers.Where(n => n > 1);
numbers.Add(4);  // 修改源数据
query.Count();   // 3（包含新添加的 4）
\`\`\`

## 4. IQueryable vs IEnumerable

| 类型 | 执行位置 | 适用场景 |
| --- | --- | --- |
| IEnumerable | 客户端（内存） | 内存集合 |
| IQueryable | 服务端（数据库） | 数据库查询 |`,
  },

  {
    module: 'csharp',
    file: 'async-await状态机.md',
    order: 101,
    title: 'async-await状态机',
    desc: 'C# async/await状态机生成原理详解。',
    content: `## 1. 编译器转换

\`\`\`csharp
async Task<int> GetDataAsync() {
    var a = await Step1Async();
    var b = await Step2Async(a);
    return a + b;
}
\`\`\`

编译器生成状态机：

\`\`\`csharp
struct StateMachine : IAsyncStateMachine {
    int state;
    TaskAwaiter<int> awaiter;
    
    void MoveNext() {
        try {
            if (state == 0) {
                awaiter = Step1Async().GetAwaiter();
                if (!awaiter.IsCompleted) {
                    state = 1;
                    AwaitUnsafeOnCompleted(ref awaiter, ref this);
                    return;
                }
                goto step1_done;
            }
            if (state == 1) {
                step1_done:
                a = awaiter.GetResult();
                awaiter = Step2Async(a).GetAwaiter();
                // ...
            }
        } catch (Exception ex) {
            taskCompletionSource.SetException(ex);
        }
    }
}
\`\`\`

## 2. 开销

- 状态机结构体分配
- Task 对象分配（ValueTask 可优化）
- 上下文捕获和恢复

## 3. 优化建议

- 使用 \`ValueTask\` 替代 \`Task\`（同步完成时无分配）
- 使用 \`ConfigureAwait(false)\` 避免上下文捕获
- 避免在热路径中使用 async/await`,
  },

  {
    module: 'csharp',
    file: '委托与事件底层原理.md',
    order: 102,
    title: '委托与事件底层原理',
    desc: 'C#委托与事件底层原理详解。',
    content: `## 1. 委托本质

\`\`\`csharp
delegate int MyDelegate(string s);
\`\`\`

编译为继承 \`System.MulticastDelegate\` 的类：

\`\`\`csharp
class MyDelegate : MulticastDelegate {
    public extern int Invoke(string s);
    public extern IAsyncResult BeginInvoke(string s, AsyncCallback cb, object state);
    public extern int EndInvoke(IAsyncResult result);
}
\`\`\`

## 2. 多播委托

\`\`\`csharp
MyDelegate d1 = s => s.Length;
MyDelegate d2 = s => int.Parse(s);
MyDelegate combined = d1 + d2;  // InvocationList 包含两个委托
\`\`\`

## 3. 事件本质

\`\`\`csharp
public event EventHandler<string> OnMessage;
\`\`\`

编译为：

\`\`\`csharp
private EventHandler<string> _onMessage;
public event EventHandler<string> OnMessage {
    add => Delegate.Combine(ref _onMessage, value);
    remove => Delegate.Remove(ref _onMessage, value);
}
\`\`\`

## 4. 委托 vs 事件

| 特性 | 委托 | 事件 |
| --- | --- | --- |
| 外部调用 | 可以 | 不可以 |
| 外部赋值 | 可以 | 不可以 |
| += / -= | 可以 | 可以 |
| 封装性 | 弱 | 强 |`,
  },

  {
    module: 'csharp',
    file: '反射与特性应用.md',
    order: 103,
    title: '反射与特性应用',
    desc: 'C#反射与特性（Attribute）应用详解。',
    content: `## 1. 反射

\`\`\`csharp
var type = typeof(User);
var props = type.GetProperties();
var methods = type.GetMethods();

// 创建实例
var instance = Activator.CreateInstance(type);

// 调用方法
var method = type.GetMethod("GetName");
var result = method.Invoke(instance, null);
\`\`\`

## 2. 特性定义与使用

\`\`\`csharp
[AttributeUsage(AttributeTargets.Property)]
class ColumnAttribute : Attribute {
    public string Name { get; }
    public ColumnAttribute(string name) => Name = name;
}

class User {
    [Column("user_name")]
    public string Name { get; set; }
}
\`\`\`

## 3. 运行时读取特性

\`\`\`csharp
var prop = typeof(User).GetProperty("Name");
var attr = prop.GetCustomAttribute<ColumnAttribute>();
Console.WriteLine(attr.Name);  // "user_name"
\`\`\`

## 4. 实际应用

- ORM 映射（Entity Framework）
- 序列化控制（JsonSerializer）
- 依赖注入标记
- 单元测试框架（[Test], [SetUp]）`,
  },

  {
    module: 'csharp',
    file: 'Entity-Framework-Core迁移与优化.md',
    order: 104,
    title: 'Entity-Framework-Core迁移与优化',
    desc: 'Entity Framework Core迁移与性能优化详解。',
    content: `## 1. 迁移命令

\`\`\`bash
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet ef migrations remove  # 撤销上次迁移
\`\`\`

## 2. 常见优化

### 2.1 N+1 问题

\`\`\`csharp
// ❌ N+1 查询
var blogs = context.Blogs.ToList();
foreach (var blog in blogs) {
    var posts = blog.Posts.ToList();  // 每个博客一次查询
}

// ✅ Eager Loading
var blogs = context.Blogs.Include(b => b.Posts).ToList();
\`\`\`

### 2.2 选择性加载

\`\`\`csharp
// 只查询需要的列
var results = context.Users
    .Where(u => u.Active)
    .Select(u => new { u.Id, u.Name })
    .ToList();
\`\`\`

### 2.3 批量操作

\`\`\`csharp
// 使用 EFCore.BulkExtensions
context.BulkInsert(entities);
context.BulkUpdate(entities);
\`\`\`

### 2.4 分割查询

\`\`\`csharp
context.Blogs
    .Include(b => b.Posts)
    .AsSplitQuery()  // 拆分为多个 SQL 查询
    .ToList();
\`\`\``,
  },

  {
    module: 'csharp',
    file: 'ASP-NET-Core中间件管道.md',
    order: 105,
    title: 'ASP-NET-Core中间件管道',
    desc: 'ASP.NET Core中间件管道详解。',
    content: `## 1. 管道模型

\`\`\`
Request → Middleware1 → Middleware2 → Middleware3 → Endpoint
                                                    ↓
Response ← Middleware1 ← Middleware2 ← Middleware3 ← Handler
\`\`\`

## 2. 内置中间件

\`\`\`csharp
var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
\`\`\`

## 3. 自定义中间件

\`\`\`csharp
app.Use(async (context, next) => {
    // 前置逻辑
    var sw = Stopwatch.StartNew();
    
    await next();  // 调用下一个中间件
    
    // 后置逻辑
    sw.Stop();
    context.Response.Headers.Add("X-Elapsed-Ms", sw.ElapsedMilliseconds.ToString());
});
\`\`\`

## 4. 中间件顺序

顺序很重要！错误的顺序可能导致功能异常：

\`\`\`
1. UseExceptionHandler / UseDeveloperExceptionPage
2. UseHsts
3. UseHttpsRedirection
4. UseStaticFiles
5. UseRouting
6. UseCors
7. UseAuthentication
8. UseAuthorization
9. MapControllers
\`\`\``,
  },

  {
    module: 'csharp',
    file: '依赖注入生命周期.md',
    order: 106,
    title: '依赖注入生命周期',
    desc: 'ASP.NET Core依赖注入生命周期详解：Scoped、Transient、Singleton。',
    content: `## 1. 三种生命周期

\`\`\`csharp
services.AddSingleton<IDatabase, Database>();     // 单例
services.AddScoped<IUserService, UserService>();  // 作用域
services.AddTransient<ILogger, Logger>();         // 瞬态
\`\`\`

## 2. 对比

| 生命周期 | 创建时机 | 同一请求内 | 不同请求间 |
| --- | --- | --- | --- |
| Singleton | 应用启动 | 同一实例 | 同一实例 |
| Scoped | 每次请求 | 同一实例 | 不同实例 |
| Transient | 每次注入 | 不同实例 | 不同实例 |

## 3. 陷阱

### 3.1 Captive Dependency

\`\`\`csharp
// ❌ Singleton 依赖 Scoped
services.AddSingleton<IService, ServiceImpl>();  // ServiceImpl 依赖 Scoped 服务
// Scoped 服务被"囚禁"在 Singleton 中，变成单例行为

// ✅ 确保依赖方向正确
// Singleton → Singleton
// Scoped → Scoped 或 Singleton
// Transient → 任意
\`\`\``,
  },

  {
    module: 'csharp',
    file: 'GC代机制.md',
    order: 107,
    title: 'GC代机制',
    desc: '.NET GC代机制详解：Generation 0/1/2。',
    content: `## 1. 三代模型

| 代 | 说明 | 大小 | GC 频率 |
| --- | --- | --- | --- |
| Gen 0 | 短寿命对象 | 小 | 最频繁 |
| Gen 1 | 短寿命与长寿命的缓冲 | 中 | 较少 |
| Gen 2 | 长寿命对象 | 大 | 最少 |
| LOH | 大对象（≥85KB） | 大 | Gen 2 回收时 |

## 2. 提升规则

- 新对象分配在 Gen 0
- Gen 0 GC 后存活的对象提升到 Gen 1
- Gen 1 GC 后存活的对象提升到 Gen 2
- Gen 2 GC 后仍存活的对象留在 Gen 2

## 3. GC 模式

\`\`\`csharp
// 工作站模式（默认）
// 服务器模式
<ServerGarbageCollection>true</ServerGarbageCollection>
\`\`\`

## 4. 手动触发

\`\`\`csharp
GC.Collect();         // 全代回收
GC.Collect(0);        // 仅 Gen 0
GC.Collect(2, GCCollectionMode.Forced, blocking: true);
\`\`\`

> ⚠️ 通常不需要手动触发 GC。`,
  },

  {
    module: 'csharp',
    file: '值类型与引用类型.md',
    order: 108,
    title: '值类型与引用类型',
    desc: 'C#值类型与引用类型详解：struct vs class。',
    content: `## 1. 对比

| 特性 | struct（值类型） | class（引用类型） |
| --- | --- | --- |
| 存储 | 栈（通常） | 堆 |
| 赋值 | 复制值 | 复制引用 |
| 继承 | 不支持 | 支持 |
| 默认值 | 零值 | null |
| 装箱 | 是 | 否 |
| 适合 | 小型数据 | 复杂对象 |

## 2. 装箱与拆箱

\`\`\`csharp
int x = 42;
object obj = x;        // 装箱：值类型 → 堆上的引用类型
int y = (int)obj;      // 拆箱：引用类型 → 值类型
\`\`\`

## 3. 何时使用 struct

- 小于 16 字节
- 生命周期短
- 不可变
- 频繁分配/释放

\`\`\`csharp
public readonly struct Point {
    public double X { get; }
    public double Y { get; }
    public Point(double x, double y) => (X, Y) = (x, y);
}
\`\`\``,
  },

  {
    module: 'csharp',
    file: '记录类型与不可变性.md',
    order: 109,
    title: '记录类型与不可变性',
    desc: 'C#记录类型（record）与不可变性详解。',
    content: `## 1. record 基本用法

\`\`\`csharp
public record Person(string Name, int Age);

var p1 = new Person("Alice", 30);
var p2 = new Person("Alice", 30);

p1 == p2;           // true（值相等）
p1 with { Age = 31 }; // 创建副本并修改
\`\`\`

## 2. record struct

\`\`\`csharp
public record struct Point(double X, double Y);
\`\`\`

## 3. 自定义 record

\`\`\`csharp
public record User {
    public string Name { get; init; }
    public string Email { get; init; }

    public User(string name, string email) => (Name, Email) = (name, email);
}
\`\`\`

## 4. 不可变性优势

- 线程安全
- 无副作用
- 易于推理
- 适合函数式编程

## 5. with 表达式

\`\`\`csharp
var original = new Person("Alice", 30);
var modified = original with { Age = 31 };
// original 不变，modified 是新对象
\`\`\``,
  },

  // Python
  {
    module: 'python',
    file: '装饰器进阶.md',
    order: 100,
    title: '装饰器进阶',
    desc: 'Python装饰器进阶：带参数装饰器、类装饰器、functools.wraps。',
    content: `## 1. 带参数装饰器

\`\`\`python
def retry(max_attempts=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=5, delay=2)
def fetch_data(url):
    return requests.get(url).json()
\`\`\`

## 2. 类装饰器

\`\`\`python
class Singleton:
    def __init__(self, cls):
        self._cls = cls
        self._instance = None

    def __call__(self, *args, **kwargs):
        if self._instance is None:
            self._instance = self._cls(*args, **kwargs)
        return self._instance

@Singleton
class Database:
    def __init__(self):
        self.connection = connect()
\`\`\`

## 3. functools.wraps

\`\`\`python
import functools

def log(func):
    @functools.wraps(func)  # 保留原函数的元信息
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log
def greet(name):
    """Greet someone"""
    return f"Hello, {name}"

greet.__name__   # 'greet'（而非 'wrapper'）
greet.__doc__    # 'Greet someone'
\`\`\``,
  },

  {
    module: 'python',
    file: '生成器与协程.md',
    order: 101,
    title: '生成器与协程',
    desc: 'Python生成器与协程详解：yield、yield from、async/await。',
    content: `## 1. 生成器

\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci()
next(gen)  # 0
next(gen)  # 1
next(gen)  # 1
\`\`\`

## 2. yield from

\`\`\`python
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

list(flatten([1, [2, [3, 4]], 5]))  # [1, 2, 3, 4, 5]
\`\`\`

## 3. 协程（async/await）

\`\`\`python
import asyncio

async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def main():
    results = await asyncio.gather(
        fetch_data('/api/users'),
        fetch_data('/api/posts'),
    )

asyncio.run(main())
\`\`\`

## 4. 生成器 vs 协程

| 特性 | 生成器 | 协程 |
| --- | --- | --- |
| 关键字 | yield | async/await |
| 调度 | 手动 next() | 事件循环 |
| 适用 | 惰性序列 | 异步IO |`,
  },

  {
    module: 'python',
    file: '上下文管理器.md',
    order: 102,
    title: '上下文管理器',
    desc: 'Python上下文管理器详解：__enter__、__exit__、contextlib。',
    content: `## 1. 类实现

\`\`\`python
class DatabaseConnection:
    def __init__(self, url):
        self.url = url

    def __enter__(self):
        self.conn = connect(self.url)
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        return False  # 不抑制异常

with DatabaseConnection('postgresql://...') as conn:
    conn.execute('SELECT 1')
\`\`\`

## 2. contextlib

\`\`\`python
from contextlib import contextmanager, suppress, closing

@contextmanager
def timer(name):
    start = time.perf_counter()
    yield
    elapsed = time.perf_counter() - start
    print(f"{name}: {elapsed:.3f}s")

with timer("query"):
    db.query("SELECT * FROM users")

# suppress：忽略指定异常
with suppress(FileNotFoundError):
    os.remove('temp.txt')

# closing：自动调用 close()
with closing(urllib.request.urlopen(url)) as response:
    data = response.read()
\`\`\`

## 3. 异步上下文管理器

\`\`\`python
class AsyncDB:
    async def __aenter__(self):
        self.conn = await connect()
        return self.conn

    async def __aexit__(self, *exc):
        await self.conn.close()

async with AsyncDB() as conn:
    await conn.execute('SELECT 1')
\`\`\``,
  },

  {
    module: 'python',
    file: '元类与单例模式.md',
    order: 103,
    title: '元类与单例模式',
    desc: 'Python元类与单例模式详解。',
    content: `## 1. 元类

\`\`\`python
class ValidatedMeta(type):
    def __new__(mcs, name, bases, namespace):
        # 在类创建时验证
        for key, value in namespace.items():
            if key.startswith('_'):
                continue
            if not isinstance(value, (int, str, float)):
                raise TypeError(f"{key} must be a simple type")
        return super().__new__(mcs, name, bases, namespace)

class Config(metaclass=ValidatedMeta):
    host = "localhost"
    port = 8080
    # debug = []  # TypeError!
\`\`\`

## 2. 单例模式

\`\`\`python
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=SingletonMeta):
    def __init__(self):
        self.connection = connect()
\`\`\`

## 3. __init_subclass__

\`\`\`python
class Plugin:
    registry = {}

    def __init_subclass__(cls, name=None, **kwargs):
        super().__init_subclass__(**kwargs)
        Plugin.registry[name or cls.__name__] = cls

class MySQLPlugin(Plugin, name="mysql"):
    pass
\`\`\``,
  },

  {
    module: 'python',
    file: '异步编程详解.md',
    order: 104,
    title: '异步编程详解',
    desc: 'Python异步编程详解：asyncio事件循环、Task、Future。',
    content: `## 1. 事件循环

\`\`\`python
import asyncio

async def main():
    print("Hello")

# 获取/创建事件循环
loop = asyncio.get_event_loop()
loop.run_until_complete(main())

# 或使用简化 API
asyncio.run(main())
\`\`\`

## 2. Task 与 Future

\`\`\`python
# Task：包装协程
task = asyncio.create_task(fetch_data())

# Future：低层级，表示未来结果
future = loop.create_future()
future.set_result(42)

# 等待多个任务
results = await asyncio.gather(
    fetch_users(),
    fetch_posts(),
    return_exceptions=True  # 异常作为结果返回
)
\`\`\`

## 3. 同步原语

\`\`\`python
# 锁
lock = asyncio.Lock()
async with lock:
    await critical_section()

# 信号量
sem = asyncio.Semaphore(10)
async with sem:
    await limited_operation()

# 事件
event = asyncio.Event()
await event.wait()
event.set()
\`\`\`

## 4. 超时控制

\`\`\`python
try:
    result = await asyncio.wait_for(fetch(), timeout=5.0)
except asyncio.TimeoutError:
    print("Timeout!")
\`\`\``,
  },

  {
    module: 'python',
    file: '类型注解与mypy.md',
    order: 105,
    title: '类型注解与mypy',
    desc: 'Python类型注解与mypy静态检查详解。',
    content: `## 1. 基本类型注解

\`\`\`python
def greet(name: str, age: int = 0) -> str:
    return f"Hello, {name}! You are {age}."

# 变量注解
x: int = 42
names: list[str] = ["Alice", "Bob"]
scores: dict[str, float] = {"Alice": 95.0}
\`\`\`

## 2. 高级类型

\`\`\`python
from typing import Optional, Union, Literal, Callable, TypeVar, Generic

# Optional
def find(id: int) -> Optional[User]: ...

# Union
def process(data: Union[str, bytes]) -> None: ...

# Literal
def set_mode(mode: Literal["read", "write"]) -> None: ...

# Callable
def apply(fn: Callable[[int], str], value: int) -> str: ...

# 泛型
T = TypeVar('T')
class Stack(Generic[T]):
    def push(self, item: T) -> None: ...
    def pop(self) -> T: ...
\`\`\`

## 3. mypy 使用

\`\`\`bash
pip install mypy
mypy src/
mypy src/ --strict
\`\`\`

## 4. pyproject.toml 配置

\`\`\`toml
[tool.mypy]
python_version = "3.12"
strict = true
disallow_untyped_defs = true
warn_return_any = true
\`\`\``,
  },

  {
    module: 'python',
    file: '数据类与字段默认值.md',
    order: 106,
    title: '数据类与字段默认值',
    desc: 'Python dataclass详解：字段默认值、不可变数据类。',
    content: `## 1. 基本用法

\`\`\`python
from dataclasses import dataclass, field

@dataclass
class User:
    name: str
    age: int = 0
    tags: list[str] = field(default_factory=list)

u1 = User("Alice", 30)
u2 = User("Alice", 30)
u1 == u2  # True（自动生成 __eq__）
\`\`\`

## 2. field 配置

\`\`\`python
@dataclass
class Config:
    name: str
    id: int = field(default_factory=lambda: uuid4().hex)
    internal: str = field(repr=False, compare=False)  # 不参与 repr 和比较
    _cache: dict = field(default_factory=dict, init=False)  # 不参与 __init__
\`\`\`

## 3. 不可变数据类

\`\`\`python
@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(1.0, 2.0)
p.x = 3.0  # FrozenInstanceError!
\`\`\`

## 4. 继承

\`\`\`python
@dataclass
class Animal:
    name: str

@dataclass
class Dog(Animal):
    breed: str

Dog("Rex", "Labrador")
\`\`\`

注意：有默认值的字段不能在无默认值的字段之前。`,
  },

  {
    module: 'python',
    file: '描述符.md',
    order: 107,
    title: '描述符',
    desc: 'Python描述符协议详解：__get__、__set__、__delete__。',
    content: `## 1. 描述符协议

\`\`\`python
class Validated:
    def __init__(self, validator):
        self.validator = validator

    def __set_name__(self, owner, name):
        self.name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.name, None)

    def __set__(self, obj, value):
        if not self.validator(value):
            raise ValueError(f"Invalid value: {value}")
        setattr(obj, self.name, value)

class Person:
    age = Validated(lambda x: isinstance(x, int) and 0 <= x <= 150)
    name = Validated(lambda x: isinstance(x, str) and len(x) > 0)

p = Person()
p.age = 30   # OK
p.age = -1   # ValueError!
\`\`\`

## 2. 数据描述符 vs 非数据描述符

| 类型 | 定义方法 | 优先级 |
| --- | --- | --- |
| 数据描述符 | __get__ + __set__ | 高于实例属性 |
| 非数据描述符 | 仅 __get__ | 低于实例属性 |

## 3. property 是描述符

\`\`\`python
class Circle:
    @property
    def area(self):
        return 3.14 * self.radius ** 2
\`\`\`

property 本质是数据描述符。`,
  },

  {
    module: 'python',
    file: '弱引用.md',
    order: 108,
    title: '弱引用',
    desc: 'Python弱引用详解：weakref避免循环引用。',
    content: `## 1. 基本用法

\`\`\`python
import weakref

class ExpensiveObject:
    def __init__(self, name):
        self.name = name

obj = ExpensiveObject("cache")
ref = weakref.ref(obj)

ref()  # <ExpensiveObject> — 对象仍存在
del obj
ref()  # None — 对象已被回收
\`\`\`

## 2. WeakKeyDictionary

\`\`\`python
# 键是弱引用，对象被回收时自动移除
cache = weakref.WeakKeyDictionary()

class Session:
    pass

s = Session()
cache[s] = "session_data"
del s  # cache 中对应条目自动移除
\`\`\`

## 3. WeakValueDictionary

\`\`\`python
# 值是弱引用
cache = weakref.WeakValueDictionary()

obj = ExpensiveObject("temp")
cache["key"] = obj
del obj  # cache 中对应条目自动移除
\`\`\`

## 4. 应用场景

- 缓存：自动清理不再使用的条目
- 观察者模式：不阻止被观察者被回收
- 避免循环引用导致的内存泄漏`,
  },

  {
    module: 'python',
    file: '打包与发布.md',
    order: 109,
    title: '打包与发布',
    desc: 'Python打包与发布详解：setuptools、poetry、uv。',
    content: `## 1. pyproject.toml

\`\`\`toml
[build-system]
requires = ["setuptools>=68.0"]
build-backend = "setuptools.build_meta"

[project]
name = "my-package"
version = "1.0.0"
description = "A sample package"
requires-python = ">=3.10"
dependencies = [
    "requests>=2.28",
    "pydantic>=2.0",
]

[project.optional-dependencies]
dev = ["pytest", "mypy", "ruff"]

[project.scripts]
my-cli = "my_package.cli:main"
\`\`\`

## 2. Poetry

\`\`\`bash
poetry init
poetry add requests
poetry add --group dev pytest
poetry build
poetry publish
\`\`\`

## 3. uv（极速包管理器）

\`\`\`bash
uv init my-project
uv add requests
uv add --dev pytest
uv run python main.py
uv build
uv publish
\`\`\`

## 4. 发布到 PyPI

\`\`\`bash
# 构建
python -m build

# 上传
twine upload dist/*

# 或使用 uv
uv publish
\`\`\``,
  },

  // Go
  {
    module: 'go',
    file: 'goroutine与channel通信原理.md',
    order: 100,
    title: 'goroutine与channel通信原理',
    desc: 'Go goroutine与channel通信原理详解。',
    content: `## 1. goroutine 原理

goroutine 是用户态线程，初始栈仅 2KB，可动态增长：

\`\`\`go
go func() {
    fmt.Println("Hello from goroutine")
}()
\`\`\`

### 1.1 与线程对比

| 特性 | goroutine | OS 线程 |
| --- | --- | --- |
| 初始栈 | 2KB | 1-8MB |
| 创建成本 | ~0.3μs | ~10μs |
| 切换成本 | ~0.2μs | ~1-2μs |
| 数量上限 | 百万级 | 千级 |

## 2. channel 通信

\`\`\`go
// 无缓冲 channel：同步
ch := make(chan int)

// 有缓冲 channel：异步
ch := make(chan int, 100)

// 发送
ch <- 42

// 接收
value := <-ch

// 关闭
close(ch)

// 遍历
for v := range ch {
    fmt.Println(v)
}
\`\`\`

## 3. 通信原理

### 3.1 无缓冲 channel

发送方阻塞直到接收方就绪，反之亦然。实现同步语义。

### 3.2 有缓冲 channel

缓冲区满时发送方阻塞，缓冲区空时接收方阻塞。

### 3.3 底层数据结构

\`\`\`go
type hchan struct {
    qcount   uint           // 缓冲区元素数
    dataqsiz uint           // 缓冲区大小
    buf      unsafe.Pointer // 环形缓冲区
    elemtype *_type         // 元素类型
    sendx    uint           // 发送索引
    recvx    uint           // 接收索引
    recvq    waitq          // 等待接收的 goroutine 队列
    sendq    waitq          // 等待发送的 goroutine 队列
    lock     mutex          // 互斥锁
}
\`\`\`

## 4. select 多路复用

\`\`\`go
select {
case v := <-ch1:
    fmt.Println("ch1:", v)
case v := <-ch2:
    fmt.Println("ch2:", v)
case <-time.After(5 * time.Second):
    fmt.Println("timeout")
default:
    fmt.Println("no data")
}
\`\`\``,
  },

  {
    module: 'go',
    file: 'GMP调度模型.md',
    order: 101,
    title: 'GMP调度模型',
    desc: 'Go GMP调度模型详解：G、M、P结构。',
    content: `## 1. 三个核心概念

| 概念 | 说明 |
| --- | --- |
| G (Goroutine) | 协程，用户态轻量级线程 |
| M (Machine) | 操作系统线程 |
| P (Processor) | 逻辑处理器，GOMAXPROCS 控制数量 |

## 2. 调度流程

\`\`\`
1. P 持有本地运行队列（local run queue）
2. M 绑定 P 后从本地队列取 G 执行
3. 本地队列为空时，从全局队列获取
4. 全局队列也为空时，从其他 P 偷取（work stealing）
\`\`\`

## 3. 调度时机

- \`go func()\` 创建新 G
- 系统调用（M 阻塞时释放 P）
- channel 操作阻塞
- time.Sleep
- runtime.Gosched() 主动让出
- 函数调用时栈检查点

## 4. GOMAXPROCS

\`\`\`go
// 设置 P 的数量（默认等于 CPU 核数）
runtime.GOMAXPROCS(4)
\`\`\`

## 5. work stealing

当 P 的本地队列为空时：
1. 从全局队列获取
2. 从 netpoller 获取
3. 从其他 P 的本地队列偷取一半`,
  },

  {
    module: 'go',
    file: '并发模式.md',
    order: 102,
    title: '并发模式',
    desc: 'Go并发模式详解：工作池、扇出扇入、管道。',
    content: `## 1. 工作池

\`\`\`go
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- process(j)
    }
}

jobs := make(chan int, 100)
results := make(chan int, 100)

for w := 1; w <= 3; w++ {
    go worker(w, jobs, results)
}

for j := 1; j <= 9; j++ {
    jobs <- j
}
close(jobs)
\`\`\`

## 2. 扇出扇入

\`\`\`go
// 扇出：多个 goroutine 处理同一输入
ch1 := fanOut(input)
ch2 := fanOut(input)
ch3 := fanOut(input)

// 扇入：合并多个 channel
merged := fanIn(ch1, ch2, ch3)

func fanIn(channels ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            for v := range c { out <- v }
            wg.Done()
        }(ch)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}
\`\`\`

## 3. 管道

\`\`\`go
func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums { out <- n }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in { out <- n * n }
        close(out)
    }()
    return out
}

// 管道组合
ch := square(square(generate(2, 3, 4)))
for v := range ch {
    fmt.Println(v) // 16, 81, 256
}
\`\`\``,
  },

  {
    module: 'go',
    file: '反射实现通用函数.md',
    order: 103,
    title: '反射实现通用函数',
    desc: 'Go反射实现通用函数详解：reflect包。',
    content: `## 1. 基本反射

\`\`\`go
import "reflect"

t := reflect.TypeOf(42)        // int
v := reflect.ValueOf("hello")  // "hello"

v.Kind()   // String
v.Type()   // string
v.String() // "hello"
\`\`\`

## 2. 结构体反射

\`\`\`go
type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

u := User{"Alice", 30}
t := reflect.TypeOf(u)

for i := 0; i < t.NumField(); i++ {
    field := t.Field(i)
    fmt.Println(field.Name, field.Type, field.Tag.Get("json"))
}
\`\`\`

## 3. 通用函数示例

\`\`\`go
func Map(slice any, fn any) any {
    sv := reflect.ValueOf(slice)
    fv := reflect.ValueOf(fn)

    result := reflect.MakeSlice(reflect.SliceOf(fv.Type().Out(0)), 0, sv.Len())

    for i := 0; i < sv.Len(); i++ {
        out := fv.Call([]reflect.Value{sv.Index(i)})
        result = reflect.Append(result, out[0])
    }

    return result.Interface()
}

doubled := Map([]int{1, 2, 3}, func(x int) int { return x * 2 })
// []int{2, 4, 6}
\`\`\`

> ⚠️ 反射性能较差，Go 1.18+ 推荐使用泛型替代。`,
  },

  {
    module: 'go',
    file: '内存逃逸分析.md',
    order: 104,
    title: '内存逃逸分析',
    desc: 'Go内存逃逸分析详解：go build -gcflags="-m"。',
    content: `## 1. 逃逸分析

编译器决定变量分配在栈还是堆：

- **栈分配**：函数返回后自动回收，零成本
- **堆分配**：需要 GC 回收，有额外开销

\`\`\`bash
go build -gcflags="-m" main.go
\`\`\`

## 2. 常见逃逸场景

### 2.1 返回局部变量指针

\`\`\`go
func newInt() *int {
    x := 42
    return &x  // x 逃逸到堆
}
\`\`\`

### 2.2 interface 类型

\`\`\`go
func print(v interface{}) {
    fmt.Println(v)  // v 逃逸
}
\`\`\`

### 2.3 闭包捕获

\`\`\`go
func counter() func() int {
    x := 0
    return func() int {
        x++  // x 逃逸
        return x
    }
}
\`\`\`

### 2.4 切片扩容

\`\`\`go
func grow() []int {
    s := make([]int, 0)
    for i := 0; i < 1000; i++ {
        s = append(s, i)  // 可能多次扩容，逃逸
    }
    return s
}
\`\`\`

## 3. 优化建议

- 避免返回局部变量指针
- 使用值类型而非指针（小对象）
- 预分配切片大小
- 使用 sync.Pool 复用对象`,
  },

  {
    module: 'go',
    file: '垃圾回收与GC调优.md',
    order: 105,
    title: '垃圾回收与GC调优',
    desc: 'Go垃圾回收与GC调优详解：并发标记清除。',
    content: `## 1. GC 算法

Go 使用**并发三色标记清除**算法：

- 三色标记：白（待回收）、灰（待扫描）、黑（存活）
- 并发执行：GC 与用户代码并发运行
- 写屏障：保证并发标记的正确性

## 2. GC 调优参数

\`\`\`bash
# GOGC：堆增长比例（默认 100）
# 堆大小达到上次 GC 后存活大小的 2 倍时触发 GC
GOGC=200 ./myapp

# GOMEMLIMIT：内存上限
GOMEMLIMIT=1GiB ./myapp
\`\`\`

## 3. GC 调优策略

### 3.1 减少 GC 压力

- 减少堆分配（使用栈分配）
- 对象复用（sync.Pool）
- 预分配容器大小

### 3.2 GOGC 调整

\`\`\`
GOGC=100  → 堆翻倍时 GC（默认，平衡吞吐和延迟）
GOGC=200  → 堆 3 倍时 GC（减少 GC 频率，增加吞吐）
GOGC=50   → 堆 1.5 倍时 GC（增加 GC 频率，减少延迟）
\`\`\`

## 4. GC 监控

\`\`\`go
var stats debug.GCStats
debug.ReadGCStats(&stats)
fmt.Printf("GC pauses: %v\\n", stats.PauseTotal)
\`\`\`

\`\`\`bash
GODEBUG=gctrace=1 ./myapp
\`\`\``,
  },

  {
    module: 'go',
    file: '泛型详解.md',
    order: 106,
    title: '泛型详解',
    desc: 'Go泛型详解：类型参数、约束、comparable。',
    content: `## 1. 类型参数

\`\`\`go
func Map[T any, U any](s []T, f func(T) U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}

doubled := Map([]int{1, 2, 3}, func(x int) int { return x * 2 })
\`\`\`

## 2. 约束

\`\`\`go
type Number interface {
    int | int8 | int16 | int32 | int64 |
    float32 | float64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}
\`\`\`

## 3. comparable

\`\`\`go
func Contains[T comparable](slice []T, target T) bool {
    for _, v := range slice {
        if v == target {
            return true
        }
    }
    return false
}
\`\`\`

## 4. 泛型类型

\`\`\`go
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    top := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return top, true
}
\`\`\``,
  },

  {
    module: 'go',
    file: '单元测试与基准测试.md',
    order: 107,
    title: '单元测试与基准测试',
    desc: 'Go单元测试与基准测试详解：go test -bench。',
    content: `## 1. 单元测试

\`\`\`go
// user_test.go
func TestUserCreation(t *testing.T) {
    u := NewUser("Alice", 30)
    if u.Name != "Alice" {
        t.Errorf("expected Alice, got %s", u.Name)
    }
}

// 表驱动测试
func TestAdd(t *testing.T) {
    tests := []struct {
        a, b, expected int
    }{
        {1, 2, 3},
        {0, 0, 0},
        {-1, 1, 0},
    }
    for _, tt := range tests {
        if got := Add(tt.a, tt.b); got != tt.expected {
            t.Errorf("Add(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.expected)
        }
    }
}
\`\`\`

## 2. 基准测试

\`\`\`go
func BenchmarkSort(b *testing.B) {
    data := make([]int, 10000)
    for i := range data { data[i] = rand.Int() }

    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        sort.Ints(data)
    }
}
\`\`\`

运行：

\`\`\`bash
go test -bench=. -benchmem
# BenchmarkSort-8    5000    320 ns/op    0 B/op    0 allocs/op
\`\`\`

## 3. 子测试

\`\`\`go
func TestParallel(t *testing.T) {
    t.Run("case1", func(t *testing.T) {
        t.Parallel()
        // ...
    })
}
\`\`\`

## 4. 覆盖率

\`\`\`bash
go test -coverprofile=coverage.out
go tool cover -html=coverage.out
\`\`\``,
  },

  {
    module: 'go',
    file: '竞态检测与原子操作.md',
    order: 108,
    title: '竞态检测与原子操作',
    desc: 'Go竞态检测与原子操作详解：-race、atomic。',
    content: `## 1. 竞态检测

\`\`\`bash
go test -race ./...
go build -race -o myapp .
\`\`\`

示例检测：

\`\`\`go
var counter int

// ❌ 数据竞争
go func() { counter++ }()
counter++

// ✅ 使用原子操作
var counter int64
go func() { atomic.AddInt64(&counter, 1) }()
atomic.AddInt64(&counter, 1)
\`\`\`

## 2. atomic 操作

\`\`\`go
var value int64

// 加载
v := atomic.LoadInt64(&value)

// 存储
atomic.StoreInt64(&value, 42)

// 加减
atomic.AddInt64(&value, 1)

// 比较并交换
atomic.CompareAndSwapInt64(&value, 0, 1)

// 交换
old := atomic.SwapInt64(&value, 100)
\`\`\`

## 3. atomic.Value

\`\`\`go
var config atomic.Value

config.Store(Config{Timeout: 30})
c := config.Load().(Config)
\`\`\`

## 4. 性能对比

\`\`\`
Mutex:     ~20ns/op
atomic:    ~5ns/op
无同步:     ~1ns/op（但不安全）
\`\`\`

原子操作比互斥锁快 4-5 倍，但只适用于简单场景。`,
  },

  {
    module: 'go',
    file: '包管理详解.md',
    order: 109,
    title: '包管理详解',
    desc: 'Go包管理详解：go mod replace、vendor。',
    content: `## 1. go mod 基本操作

\`\`\`bash
go mod init github.com/user/project
go mod tidy          # 整理依赖
go mod download      # 下载依赖
go mod verify        # 验证依赖
go mod graph         # 查看依赖图
\`\`\`

## 2. replace 指令

\`\`\`go
// go.mod
module github.com/user/project

// 替换为本地路径（开发调试）
replace github.com/user/lib => ../lib

// 替换为特定版本
replace github.com/broken/pkg => github.com/fixed/pkg v1.2.3
\`\`\`

## 3. vendor 模式

\`\`\`bash
# 创建 vendor 目录
go mod vendor

# 使用 vendor 构建
go build -mod=vendor ./...

# vendor 目录包含所有依赖的副本
# 适合离线构建和可重现构建
\`\`\`

## 4. 版本选择规则

Go 使用**最小版本选择**（Minimal Version Selection）：

- 选择满足所有约束的最低版本
- 不自动升级到更高版本
- 确保可重现构建

## 5. 私有模块

\`\`\`bash
# .gitconfig
[url "git@github.com:"]
    insteadOf = https://github.com/

# 或设置 GOPRIVATE
export GOPRIVATE=github.com/my-org/*
\`\`\``,
  },

  // Lua
  {
    module: 'lua',
    file: '元表与元方法详解.md',
    order: 100,
    title: '元表与元方法详解',
    desc: 'Lua元表与元方法详解：__index、__newindex、__call、__tostring。',
    content: `## 1. 元表基础

\`\`\`lua
local t = {}
local mt = {
    __index = function(table, key)
        return "default:" .. key
    end
}
setmetatable(t, mt)

print(t.hello)  -- "default:hello"
\`\`\`

## 2. 常用元方法

| 元方法 | 触发时机 |
| --- | --- |
| __index | 访问不存在的键 |
| __newindex | 设置不存在的键 |
| __call | 将表当作函数调用 |
| __tostring | tostring() 转换 |
| __add | + 运算 |
| __sub | - 运算 |
| __mul | * 运算 |
| __eq | == 运算 |
| __lt | < 运算 |
| __len | # 运算 |
| __pairs | pairs() 迭代 |

## 3. __index 实现继承

\`\`\`lua
local Animal = { speak = function(self) return "..." end }

local Dog = setmetatable({}, { __index = Animal })
Dog.speak = function(self) return "Woof!" end

local d = setmetatable({}, { __index = Dog })
print(d:speak())  -- "Woof!"
\`\`\`

## 4. __call

\`\`\`lua
local counter = setmetatable({ count = 0 }, {
    __call = function(self, increment)
        self.count = self.count + (increment or 1)
        return self.count
    end
})

counter(1)    -- 1
counter(5)    -- 6
\`\`\`

## 5. __tostring

\`\`\`lua
local person = setmetatable({ name = "Alice", age = 30 }, {
    __tostring = function(self)
        return string.format("%s (%d)", self.name, self.age)
    end
})

print(person)  -- "Alice (30)"
\`\`\``,
  },

  {
    module: 'lua',
    file: '协程非抢占式调度.md',
    order: 101,
    title: '协程非抢占式调度',
    desc: 'Lua协程非抢占式调度详解。',
    content: `## 1. 协程基础

\`\`\`lua
local co = coroutine.create(function()
    print("step 1")
    coroutine.yield()
    print("step 2")
end)

coroutine.resume(co)  -- step 1
coroutine.resume(co)  -- step 2
\`\`\`

## 2. 非抢占式调度

Lua 协程是**协作式多任务**，必须显式 yield 才能切换：

\`\`\`lua
-- ❌ 死循环，其他协程无法运行
local co = coroutine.create(function()
    while true do
        -- 没有 yield，永远不释放控制权
    end
end)

-- ✅ 定期 yield
local co = coroutine.create(function()
    for i = 1, 1000000 do
        process(i)
        if i % 1000 == 0 then
            coroutine.yield()  -- 每 1000 次让出
        end
    end
end)
\`\`\`

## 3. 协程状态

| 状态 | 说明 |
| --- | --- |
| suspended | 挂起（初始或 yield 后） |
| running | 运行中 |
| normal | 恢复了其他协程 |
| dead | 执行完毕 |

## 4. 生产者-消费者

\`\`\`lua
function producer()
    return coroutine.create(function()
        while true do
            local value = io.read()
            coroutine.yield(value)
        end
    end)
end

function consumer(prod)
    while true do
        local _, value = coroutine.resume(prod)
        if not value then break end
        print("Consumed:", value)
    end
end
\`\`\``,
  },

  {
    module: 'lua',
    file: '弱表.md',
    order: 102,
    title: '弱表',
    desc: 'Lua弱表详解：weak table自动回收。',
    content: `## 1. 弱表模式

\`\`\`lua
-- 键弱引用
local wk = setmetatable({}, { __mode = "k" })

-- 值弱引用
local wv = setmetatable({}, { __mode = "v" })

-- 键和值都弱引用
local wkv = setmetatable({}, { __mode = "kv" })
\`\`\`

## 2. 自动回收

\`\`\`lua
local cache = setmetatable({}, { __mode = "v" })

local key = "user:1"
cache[key] = { name = "Alice", data = hugeData }

-- 当 hugeData 不再被其他引用持有时
-- GC 会自动回收 cache[key] 的值
\`\`\`

## 3. 应用场景

- 缓存：自动清理不再使用的条目
- 对象属性表：不阻止对象被回收
- 记忆化：缓存函数计算结果`,
  },

  {
    module: 'lua',
    file: '环境与全局变量管理.md',
    order: 103,
    title: '环境与全局变量管理',
    desc: 'Lua环境与全局变量管理详解：_ENV。',
    content: `## 1. _ENV

Lua 5.2+ 使用 \`_ENV\` 替代 \`setfenv\`：

\`\`\`lua
-- 沙盒环境
local sandbox = {
    print = print,
    math = math,
    string = string,
}

local code = "print(math.sqrt(16))"
local fn = load("local _ENV = ...; " .. code)
fn(sandbox)  -- 4
\`\`\`

## 2. 全局变量保护

\`\`\`lua
-- 检测未定义的全局变量
setmetatable(_G, {
    __newindex = function(t, k, v)
        if type(v) == "nil" then
            error("Attempt to set nil to global: " .. k)
        end
        rawset(t, k, v)
    end,
    __index = function(t, k)
        error("Attempt to access undefined global: " .. k)
    end
})
\`\`\``,
  },

  {
    module: 'lua',
    file: 'C-API栈操作.md',
    order: 104,
    title: 'C-API栈操作',
    desc: 'Lua C-API栈操作详解：lua_State、lua_push、lua_to。',
    content: `## 1. 虚拟栈

Lua 与 C 通过虚拟栈交互：

\`\`\`c
lua_State *L = luaL_newstate();

// 压栈
lua_pushstring(L, "hello");
lua_pushnumber(L, 42);
lua_pushboolean(L, 1);

// 栈: "hello" | 42 | true
// 索引:   1    |  2 |   3  (正索引，从底到顶)
// 索引:  -3    | -2 |  -1  (负索引，从顶到底)

// 读取
const char *s = lua_tostring(L, 1);  // "hello"
double n = lua_tonumber(L, 2);       // 42
int b = lua_toboolean(L, 3);         // 1

// 栈顶索引
int top = lua_gettop(L);  // 3
\`\`\`

## 2. 常用栈操作

\`\`\`c
lua_pushnil(L);
lua_pushinteger(L, 100);
lua_pushvalue(L, 1);     // 复制索引1的值到栈顶
lua_remove(L, 2);        // 移除索引2
lua_insert(L, 1);        // 栈顶插入到索引1
lua_replace(L, 1);       // 栈顶替换索引1
lua_pop(L, 2);           // 弹出2个元素
\`\`\`

## 3. 类型检查

\`\`\`c
lua_isstring(L, idx);
lua_isnumber(L, idx);
lua_istable(L, idx);
lua_isfunction(L, idx);
lua_type(L, idx);  // LUA_TSTRING, LUA_TNUMBER, ...
\`\`\``,
  },

  {
    module: 'lua',
    file: '用户数据.md',
    order: 105,
    title: '用户数据',
    desc: 'Lua用户数据详解：userdata扩展C类型。',
    content: `## 1. 轻量用户数据

\`\`\`c
// 存储指针，无元表
void *ptr = some_pointer;
lua_pushlightuserdata(L, ptr);
\`\`\`

## 2. 完整用户数据

\`\`\`c
typedef struct {
    double x, y;
} Point;

// 创建
Point *p = (Point *)lua_newuserdata(L, sizeof(Point));
p->x = 1.0;
p->y = 2.0;

// 设置元表
luaL_getmetatable(L, "Point");
lua_setmetatable(L, -2);
\`\`\`

## 3. 注册元表

\`\`\`c
static int point_getx(lua_State *L) {
    Point *p = (Point *)luaL_checkudata(L, 1, "Point");
    lua_pushnumber(L, p->x);
    return 1;
}

static const luaL_Reg point_methods[] = {
    {"getx", point_getx},
    {NULL, NULL}
};

// 注册
luaL_newmetatable(L, "Point");
luaL_setfuncs(L, point_methods, 0);
lua_setfield(L, -2, "__index");
\`\`\``,
  },

  {
    module: 'lua',
    file: '模块加载.md',
    order: 106,
    title: '模块加载',
    desc: 'Lua模块加载详解：require搜索路径、自定义加载器。',
    content: `## 1. require 机制

\`\`\`lua
local json = require("cjson")
\`\`\`

搜索顺序：
1. \`package.loaded\` 缓存
2. \`package.preload\` 预加载器
3. \`package.searchers\` 搜索器

## 2. 搜索路径

\`\`\`lua
-- 查看当前路径
print(package.path)   -- Lua 文件搜索路径
print(package.cpath)  -- C 库搜索路径

-- 修改搜索路径
package.path = package.path .. ";./?.lua;./lib/?.lua"
\`\`\`

路径模板：
- \`?\` 替换为模块名
- \`/usr/local/share/lua/5.4/?.lua\`
- \`/usr/local/lib/lua/5.4/?.so\`

## 3. 自定义加载器

\`\`\`lua
table.insert(package.searchers, function(name)
    if name == "virtual" then
        return function()
            return { hello = function() print("virtual module") end }
        end
    end
end)

local v = require("virtual")
v.hello()  -- "virtual module"
\`\`\`

## 4. 模块编写

\`\`\`lua
-- mymodule.lua
local M = {}

function M.greet(name)
    return "Hello, " .. name
end

return M
\`\`\``,
  },

  // HarmonyOS
  {
    module: 'harmonyos',
    file: 'Stage模型与FA模型区别.md',
    order: 100,
    title: 'Stage模型与FA模型区别',
    desc: 'HarmonyOS Stage模型与FA模型对比详解。',
    content: `## 1. 两种模型对比

| 特性 | FA 模型 | Stage 模型 |
| --- | --- | --- |
| 推荐度 | 旧版（不推荐） | 新版（推荐） |
| 开发语言 | JS/Java | ArkTS |
| UI 框架 | JS UI | ArkUI |
| 应用模型 | Ability | UIAbility/ExtensionAbility |
| 生命周期 | Page 生命周期 | UIAbility 生命周期 |
| 窗口管理 | 独立窗口 | 窗口复用 |
| 多实例 | 不支持 | 支持 |
| 跨设备 | 有限 | 原生支持 |

## 2. Stage 模型核心概念

### 2.1 UIAbility

\`\`\`typescript
@Entry
@Component
struct Index {
  build() {
    Column() {
      Text('Hello HarmonyOS')
    }
  }
}
\`\`\`

### 2.2 ExtensionAbility

- ServiceExtension：后台服务
- FormExtension：卡片
- ShareExtension：分享

## 3. 迁移建议

- 新项目直接使用 Stage 模型
- FA 模型项目逐步迁移
- HarmonyOS 4.0+ 推荐 Stage 模型`,
  },

  {
    module: 'harmonyos',
    file: 'ArkTS与TypeScript差异.md',
    order: 101,
    title: 'ArkTS与TypeScript差异',
    desc: 'HarmonyOS ArkTS与TypeScript差异详解。',
    content: `## 1. ArkTS 约束

ArkTS 基于 TypeScript，但增加了以下约束：

### 1.1 禁止使用 any

\`\`\`typescript
// ❌ 不允许
let x: any = 42;

// ✅ 使用具体类型
let x: number = 42;
\`\`\`

### 1.2 禁止运行时类型改变

\`\`\`typescript
// ❌ 不允许
let x: number | string = 42;
x = "hello";  // 运行时类型改变

// ✅ 使用联合类型但保持类型不变
let x: number = 42;
\`\`\`

### 1.3 禁止使用 eval

\`\`\`typescript
// ❌ 不允许
eval("console.log('hello')");

// ✅ 使用正常代码
console.log('hello');
\`\`\`

## 2. ArkTS 扩展

### 2.1 装饰器

\`\`\`typescript
@Component
@Entry
struct MyComponent {
  @State message: string = 'Hello'
  @Prop title: string = ''

  build() {
    Text(this.message)
  }
}
\`\`\`

### 2.2 声明式 UI

\`\`\`typescript
build() {
  Column() {
    Text('Title')
      .fontSize(24)
      .fontWeight(FontWeight.Bold)

    Button('Click')
      .onClick(() => { this.count++ })
  }
}
\`\`\`

## 3. 性能优化

ArkTS 通过 AOT 编译和静态类型约束，实现比标准 TypeScript 更好的运行时性能。`,
  },

  {
    module: 'harmonyos',
    file: 'ArkUI声明式语法.md',
    order: 102,
    title: 'ArkUI声明式语法',
    desc: 'HarmonyOS ArkUI声明式语法详解：@Component、@Entry、@State、@Prop、@Link。',
    content: `## 1. 核心装饰器

| 装饰器 | 说明 |
| --- | --- |
| @Component | 声明自定义组件 |
| @Entry | 标记页面入口 |
| @State | 组件内状态（可变） |
| @Prop | 父组件单向传递 |
| @Link | 父子双向绑定 |
| @Provide | 跨层级提供数据 |
| @Consume | 跨层级消费数据 |
| @Watch | 监听状态变化 |
| @Builder | 轻量 UI 复用 |

## 2. @State

\`\`\`typescript
@Entry
@Component
struct Counter {
  @State count: number = 0

  build() {
    Column() {
      Text(\`Count: \${this.count}\`)
      Button('+1')
        .onClick(() => this.count++)
    }
  }
}
\`\`\`

## 3. @Prop 和 @Link

\`\`\`typescript
// 父组件
@Entry
@Component
struct Parent {
  @State value: number = 0

  build() {
    Column() {
      Child({ count: this.value })       // @Prop 单向
      ChildLink({ count: $value })       // @Link 双向
    }
  }
}

// 子组件 - @Prop
@Component
struct Child {
  @Prop count: number  // 只读，父组件变化时更新

  build() { Text(\`\${this.count}\`) }
}

// 子组件 - @Link
@Component
struct ChildLink {
  @Link count: number  // 可修改，双向同步

  build() {
    Button('+1').onClick(() => this.count++)
  }
}
\`\`\`

## 4. @Builder

\`\`\`typescript
@Builder function ItemView(text: string) {
  Row() {
    Text(text).fontSize(16)
  }.padding(10)
}

// 使用
build() {
  Column() {
    ItemView('Item 1')
    ItemView('Item 2')
  }
}
\`\`\``,
  },

  {
    module: 'harmonyos',
    file: '组件生命周期详解.md',
    order: 103,
    title: '组件生命周期详解',
    desc: 'HarmonyOS组件生命周期详解：aboutToAppear、aboutToDisappear。',
    content: `## 1. 生命周期回调

\`\`\`typescript
@Component
struct MyComponent {
  aboutToAppear() {
    console.log('组件即将出现')
    // 初始化数据
  }

  aboutToDisappear() {
    console.log('组件即将消失')
    // 清理资源
  }

  onBackPress(): boolean {
    console.log('返回键按下')
    return true  // true 拦截返回
  }

  build() {
    Text('Hello')
  }
}
\`\`\`

## 2. 生命周期顺序

\`\`\`
组件创建 → aboutToAppear → build() → 组件显示
                                         ↓
组件销毁 ← aboutToDisappear ← 组件隐藏
\`\`\`

## 3. UIAbility 生命周期

| 回调 | 说明 |
| --- | --- |
| onCreate | Ability 创建 |
| onWindowStageCreate | 窗口创建 |
| onForeground | 前台 |
| onBackground | 后台 |
| onWindowStageDestroy | 窗口销毁 |
| onDestroy | Ability 销毁 |

## 4. KeepAlive 组件

\`\`\`typescript
// 使用 if 控制显示/隐藏而非销毁/重建
@State show: boolean = true

build() {
  if (this.show) {
    MyComponent()  // 创建
  }
  // show 变为 false 时触发 aboutToDisappear
}
\`\`\``,
  },

  {
    module: 'harmonyos',
    file: '路由跳转与路由栈.md',
    order: 104,
    title: '路由跳转与路由栈',
    desc: 'HarmonyOS路由跳转与路由栈详解：router.pushUrl、replaceUrl。',
    content: `## 1. 页面跳转

\`\`\`typescript
import router from '@ohos.router'

// 压栈跳转（可返回）
router.pushUrl({
  url: 'pages/Detail',
  params: { id: 123 }
})

// 替换跳转（不可返回）
router.replaceUrl({
  url: 'pages/Login'
})

// 返回
router.back()
router.back({ url: 'pages/Index' })  // 返回到指定页面
\`\`\`

## 2. 路由栈

\`\`\`
pushUrl:  [A] → [A, B] → [A, B, C]
replaceUrl: [A, B] → [A, C]
back: [A, B, C] → [A, B]
\`\`\`

## 3. 获取参数

\`\`\`typescript
@Entry
@Component
struct Detail {
  params: any = router.getParams()

  build() {
    Text(\`ID: \${this.params?.id}\`)
  }
}
\`\`\`

## 4. 路由模式

\`\`\`typescript
router.pushUrl({
  url: 'pages/Detail'
}, router.RouterMode.Standard)  // 标准模式（默认）

router.pushUrl({
  url: 'pages/Detail'
}, router.RouterMode.Single)   // 单例模式（栈中已存在则移到栈顶）
\`\`\``,
  },

  {
    module: 'harmonyos',
    file: '权限申请.md',
    order: 105,
    title: '权限申请',
    desc: 'HarmonyOS权限申请详解：requestPermissionsFromUser。',
    content: `## 1. 声明权限

\`\`\`json
// module.json5
{
  "requestPermissions": [
    {
      "name": "ohos.permission.INTERNET"
    },
    {
      "name": "ohos.permission.CAMERA",
      "reason": "$string:camera_reason",
      "usedScene": {
        "abilities": ["EntryAbility"],
        "when": "inuse"
      }
    }
  ]
}
\`\`\`

## 2. 运行时申请

\`\`\`typescript
import abilityAccessCtrl from '@ohos.abilityAccessCtrl'

async function requestCameraPermission() {
  const atManager = abilityAccessCtrl.createAtManager()

  try {
    const result = await atManager.requestPermissionsFromUser(
      getContext(this),
      ['ohos.permission.CAMERA']
    )

    if (result.authResults[0] === 0) {
      console.log('权限已授予')
    } else {
      console.log('权限被拒绝')
    }
  } catch (err) {
    console.error('申请权限失败:', err)
  }
}
\`\`\`

## 3. 权限类型

| 类型 | 示例 | 授权方式 |
| --- | --- | --- |
| normal | INTERNET | 安装时自动授予 |
| system_basic | CAMERA | 运行时弹窗 |
| system_core | MANAGE_USERS | 仅系统应用 |`,
  },

  {
    module: 'harmonyos',
    file: '分布式数据管理.md',
    order: 106,
    title: '分布式数据管理',
    desc: 'HarmonyOS分布式数据管理详解：分布式数据库、分布式文件。',
    content: `## 1. 分布式数据库

\`\`\`typescript
import distributedKVStore from '@ohos.data.distributedKVStore'

// 创建 KV 管理
const kvManager = distributedKVStore.createKVManager({
  bundleName: 'com.example.app'
})

// 创建 KV 数据库
const kvStore = await kvManager.getKVStore('storeId', {
  securityLevel: distributedKVStore.SecurityLevel.S1
})

// 写入数据
await kvStore.put('key1', 'value1')

// 读取数据
const value = await kvStore.get('key1')

// 订阅数据变更
kvStore.on('dataChange', distributedKVStore.SubscribeType.SUBSCRIBE_TYPE_ALL, (data) => {
  console.log('Data changed:', data)
})
\`\`\`

## 2. 分布式文件

\`\`\`typescript
import fileIO from '@ohos.file.fs'

// 获取分布式文件路径
const context = getContext(this)
const dir = context.distributedFilesDir

// 写入文件
const file = fileIO.openSync(dir + '/shared.txt', fileIO.OpenMode.READ_WRITE | fileIO.OpenMode.CREATE)
fileIO.writeSync(file.fd, 'Hello from device A')
fileIO.closeSync(file)
\`\`\`

## 3. 数据同步

- 自动同步：同一账号下的设备自动同步
- 手动同步：\`kvStore.sync()\`
- 冲突解决：Last Write Wins（默认）`,
  },

  {
    module: 'harmonyos',
    file: '跨设备调用.md',
    order: 107,
    title: '跨设备调用',
    desc: 'HarmonyOS跨设备调用详解：分布式调度、跨设备启动Ability。',
    content: `## 1. 设备发现

\`\`\`typescript
import deviceManager from '@ohos.distributedDeviceManager'

const dmInstance = deviceManager.createDeviceManager('com.example.app')

// 发现设备
dmInstance.on('deviceFound', (device) => {
  console.log('Found device:', device.deviceName, device.deviceId)
})

dmInstance.startDiscovering()
\`\`\`

## 2. 跨设备启动 Ability

\`\`\`typescript
import Want from '@ohos.app.ability.Want'

const want: Want = {
  deviceId: targetDeviceId,  // 目标设备 ID
  bundleName: 'com.example.app',
  abilityName: 'RemoteAbility'
}

this.context.startAbility(want)
\`\`\`

## 3. 分布式任务迁移

\`\`\`typescript
// 迁移到目标设备
this.context.continueAbility('com.example.app', targetDeviceId)

// 接收迁移数据
onContinue(wantParam) {
  return { data: this.currentState }
}

// 恢复迁移数据
onRestoreData(wantParam) {
  this.currentState = wantParam.data
}
\`\`\``,
  },

  {
    module: 'harmonyos',
    file: '元服务开发与发布.md',
    order: 108,
    title: '元服务开发与发布',
    desc: 'HarmonyOS元服务开发与发布详解：Atomic Service。',
    content: `## 1. 元服务概述

元服务（Atomic Service）是 HarmonyOS 的免安装轻量应用：

| 特性 | 元服务 | 传统应用 |
| --- | --- | --- |
| 安装 | 免安装 | 需安装 |
| 体积 | < 10MB | 无限制 |
| 入口 | 服务卡片、扫码 | 桌面图标 |
| 更新 | 即时 | 需更新 |

## 2. 开发步骤

### 2.1 创建项目

在 DevEco Studio 中选择 "Atomic Service" 模板。

### 2.2 卡片开发

\`\`\`typescript
@Entry
@Component
struct WidgetCard {
  build() {
    Column() {
      Text('天气')
        .fontSize(16)
      Text('25°C')
        .fontSize(32)
        .fontWeight(FontWeight.Bold)
    }
    .width('100%')
    .height('100%')
  }
}
\`\`\`

### 2.3 卡片配置

\`\`\`json
{
  "name": "WeatherWidget",
  "displayName": "天气卡片",
  "description": "显示当前天气",
  "src": "./ets/widget/pages/WeatherCard.ets",
  "uiSyntax": "arkts",
  "window": {
    "designDimension": "720"
  },
  "formConfigAbility": "com.example.app.WeatherFormAbility"
}
\`\`\`

## 3. 发布流程

1. 在 AppGallery Connect 注册应用
2. 配置签名证书
3. 构建发布包
4. 提交审核
5. 审核通过后上架`,
  },

  {
    module: 'harmonyos',
    file: 'DevEco-Studio调试器.md',
    order: 109,
    title: 'DevEco-Studio调试器',
    desc: 'HarmonyOS DevEco Studio调试器详解：断点、变量查看、性能分析。',
    content: `## 1. 断点调试

### 1.1 设置断点

- 在代码行号旁点击设置断点
- 条件断点：右键断点 → Condition
- 日志断点：右键断点 → Log

### 1.2 调试操作

| 操作 | 快捷键 | 说明 |
| --- | --- | --- |
| Step Over | F8 | 单步跳过 |
| Step Into | F7 | 单步进入 |
| Step Out | Shift+F8 | 跳出函数 |
| Resume | F9 | 继续运行 |
| Stop | Ctrl+F2 | 停止调试 |

## 2. 变量查看

- **Variables 面板**：查看当前作用域变量
- **Watches 面板**：添加自定义表达式
- **Evaluate Expression**：Ctrl+F8 执行表达式

## 3. 性能分析

### 3.1 CPU Profiler

\`\`\`
Run → Profile → 选择设备 → CPU
\`\`\`

查看函数调用耗时、火焰图。

### 3.2 Memory Profiler

\`\`\`
Run → Profile → 选择设备 → Memory
\`\`\`

查看内存分配、对象数量、GC 事件。

### 3.3 HiTrace

\`\`\`typescript
import hiTraceMeter from '@ohos.hiTraceMeter'

hiTraceMeter.startTrace('myTask', 1)
// ... 执行任务
hiTraceMeter.finishTrace('myTask', 1)
\`\`\`

## 4. 日志

\`\`\`typescript
import hilog from '@ohos.hilog'

hilog.info(0x0001, 'MyTag', 'Info message')
hilog.warn(0x0001, 'MyTag', 'Warning message')
hilog.error(0x0001, 'MyTag', 'Error message')
\`\`\`

在 DevEco Studio 的 Log 面板中查看。`,
  },
];

for (const f of files) {
  const dir = join(BASE, f.module);
  mkdirSync(dir, { recursive: true });
  const content = `---\norder: ${f.order}\ntitle: '${f.title}'\nmodule: '${f.module}'\ncategory: 'dev-lang'\ndifficulty: 'advanced'\ndescription: '${f.desc}'\nauthor: 'fanquanpp'\nupdated: 2026-06-14\n---\n\n${f.content}`;
  writeFileSync(join(dir, f.file), content, 'utf-8');
  console.log(`Created: ${f.module}/${f.file}`);
}
