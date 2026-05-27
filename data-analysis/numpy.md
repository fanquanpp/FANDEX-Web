# NumPy 数组操作、线性代数与随机数

> @Version: v4.0.0
> @Author: fanquanpp
> @Category: Data Science / NumPy
> @Description: NumPy 核心用法：多维数组操作、广播机制、线性代数运算与随机数生成

---

## 目录

- [1. NumPy 简介](#1-numpy-简介)
- [2. ndarray 创建与属性](#2-ndarray-创建与属性)
- [3. 索引与切片](#3-索引与切片)
- [4. 数组形状操作](#4-数组形状操作)
- [5. 广播机制](#5-广播机制)
- [6. 通用函数（ufunc）](#6-通用函数ufunc)
- [7. 聚合与统计运算](#7-聚合与统计运算)
- [8. 线性代数](#8-线性代数)
- [9. 随机数生成](#9-随机数生成)
- [10. 性能优化技巧](#10-性能优化技巧)
- [11. 延伸阅读](#11-延伸阅读)

---

## 1. NumPy 简介

本节介绍 NumPy 在 Python 数据分析中的基础地位，解释其与原生 Python 列表在性能和功能上的差异，以及它作为 Pandas、SciPy 等库底层依赖的重要性。

```python
import numpy as np
print(np.__version__)
```

## 2. ndarray 创建与属性

本节讲解 `np.array`、`np.zeros`、`np.ones`、`np.arange`、`np.linspace` 等数组创建方式，以及 `shape`、`dtype`、`ndim`、`size` 等核心属性。

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.shape, arr.dtype, arr.ndim)
```

## 3. 索引与切片

本节覆盖基本索引、布尔索引、花式索引（fancy indexing）的用法，以及切片返回视图而非拷贝的关键概念。

```python
arr = np.arange(10)
mask = arr > 5
print(arr[mask])
```

## 4. 数组形状操作

本节介绍 `reshape`、`ravel`、`flatten`、`transpose`、`swapaxes` 等形状变换方法，以及 `np.concatenate`、`np.stack` 等数组拼接操作。

```python
a = np.arange(12).reshape(3, 4)
print(a.T.shape)
```

## 5. 广播机制

本节深入讲解 NumPy 广播规则：形状兼容性判断、维度扩展策略，并通过典型示例（标量与数组、不同形状数组运算）说明广播的实际行为。

```python
a = np.array([[1], [2], [3]])
b = np.array([10, 20, 30])
print(a + b)
```

## 6. 通用函数（ufunc）

本节列举数学运算（`np.sin`、`np.exp`、`np.log`）、比较运算（`np.greater`、`np.equal`）等 ufunc，以及 `out` 参数和 `where` 条件运算的用法。

## 7. 聚合与统计运算

本节讲解 `np.sum`、`np.mean`、`np.std`、`np.min`/`np.max` 等聚合函数，重点说明 `axis` 参数对计算方向的影响，以及 `np.cumsum`、`np.argmin` 等常用操作。

```python
arr = np.random.randn(1000, 5)
print(arr.mean(axis=0))
```

## 8. 线性代数

本节覆盖矩阵乘法（`@` / `np.dot`）、行列式（`np.linalg.det`）、逆矩阵（`np.linalg.inv`）、特征值分解（`np.linalg.eig`）、SVD 分解（`np.linalg.svd`）及线性方程组求解。

```python
A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])
x = np.linalg.solve(A, b)
```

## 9. 随机数生成

本节介绍 `np.random` 模块：均匀分布、正态分布、泊松分布等随机数生成，以及 `np.random.Generator` 新 API 和随机种子（seed）的可复现性设置。

```python
rng = np.random.default_rng(seed=42)
samples = rng.normal(loc=0, scale=1, size=(3, 4))
```

## 10. 性能优化技巧

本节分享向量化替代循环、预分配数组、`np.where` 替代条件判断、内存布局（C order vs Fortran order）等 NumPy 性能优化实践。

## 11. 延伸阅读

- NumPy 官方文档：https://numpy.org/doc/stable/
- From Python to NumPy (Nicolas Rougier)
- Linear Algebra and Its Applications (Gilbert Strang)
