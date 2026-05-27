# Matplotlib — 折线图、柱状图、散点图与子图

> @Version: v4.0.0
> @Author: fanquanpp
> @Category: Data Science / Matplotlib
> @Description: Matplotlib 数据可视化核心：基础图表类型、样式定制、子图布局与 Jupyter 交互式绘图

---

## 目录

- [1. Matplotlib 简介](#1-matplotlib-简介)
- [2. Figure 与 Axes 体系](#2-figure-与-axes-体系)
- [3. 折线图（Line Plot）](#3-折线图line-plot)
- [4. 柱状图（Bar Chart）](#4-柱状图bar-chart)
- [5. 散点图（Scatter Plot）](#5-散点图scatter-plot)
- [6. 直方图（Histogram）](#6-直方图histogram)
- [7. 饼图与环形图](#7-饼图与环形图)
- [8. 子图与布局](#8-子图与布局)
- [9. 样式与美化](#9-样式与美化)
- [10. 注释与文本](#10-注释与文本)
- [11. 保存与导出](#11-保存与导出)
- [12. 延伸阅读](#12-延伸阅读)

---

## 1. Matplotlib 简介

本节介绍 Matplotlib 作为 Python 可视化基石的地位，其与 MATLAB 风格（`pyplot`）和面向对象风格的关系，以及在 Jupyter 中的内联渲染配置。

```python
import matplotlib.pyplot as plt
%matplotlib inline
```

## 2. Figure 与 Axes 体系

本节讲解 Matplotlib 的核心架构：`Figure`（画布）与 `Axes`（绘图区域）的关系，`plt.figure` 与 `fig, ax = plt.subplots()` 两种创建方式的区别。

```python
fig, ax = plt.subplots(figsize=(10, 6))
```

## 3. 折线图（Line Plot）

本节覆盖 `ax.plot` 的核心参数（`color`、`linestyle`、`marker`、`linewidth`），多系列折线绘制，以及时间序列数据的日期格式化。

```python
ax.plot(x, y, color='steelblue', marker='o', linestyle='--', label='Series A')
ax.legend()
```

## 4. 柱状图（Bar Chart）

本节介绍 `ax.bar`（垂直柱状图）与 `ax.barh`（水平柱状图），分组柱状图、堆叠柱状图的实现，以及数值标签的添加。

```python
ax.bar(categories, values, color=['#4C72B0', '#55A868', '#C44E52'])
```

## 5. 散点图（Scatter Plot）

本节讲解 `ax.scatter` 的用法，包括点大小（`s`）、颜色映射（`c` + `cmap`）、透明度（`alpha`）以及颜色条（`colorbar`）的添加。

```python
scatter = ax.scatter(x, y, c=z, cmap='viridis', s=50, alpha=0.7)
fig.colorbar(scatter, ax=ax, label='Intensity')
```

## 6. 直方图（Histogram）

本节介绍 `ax.hist` 的参数（`bins`、`density`、`cumulative`），以及如何通过直方图观察数据分布形态。

```python
ax.hist(data, bins=30, density=True, color='steelblue', edgecolor='white')
```

## 7. 饼图与环形图

本节覆盖 `ax.pie` 的核心参数（`labels`、`autopct`、`explode`、`startangle`），以及通过 `wedgeprops` 实现环形图。

```python
ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90, wedgeprops=dict(width=0.4))
```

## 8. 子图与布局

本节详解 `plt.subplots`（规则网格）、`plt.subplot2grid`、`GridSpec`（不规则布局）以及 `fig.add_axes`（手动定位）等子图排列方式。

```python
fig, axes = plt.subplots(2, 2, figsize=(12, 8), sharex=True, sharey=True)
```

## 9. 样式与美化

本节介绍 `plt.style.use` 预设样式、自定义 `rcParams`、颜色方案选择（色盲友好配色）、字体设置与中文字体配置。

```python
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['font.sans-serif'] = ['SimHei']
```

## 10. 注释与文本

本节讲解 `ax.set_title`、`ax.set_xlabel`/`ylabel`、`ax.annotate`（箭头注释）、`ax.text` 等文本与标注方法。

```python
ax.annotate('Peak', xy=(5, 100), xytext=(7, 120),
            arrowprops=dict(arrowstyle='->', color='red'))
```

## 11. 保存与导出

本节介绍 `fig.savefig` 的参数（`dpi`、`bbox_inches`、`transparent`、`format`），以及矢量图（SVG/PDF）与位图（PNG/JPG）的选择建议。

```python
fig.savefig('chart.png', dpi=300, bbox_inches='tight')
```

## 12. 延伸阅读

- Matplotlib 官方文档：https://matplotlib.org/stable/
- Matplotlib Gallery：https://matplotlib.org/stable/gallery/
- Scientific Visualization (Nicolas Rougier)
