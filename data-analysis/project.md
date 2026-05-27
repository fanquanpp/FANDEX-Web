# 实战案例 — 数据分析全流程

> @Version: v4.0.0
> @Author: fanquanpp
> @Category: Data Science / Project
> @Description: 完整数据分析实战项目：从数据获取到结论交付的全流程演示，整合 NumPy、Pandas、可视化与统计方法

---

## 目录

- [1. 项目概述](#1-项目概述)
- [2. 业务问题定义](#2-业务问题定义)
- [3. 数据获取与加载](#3-数据获取与加载)
- [4. 数据概览与初步理解](#4-数据概览与初步理解)
- [5. 数据清洗](#5-数据清洗)
- [6. 探索性数据分析（EDA）](#6-探索性数据分析eda)
- [7. 统计分析与假设检验](#7-统计分析与假设检验)
- [8. 深入分析与建模](#8-深入分析与建模)
- [9. 可视化呈现与报告](#9-可视化呈现与报告)
- [10. 结论与建议](#10-结论与建议)
- [11. 项目复盘与改进](#11-项目复盘与改进)
- [12. 延伸阅读](#12-延伸阅读)

---

## 1. 项目概述

本节介绍实战项目的背景与目标，说明将使用的数据集（如 Kaggle 公开数据集），以及整个分析将遵循的流程框架，帮助读者建立全局视角。

## 2. 业务问题定义

本节演示如何将模糊的业务需求转化为可分析的具体问题，明确分析目标、关键指标（KPI）和成功标准，这是数据分析的起点。

```
业务问题：某电商平台用户流失率上升，需要分析原因并提出策略建议
→ 分析目标：识别流失用户特征、找到关键流失因素、量化各因素影响
```

## 3. 数据获取与加载

本节覆盖数据来源（CSV/Excel/数据库/API）、多源数据加载、编码问题处理，以及数据字典的阅读与理解。

```python
df_orders = pd.read_csv('data/orders.csv', parse_dates=['order_date'])
df_users = pd.read_csv('data/users.csv')
df_products = pd.read_csv('data/products.csv', encoding='latin-1')
```

## 4. 数据概览与初步理解

本节使用 `head`、`info`、`describe`、`value_counts` 等方法快速了解数据规模、字段含义、分布概况，形成对数据的基本认知。

```python
print(f'Shape: {df.shape}')
print(df.dtypes)
print(df.describe(include='all'))
```

## 5. 数据清洗

本节按照 [data-cleaning.md](data-cleaning.md) 的方法论，对实战数据进行完整清洗：缺失值处理、异常值检测与修正、类型转换、重复值处理，记录每步操作的理由与影响。

```python
df['price'] = pd.to_numeric(df['price'], errors='coerce')
df.dropna(subset=['user_id', 'order_date'], inplace=True)
```

## 6. 探索性数据分析（EDA）

本节是项目核心环节，通过单变量分析（分布图）、双变量分析（散点图、分组统计）、多变量分析（相关性热力图、分面图）逐步发现数据中的模式与异常。

```python
fig, axes = plt.subplots(1, 3, figsize=(18, 5))
sns.histplot(df['amount'], ax=axes[0])
sns.boxplot(x='category', y='amount', data=df, ax=axes[1])
sns.heatmap(df.corr(numeric_only=True), annot=True, ax=axes[2])
```

## 7. 统计分析与假设检验

本节运用 [statistics.md](statistics.md) 中的方法，对 EDA 中发现的模式进行统计验证：组间差异检验、相关性检验、比例检验等，区分统计显著与业务显著。

```python
from scipy import stats
churned = df[df['churned'] == 1]['lifetime_value']
active = df[df['churned'] == 0]['lifetime_value']
t_stat, p_value = stats.ttest_ind(churned, active)
```

## 8. 深入分析与建模

本节在统计检验基础上进行更深入的分析：RFM 用户分层、留存分析、简单的逻辑回归预测，展示从描述到预测的分析深化过程。

```python
import statsmodels.api as sm
X = df[['login_freq', 'avg_order_value', 'complaint_count']]
X = sm.add_constant(X)
y = df['churned']
model = sm.Logit(y, X).fit()
print(model.summary())
```

## 9. 可视化呈现与报告

本节将分析结果整理为清晰的可视化报告：关键发现图表、数据仪表盘布局、图表标题与注释的叙事性设计，让图表自己说话。

```python
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
fig.suptitle('用户流失分析报告', fontsize=16, fontweight='bold')
```

## 10. 结论与建议

本节总结分析发现，将数据洞察转化为可执行的业务建议，明确建议的优先级与预期影响，并指出分析的局限性。

## 11. 项目复盘与改进

本节反思分析过程中的不足：数据局限、方法选择、遗漏视角，以及如果重新来过会做的改进，培养持续优化的思维。

## 12. 延伸阅读

- Storytelling with Data (Cole Nussbaumer Knaflic)
- Kaggle Notebooks 精选：https://www.kaggle.com/notebooks
- Python Data Science Handbook (Jake VanderPlas)
