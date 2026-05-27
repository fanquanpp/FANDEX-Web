# 数据分析概述

> @Version: v4.0.0
> @Author: fanquanpp
> @Category: Data Science / Overview
> @Description: 数据分析领域全景概览、Python 工具链介绍与系统化学习路线

---

## 目录

- [1. 什么是数据分析](#1-什么是数据分析)
- [2. 数据分析流程](#2-数据分析流程)
- [3. Python 数据分析工具链](#3-python-数据分析工具链)
- [4. 环境搭建与配置](#4-环境搭建与配置)
- [5. Jupyter Notebook 工作流](#5-jupyter-notebook-工作流)
- [6. 学习路线图](#6-学习路线图)
- [7. 延伸阅读](#7-延伸阅读)

---

## 1. 什么是数据分析

本节介绍数据分析的定义、核心目标（描述过去、诊断原因、预测未来）以及在不同行业中的应用场景，帮助读者建立对数据分析领域的整体认知。

## 2. 数据分析流程

本节梳理从业务问题定义到结论交付的完整流程：问题定义 → 数据采集 → 数据清洗 → 探索性分析（EDA） → 建模分析 → 可视化呈现 → 结论与建议，每个环节配以简要说明。

## 3. Python 数据分析工具链

本节系统介绍 Python 数据分析生态中的核心库及其定位：NumPy（数值计算）、Pandas（表格处理）、Matplotlib/Seaborn（可视化）、SciPy/Statsmodels（统计推断）、Scikit-learn（机器学习），并说明各库之间的协作关系。

## 4. 环境搭建与配置

本节指导安装 Anaconda / Miniconda、创建虚拟环境、安装核心依赖包，以及配置 Jupyter Notebook/Lab 的常用扩展和主题。

```python
# conda 环境创建示例
# conda create -n data-analysis python=3.11
# conda activate data-analysis
# conda install numpy pandas matplotlib seaborn scipy statsmodels jupyterlab
```

## 5. Jupyter Notebook 工作流

本节介绍 Jupyter Notebook 的核心操作：单元格类型与快捷键、Magic 命令（`%matplotlib inline`、`%%time`）、内核管理、导出格式，以及如何组织一个可复现的分析笔记本。

## 6. 学习路线图

本节提供从零基础到进阶的系统化学习路径，按阶段划分学习目标与推荐资源，并标注各章节之间的依赖关系。

```
阶段一：基础工具 → numpy.md + pandas.md
阶段二：可视化  → matplotlib.md + seaborn.md
阶段三：统计基础 → statistics.md
阶段四：实战技能 → data-cleaning.md + project.md
```

## 7. 延伸阅读

- Python for Data Analysis (Wes McKinney)
- Practical Statistics for Data Scientists (Peter Bruce)
- Jupyter Notebook 官方文档：https://jupyter.org/documentation
