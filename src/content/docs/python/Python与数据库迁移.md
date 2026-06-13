---
order: 86
title: 'Python与数据库迁移'
module: 'python'
category: 'Python'
difficulty: 'intermediate'
description: 'Alembic与数据库迁移'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Alembic

```bash
alembic init migrations
alembic revision --autogenerate -m "add users table"
alembic upgrade head
alembic downgrade -1
```
