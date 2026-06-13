---
order: 76
title: 'Python与消息队列'
module: 'python'
category: 'Python'
difficulty: 'intermediate'
description: 'RabbitMQ与Kafka'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Kafka

```python
from kafka import KafkaProducer, KafkaConsumer

producer = KafkaProducer(bootstrap_servers='localhost:9092')
producer.send('topic', b'message')

consumer = KafkaConsumer('topic', bootstrap_servers='localhost:9092')
for msg in consumer:
  print(msg.value)
```
