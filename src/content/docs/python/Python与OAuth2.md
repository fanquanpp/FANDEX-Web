---
order: 87
title: 'Python与OAuth2'
module: 'python'
category: 'Python'
difficulty: 'intermediate'
description: 'OAuth2与JWT认证'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. FastAPI OAuth2

```python
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
  return decode_jwt(token)
```
