# 统计学 — 描述统计、推断统计与假设检验

> @Version: v4.0.0
> @Author: fanquanpp
> @Category: Data Science / Statistics
> @Description: 数据分析所需的统计学基础：描述统计量、概率分布、参数估计、假设检验与 Python 实现

---

## 目录

- [1. 统计学概述](#1-统计学概述)
- [2. 描述统计](#2-描述统计)
- [3. 概率基础](#3-概率基础)
- [4. 常见概率分布](#4-常见概率分布)
- [5. 抽样与抽样分布](#5-抽样与抽样分布)
- [6. 参数估计](#6-参数估计)
- [7. 假设检验](#7-假设检验)
- [8. 方差分析（ANOVA）](#8-方差分析anova)
- [9. 相关与回归](#9-相关与回归)
- [10. 非参数检验](#10-非参数检验)
- [11. Python 实现工具](#11-python-实现工具)
- [12. 延伸阅读](#12-延伸阅读)

---

## 1. 统计学概述

本节介绍描述统计与推断统计的区别，统计学在数据分析中的角色，以及总体、样本、参数、统计量等核心术语。

## 2. 描述统计

本节覆盖集中趋势度量（均值、中位数、众数）、离散程度度量（方差、标准差、极差、IQR）、分布形态（偏度、峰度），以及 Pandas 的 `describe` 与 `agg` 快速计算。

```python
df['score'].agg(['mean', 'median', 'std', 'skew', 'kurt'])
```

## 3. 概率基础

本节介绍样本空间、事件、条件概率、贝叶斯定理等概率论基本概念，为后续推断统计奠定理论基础。

## 4. 常见概率分布

本节讲解离散分布（伯努利、二项、泊松）与连续分布（均匀、正态、指数、卡方、t 分布、F 分布），并使用 `scipy.stats` 进行分布计算与可视化。

```python
from scipy import stats
x = np.linspace(-4, 4, 100)
plt.plot(x, stats.norm.pdf(x))
```

## 5. 抽样与抽样分布

本节介绍简单随机抽样、分层抽样、系统抽样方法，以及中心极限定理（CLT）的含义与验证，抽样分布与标准误的概念。

```python
sample_means = [np.random.choice(population, 30).mean() for _ in range(1000)]
```

## 6. 参数估计

本节覆盖点估计（矩估计、最大似然估计）与区间估计（置信区间），使用 `scipy.stats` 计算均值、比例的置信区间。

```python
stats.t.interval(0.95, df=len(data)-1, loc=data.mean(), scale=stats.sem(data))
```

## 7. 假设检验

本节系统讲解假设检验流程：原假设/备择假设 → 检验统计量 → p 值 → 决策，覆盖 Z 检验、t 检验（单样本、独立样本、配对样本）、比例检验，以及第一类/第二类错误与功效分析。

```python
stats.ttest_ind(group_a, group_b)
```

## 8. 方差分析（ANOVA）

本节介绍单因素方差分析的原理与 `scipy.stats.f_oneway` 实现，以及事后多重比较（Tukey HSD）和双因素方差分析的概念。

```python
stats.f_oneway(group1, group2, group3)
```

## 9. 相关与回归

本节覆盖皮尔逊相关系数、斯皮尔曼秩相关、简单线性回归的最小二乘估计，以及使用 `scipy.stats.pearsonr` 和 `statsmodels` 进行回归分析。

```python
r, p = stats.pearsonr(df['x'], df['y'])
```

## 10. 非参数检验

本节介绍当数据不满足正态假设时的替代方法：Mann-Whitney U 检验、Wilcoxon 符号秩检验、Kruskal-Wallis 检验、卡方独立性检验。

```python
stats.mannwhitneyu(sample_a, sample_b)
```

## 11. Python 实现工具

本节汇总 `scipy.stats`、`statsmodels`、`pingouin` 三个统计库的定位与典型用法，帮助选择合适的工具进行统计计算。

```python
import statsmodels.api as sm
import pingouin as pg
```

## 12. 延伸阅读

- OpenIntro Statistics (David Diez)
- Practical Statistics for Data Scientists (Peter Bruce)
- scipy.stats 官方文档：https://docs.scipy.org/doc/scipy/reference/stats.html
