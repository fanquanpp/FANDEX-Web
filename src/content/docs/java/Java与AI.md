---
order: 77
title: 'Java与AI'
module: 'java'
category: 'Java'
difficulty: 'intermediate'
description: 'Java机器学习与AI集成'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. DJL (Deep Java Library)

```java
Model model = Model.newInstance("resnet");
model.load(Paths.get("model"));

Predictor<Image, Classifications> predictor = model.newPredictor(translator);
Classifications result = predictor.predict(image);
```

## 2. LangChain4j

```java
ChatLanguageModel model = OpenAiChatModel.builder()
  .apiKey(System.getenv("OPENAI_API_KEY"))
  .modelName("gpt-4")
  .build();

String response = model.generate("Hello!");
```
