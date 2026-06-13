---
order: 77
title: 'C++网络编程'
module: 'cpp'
category: 'C++'
difficulty: 'advanced'
description: 'Asio与网络编程'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Asio TCP 服务器

```cpp
#include <asio.hpp>

asio::io_context io;
asio::ip::tcp::acceptor acceptor(io,
  asio::ip::tcp::endpoint(asio::ip::tcp::v4(), 8080));

for (;;) {
  asio::ip::tcp::socket socket(io);
  acceptor.accept(socket);
  std::string msg = "Hello!\n";
  asio::write(socket, asio::buffer(msg));
}
```
