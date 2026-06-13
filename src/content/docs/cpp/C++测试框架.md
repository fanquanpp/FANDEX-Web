---
order: 73
title: 'C++测试框架'
module: 'cpp'
category: 'C++'
difficulty: 'intermediate'
description: 'Google Test与Catch2'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Google Test

```cpp
#include <gtest/gtest.h>

TEST(MathTest, Add) {
  EXPECT_EQ(add(1, 2), 3);
  EXPECT_NE(add(1, 2), 4);
  ASSERT_TRUE(add(0, 0) == 0);
}
```

## 2. Catch2

```cpp
#include <catch2/catch_test_macros.hpp>

TEST_CASE("Addition works", "[math]") {
  REQUIRE(add(1, 2) == 3);
  REQUIRE(add(-1, 1) == 0);
}
```
