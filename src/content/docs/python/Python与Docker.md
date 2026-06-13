---
order: 62
title: 'Python与Docker'
module: 'python'
category: 'Python'
difficulty: 'intermediate'
description: 'Python容器化'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Dockerfile

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```
