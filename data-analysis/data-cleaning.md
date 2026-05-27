# 数据清洗 — 缺失值、异常值与数据类型转换

> @Version: v4.0.0
> @Author: fanquanpp
> @Category: Data Science / Data Cleaning
> @Description: 数据清洗实战技巧：缺失值处理策略、异常值检测与修正、数据类型转换与格式统一

---

## 目录

- [1. 数据清洗概述](#1-数据清洗概述)
- [2. 数据质量评估](#2-数据质量评估)
- [3. 缺失值处理](#3-缺失值处理)
- [4. 异常值检测](#4-异常值检测)
- [5. 异常值处理](#5-异常值处理)
- [6. 数据类型转换](#6-数据类型转换)
- [7. 字符串清洗](#7-字符串清洗)
- [8. 重复数据处理](#8-重复数据处理)
- [9. 数据验证与断言](#9-数据验证与断言)
- [10. 清洗流程自动化](#10-清洗流程自动化)
- [11. 延伸阅读](#11-延伸阅读)

---

## 1. 数据质量评估

本节介绍数据清洗在分析流程中的关键地位（Garbage In, Garbage Out），常见数据质量问题分类，以及建立数据质量检查清单的方法。

## 2. 数据质量评估

本节讲解如何在清洗前对数据进行全面体检：`df.info()`、`df.describe()`、缺失率统计、唯一值分布、数据范围检查，形成数据质量报告。

```python
missing_pct = df.isna().mean().sort_values(ascending=False)
print(missing_pct[missing_pct > 0])
```

## 3. 缺失值处理

本节深入缺失值处理策略：识别缺失模式（MCAR/MAR/MNAR）、删除法（`dropna`）、填充法（`fillna` 常数/均值/中位数/众数/前后向填充）、插值法（`interpolate`），以及不同场景下的策略选择。

```python
df['age'].fillna(df['age'].median(), inplace=True)
df['category'].fillna('Unknown', inplace=True)
df['value'].interpolate(method='linear', inplace=True)
```

## 4. 异常值检测

本节覆盖异常值检测方法：基于统计的 IQR 法则、Z-Score 法、基于可视化的箱线图/散点图识别，以及基于模型的 Isolation Forest 等高级方法。

```python
Q1, Q3 = df['value'].quantile([0.25, 0.75])
IQR = Q3 - Q1
outliers = df[(df['value'] < Q1 - 1.5 * IQR) | (df['value'] > Q3 + 1.5 * IQR)]
```

## 5. 异常值处理

本节介绍异常值的处理策略：删除、截断（Winsorize/Clipping）、替换为中位数/边界值、分箱（Binning），以及处理决策的业务考量。

```python
from scipy.stats import mstats
df['value_winsorized'] = mstats.winsorize(df['value'], limits=[0.05, 0.05])
```

## 6. 数据类型转换

本节讲解常见类型转换场景：字符串转数值（`pd.to_numeric`）、字符串转日期（`pd.to_datetime`）、数值转分类（`astype('category')`）、布尔转换，以及转换中的错误处理（`errors='coerce'`）。

```python
df['price'] = pd.to_numeric(df['price'], errors='coerce')
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d')
df['status'] = df['status'].astype('category')
```

## 7. 字符串清洗

本节覆盖 Pandas `str` 访问器的常用操作：去除空白（`strip`）、大小写统一（`lower`/`upper`）、正则替换（`replace`）、拆分提取（`split`/`extract`）、模式匹配（`contains`/`match`）。

```python
df['city'] = df['city'].str.strip().str.title()
df['phone'] = df['phone'].str.replace(r'\D', '', regex=True)
```

## 8. 重复数据处理

本节介绍重复数据的识别（`duplicated`）、删除（`drop_duplicates`）、基于关键字段的部分重复判断，以及重复记录的合并策略。

```python
df.drop_duplicates(subset=['email'], keep='last', inplace=True)
```

## 9. 数据验证与断言

本节讲解使用 `assert` 语句和 `pandera` 库对清洗后的数据进行验证：非空断言、唯一性断言、范围断言、类型断言，确保数据质量可控。

```python
assert df['age'].notna().all(), 'Age column contains NaN'
assert (df['age'] >= 0).all() and (df['age'] <= 150).all(), 'Age out of range'
```

## 10. 清洗流程自动化

本节介绍如何将清洗步骤封装为可复用的函数/类，使用 Pipeline 模式组织清洗流程，以及清洗日志的记录与版本追踪。

```python
def clean_pipeline(df):
    df = remove_duplicates(df)
    df = handle_missing(df)
    df = fix_types(df)
    df = remove_outliers(df)
    return df
```

## 11. 延伸阅读

- Pandas 官方文档 — Missing Data：https://pandas.pydata.org/docs/user_guide/missing_data.html
- Python for Data Analysis 第 3 版 (Wes McKinney)
- pandera 数据验证库：https://pandera.readthedocs.io/
