---
order: 67
title: 'Python与NLP'
module: 'python'
category: 'Python'
difficulty: 'intermediate'
description: '自然语言处理'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. spaCy

```python
import spacy

nlp = spacy.load("zh_core_web_sm")
doc = nlp("自然语言处理是人工智能的重要方向")

for ent in doc.ents:
  print(ent.text, ent.label_)
```

## 2. Transformers

```python
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
result = classifier("这个产品非常好用")
```
