---
order: 88
title: 'Python与WebSocket-2'
module: 'python'
category: 'Python'
difficulty: 'intermediate'
description: 'Socket.IO与实时应用'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Socket.IO

```python
from fastapi import FastAPI
from socketio import ASGIApp, AsyncServer

sio = AsyncServer(async_mode='asgi')
app = FastAPI()
socket_app = ASGIApp(sio, app)

@sio.event
async def connect(sid, environ):
  print(f"Client {sid} connected")

@sio.event
async def message(sid, data):
  await sio.emit('response', data, room=sid)
```
