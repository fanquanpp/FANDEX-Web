# Pandas — DataFrame/Series、数据清洗、合并重塑

> @Version: v4.0.0
> @Author: fanquanpp
> @Category: Data Science / Pandas
> @Description: Pandas 核心数据结构与操作：Series/DataFrame 创建、索引筛选、分组聚合、合并拼接与重塑

---

## 目录

- [1. Pandas 简介](#1-pandas-简介)
- [2. Series 基础](#2-series-基础)
- [3. DataFrame 基础](#3-dataframe-基础)
- [4. 索引与数据选择](#4-索引与数据选择)
- [5. 数据类型与转换](#5-数据类型与转换)
- [6. 数据清洗概览](#6-数据清洗概览)
- [7. 分组与聚合](#7-分组与聚合)
- [8. 合并与拼接](#8-合并与拼接)
- [9. 重塑与透视](#9-重塑与透视)
- [10. 时间序列处理](#10-时间序列处理)
- [11. IO 操作](#11-io-操作)
- [12. 延伸阅读](#12-延伸阅读)

---

## 1. Pandas 简介

本节介绍 Pandas 在数据分析工作流中的核心角色，解释其基于 NumPy 构建的关系型数据模型，以及与 SQL、Excel 的类比关系。

```python
import pandas as pd
print(pd.__version__)
```

## 2. Series 基础

本节讲解 Series 的创建方式（列表、字典、标量）、索引机制、常用属性（`index`、`values`、`dtype`）以及向量化运算。

```python
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])
print(s['b'])
```

## 3. DataFrame 基础

本节覆盖 DataFrame 的多种创建方式（字典、列表、NumPy 数组）、行列操作、属性查看（`shape`、`columns`、`dtypes`、`info`、`describe`）。

```python
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'score': [85, 92, 78]
})
print(df.describe())
```

## 4. 索引与数据选择

本节详解 `[]`、`.loc`、`.iloc`、`.at`、`.iat` 的区别与适用场景，以及布尔索引、`query` 方法、`isin` 筛选等高级选择技巧。

```python
df.loc[df['score'] > 80, ['name', 'score']]
```

## 5. 数据类型与转换

本节介绍 Pandas 的 dtype 体系（`int64`、`float64`、`object`、`category`、`datetime64`），以及 `astype`、`pd.to_numeric`、`pd.to_datetime` 等类型转换方法。

## 6. 数据清洗概览

本节概览数据清洗的核心任务：缺失值检测与处理（`isna`、`fillna`、`dropna`）、重复值处理（`duplicated`、`drop_duplicates`）、字符串清洗（`str` 访问器），详细内容见 [data-cleaning.md](data-cleaning.md)。

```python
df.isna().sum()
df.dropna(subset=['score'])
```

## 7. 分组与聚合

本节讲解 `groupby` 机制（split-apply-combine）、内置聚合函数（`sum`、`mean`、`agg`）、`transform` 与 `apply` 的区别，以及多级分组操作。

```python
df.groupby('category')['score'].agg(['mean', 'count', 'std'])
```

## 8. 合并与拼接

本节对比 `pd.merge`（数据库风格连接：inner/outer/left/right）、`pd.concat`（轴向拼接）、`join` 方法，以及合并键、索引合并和重复列处理。

```python
pd.merge(df_left, df_right, on='id', how='left')
```

## 9. 重塑与透视

本节介绍 `pivot`、`pivot_table`、`melt`、`stack`/`unstack` 等重塑操作，帮助在宽表与长表之间灵活转换。

```python
df_wide = df_long.pivot_table(index='date', columns='category', values='value', aggfunc='sum')
```

## 10. 时间序列处理

本节覆盖 `pd.to_datetime`、`DatetimeIndex`、时间偏移（`shift`、`diff`）、重采样（`resample`）、滚动窗口（`rolling`）等时间序列核心操作。

```python
df['date'] = pd.to_datetime(df['date'])
df.set_index('date').resample('M').mean()
```

## 11. IO 操作

本节列举 Pandas 的数据读写接口：`read_csv`/`to_csv`、`read_excel`/`to_excel`、`read_json`、`read_sql`，以及常用参数（`encoding`、`parse_dates`、`chunksize`）。

```python
df = pd.read_csv('data.csv', encoding='utf-8', parse_dates=['date'])
```

## 12. 延伸阅读

- Pandas 官方文档：https://pandas.pydata.org/docs/
- Python for Data Analysis 第 3 版 (Wes McKinney)
- Effective Pandas (Matt Harrison)
