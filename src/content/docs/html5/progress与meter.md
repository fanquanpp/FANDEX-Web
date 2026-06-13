---
order: 59
title: 'progress与meter'
module: 'html5'
category: 'HTML5'
difficulty: 'beginner'
description: 'progress与meter'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. progress 元素

```html
<progress>加载中...</progress> <progress value="70" max="100">70%</progress>
```

| 属性    | 说明   | 默认值 |
| ------- | ------ | ------ |
| `value` | 当前值 | 0      |
| `max`   | 最大值 | 1      |

```javascript
const progress = document.querySelector('progress');
progress.value = 0.5;
console.log(progress.position); // 0.5
```

### 自定义样式

```css
progress::-webkit-progress-bar {
  background: #e0e0e0;
  border-radius: 10px;
}
progress::-webkit-progress-value {
  background: #4caf50;
  border-radius: 10px;
}
progress::-moz-progress-bar {
  background: #4caf50;
}
```

## 2. meter 元素

```html
<meter value="0.7" min="0" max="1">70%</meter>
<meter value="85" min="0" max="100" low="60" high="90" optimum="80">85分</meter>
```

| 属性      | 说明           | 默认值 |
| --------- | -------------- | ------ |
| `value`   | 当前值（必需） | 0      |
| `min`     | 最小值         | 0      |
| `max`     | 最大值         | 1      |
| `low`     | 低值区间边界   | min    |
| `high`    | 高值区间边界   | max    |
| `optimum` | 最优值         | —      |

### 区间划分

```
min          low          high          max
 |-----------|------------|-------------|
   低值区间     中值区间       高值区间
```

颜色规则基于 optimum 所在区间：optimum 所在区间为绿色，远离为黄色/红色。

```css
meter::-webkit-meter-optimum-value {
  background: #4caf50;
}
meter::-webkit-meter-suboptimum-value {
  background: #ff9800;
}
meter::-webkit-meter-even-less-good-value {
  background: #f44336;
}
```
