# Seaborn — 统计可视化、热力图与分布图

> @Version: v4.0.0
> @Author: fanquanpp
> @Category: Data Science / Seaborn
> @Description: Seaborn 高级统计可视化：分布图、关系图、分类图、热力图与多图网格

---

## 目录

- [1. Seaborn 简介](#1-seaborn-简介)
- [2. 样式与主题](#2-样式与主题)
- [3. 分布图](#3-分布图)
- [4. 关系图](#4-关系图)
- [5. 分类图](#5-分类图)
- [6. 热力图](#6-热力图)
- [7. 回归图](#7-回归图)
- [8. 多图网格（FacetGrid）](#8-多图网格facetgrid)
- [9. 调色板与配色](#9-调色板与配色)
- [10. 与 Matplotlib 协作](#10-与-matplotlib-协作)
- [11. 延伸阅读](#11-延伸阅读)

---

## 1. Seaborn 简介

本节介绍 Seaborn 基于 Matplotlib 的高级封装定位，其面向 DataFrame 的 API 设计理念，以及内置数据集（`sns.load_dataset`）的使用方式。

```python
import seaborn as sns
tips = sns.load_dataset('tips')
tips.head()
```

## 2. 样式与主题

本节讲解 `sns.set_theme`、五种内置主题（`darkgrid`、`whitegrid`、`dark`、`white`、`ticks`），以及 `sns.despine` 去除边框等美化操作。

```python
sns.set_theme(style='whitegrid', font_scale=1.2)
```

## 3. 分布图

本节覆盖 `sns.histplot`（直方图）、`sns.kdeplot`（核密度估计）、`sns.ecdfplot`（经验累积分布）、`sns.rugplot`（边缘地毯图），以及 `sns.displot` 统一接口的用法。

```python
sns.histplot(data=tips, x='total_bill', kde=True, hue='time')
```

## 4. 关系图

本节介绍 `sns.scatterplot`、`sns.lineplot` 以及统一接口 `sns.relplot`，重点讲解 `hue`、`style`、`size` 语义映射实现多维数据可视化。

```python
sns.scatterplot(data=tips, x='total_bill', y='tip', hue='time', style='smoker', size='size')
```

## 5. 分类图

本节覆盖 `sns.boxplot`（箱线图）、`sns.violinplot`（小提琴图）、`sns.stripplot`/`swarmplot`（散点分类图）、`sns.barplot`/`pointplot`（均值估计图），以及 `sns.catplot` 统一接口。

```python
sns.boxplot(data=tips, x='day', y='total_bill', hue='smoker')
```

## 6. 热力图

本节讲解 `sns.heatmap` 的核心参数（`annot`、`fmt`、`cmap`、`center`、`mask`），以及如何结合 `df.corr()` 绘制相关性矩阵热力图。

```python
corr = tips.select_dtypes(include='number').corr()
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0)
```

## 7. 回归图

本节介绍 `sns.regplot`（单图回归）与 `sns.lmplot`（网格回归），包括置信区间、多项式拟合、残差分析等参数。

```python
sns.lmplot(data=tips, x='total_bill', y='tip', hue='smoker', col='time')
```

## 8. 多图网格（FacetGrid）

本节讲解 `sns.FacetGrid`、`sns.PairGrid`、`sns.JointGrid` 的使用，实现按分类变量分面绘图、变量两两关系矩阵图、联合分布图等高级布局。

```python
g = sns.FacetGrid(tips, col='time', row='smoker')
g.map(sns.histplot, 'total_bill')
```

## 9. 调色板与配色

本节介绍 `sns.color_palette`、`sns.palplot`，分类调色板（`deep`、`Set2`）、连续调色板（`viridis`、`rocket`）、发散调色板（`vlag`、`coolwarm`）的选择与自定义。

```python
palette = sns.color_palette('husl', 8)
sns.palplot(palette)
```

## 10. 与 Matplotlib 协作

本节说明 Seaborn 返回 Matplotlib 对象的特性，如何通过 `ax` 参数混用两者 API，以及在 Seaborn 图表上叠加 Matplotlib 定制元素。

```python
ax = sns.scatterplot(data=tips, x='total_bill', y='tip')
ax.set_title('Tips vs Total Bill', fontsize=14)
ax.axhline(y=3, color='red', linestyle='--')
```

## 11. 延伸阅读

- Seaborn 官方文档：https://seaborn.pydata.org/
- Seaborn Gallery：https://seaborn.pydata.org/examples/
- Python Data Visualization Cookbook (Igor Milovanović)
