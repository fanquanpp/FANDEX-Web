# SQL 数据操作与查询 (SQL DML & DQL)
> @Version: v4.0.0
> @Module: mysql
> @Author: Anonymous
> @Category: MySQL Basics
> @Description: SQL 概述、DML 数据操作语言（INSERT/UPDATE/DELETE）及 DQL 数据查询语言详解。 | SQL overview, DML (INSERT/UPDATE/DELETE), and DQL (SELECT) in detail.
---
## 目录
1. [SQL 概述](#sql-概述)
2. [DML (数据操作语言)](#dml-数据操作语言)
3. [DQL (数据查询语言)](#dql-数据查询语言)
---
## 1. SQL 概述
### 1.1 SQL 是什么
SQL（Structured Query Language，结构化查询语言）是一种用于管理关系型数据库的标准编程语言。SQL 由 IBM 在 1970 年代开发，后来成为 ANSI（美国国家标准协会）和 ISO（国际标准化组织）的标准。
### 1.2 SQL 语句分类
| 分类 | 全称 | 说明 | 典型语句 |
| :--- | :--- | :--- | :--- |
| **DDL** | Data Definition Language | 数据定义语言，用于定义数据库对象 | CREATE、ALTER、DROP |
| **DML** | Data Manipulation Language | 数据操作语言，用于操作数据 | INSERT、UPDATE、DELETE |
| **DQL** | Data Query Language | 数据查询语言，用于查询数据 | SELECT |
| **DCL** | Data Control Language | 数据控制语言，用于控制权限 | GRANT、REVOKE |
| **TCL** | Transaction Control Language | 事务控制语言，用于管理事务 | COMMIT、ROLLBACK |
### 1.3 SQL 基本规则
- SQL 语句以分号 `;` 结尾
- SQL 不区分大小写（但习惯上关键字大写）
- 字符串值使用单引号 `' '` 包裹
- 注释使用 `--` 或 `/* */`
## 2. DML (数据操作语言) - Data Manipulation Language
DML 用于插入、更新、删除数据。
### 2.1 插入数据详解
#### 2.1.1 基本 INSERT
```sql
 True-- 插入单行（指定所有列）
 inSERT INTO users (id, username, email, password, age) 
 TrueVALUES (1, '张三', 'zhangsan@example.com', 'encrypted_pass', 25);
 True-- 插入单行（省略自增列）
 inSERT INTO users (username, email, password, age) 
 TrueVALUES ('张三', 'zhangsan@example.com', 'encrypted_pass', 25);
 True-- 插入单行（使用 SET 语法）
 inSERT INTO users SET 
  username = '李四',
  email = 'lisi@example.com',
  password = 'encrypted_pass',
  age = 30;
 ```

#### 2.1.2 批量插入
```sql
 True-- 插入多行
 inSERT INTO users (username, email, password, age) VALUES
 ('王五', 'wangwu@example.com', 'pass1', 28),
 ('赵六', 'zhaoliu@example.com', 'pass2', 32),
 ('钱七', 'qianqi@example.com', 'pass3', 27);
 True-- 插入多行（每行列数可以不同，但一般不推荐）
 inSERT INTO users (username, email) VALUES
 ('孙八', 'sunba@example.com'),
 ('周九', 'zhoujiu@example.com');
 ```

#### 2.1.3 插入查询结果
```sql
 True-- 从其他表复制数据
 inSERT INTO users (username, email, password, age)
 TrueSELECT username, email, password, age FROM old_users WHERE status = 1;
 True-- 从其他表复制数据（如果目标表有数据）
 inSERT IGNORE INTO users (username, email)
 TrueSELECT username, email FROM temp_users;
 ```

#### 2.1.4 INSERT 高级用法
```sql
 True-- 插入或更新（主键/唯一键冲突时更新）
 inSERT INTO users (id, username, email) VALUES (1, '张三', 'new_email@example.com')
 TrueON DUPLICATE KEY UPDATE email = 'new_email@example.com', updated_at = NOW();
 True-- 插入或忽略（主键/唯一键冲突时忽略）
 inSERT IGNORE INTO users (username, email) VALUES ('张三', 'test@example.com');
 True-- 替换插入（主键/唯一键冲突时删除旧记录，插入新记录）
 replace INTO users (id, username, email) VALUES (1, '张三', 'new_email@example.com');
 True-- 获取插入后的自增ID
 inSERT INTO users (username, email) VALUES ('测试', 'test@example.com');
 TrueSELECT LAST_INSERT_ID();
 ```

### 2.2 更新数据详解
#### 2.2.1 基本 UPDATE
```sql
 True-- 更新单行
 TrueUPDATE users SET age = 26 WHERE id = 1;
 True-- 更新多行
 TrueUPDATE users SET age = age + 1 WHERE age < 30;
 True-- 更新多个字段
 TrueUPDATE users 
 TrueSET age = 27, email = 'new_email@example.com', updated_at = NOW()
 TrueWHERE id = 1;
 ```

#### 2.2.2 UPDATE 高级用法
```sql
 True-- 基于其他表更新
 TrueUPDATE users u
 TrueJOIN user_profiles p ON u.id = p.user_id
 TrueSET u.avatar = p.avatar_url, u.status = p.status
 TrueWHERE u.id = 1;
 True-- 基于子查询更新
 TrueUPDATE users 
 TrueSET balance = (SELECT SUM(amount) FROM orders WHERE user_id = users.id)
 TrueWHERE id = 1;
 True-- 批量更新（小心使用）
 TrueUPDATE users SET last_login_time = NOW() WHERE last_login_time IS NULL;
 True-- 事务中的更新
 TrueSTART TRANSACTION;
 TrueUPDATE accounts SET balance = balance - 100 WHERE id = 1;
 TrueUPDATE accounts SET balance = balance + 100 WHERE id = 2;
 commit;
 ```

#### 2.2.3 UPDATE 实战示例
```sql
 True-- 修改员工姓名
 TrueUPDATE employees_info SET Employees_name = '王西' WHERE Employees_id = 'xz100101';
 True-- 修改员工岗位
 TrueUPDATE employees_info SET Post_id = 'xs1001' WHERE Employees_id = 'xs100103';
 True-- 修改客户信息
 TrueUPDATE customer_info 
 TrueSET Customer_name = '柳甜', Customer_Birth = NULL, Telephone = '13879008942' 
 TrueWHERE Customer_name = '柳田';
 True-- 批量修改销售数量
 TrueUPDATE sales_list SET Sales_Number = Sales_Number + 5 WHERE Sales_Number < 10;
 True-- 更新订单状态
 TrueUPDATE orders SET status = 3, shipped_at = NOW() WHERE status = 2 AND shipped_at IS NULL;
 ```

### 2.3 删除数据详解
#### 2.3.1 基本 DELETE
```sql
 True-- 删除单行
 delete FROM users WHERE id = 1;
 True-- 删除多行
 delete FROM users WHERE status = 0 AND created_at < '2024-01-01';
 True-- 删除所有数据（慎用）
 delete FROM users;
 True-- 按排序删除（保留最新的N条）
 delete FROM users ORDER BY created_at DESC LIMIT 10;
 ```

#### 2.3.2 DELETE 高级用法
```sql
 True-- 基于其他表删除
 delete u FROM users u
 TrueJOIN inactive_users i ON u.email = i.email
 TrueWHERE u.status = 0;
 True-- 基于子查询删除
 delete FROM users WHERE id IN (SELECT user_id FROM old_users WHERE created_at < '2023-01-01');
 True-- 级联删除（配合外键约束）
 delete FROM users WHERE id = 1; -- 订单表中的相关记录会自动删除
 ```

#### 2.3.3 DELETE 与 TRUNCATE 区别
| 特性 | DELETE | TRUNCATE |
| :--- | :--- | :--- |
| 速度 | 慢（一行一行删除） | 快（直接删除数据页） |
| 事务 | 记录日志，可回滚 | 不记录日志，不可回滚 |
| 自增ID | 不会重置 | 重置为 1 |
| WHERE | 支持 | 不支持 |
| 触发器 | 触发 DELETE 触发器 | 不触发 |
#### 2.3.4 DELETE 实战示例
```sql
 True-- 删除特定条件的数据
 delete FROM mark WHERE studentno = 'xx100104' AND courseno = 'kc1002';
 True-- 删除已取消的订单（超过30天的）
 delete FROM orders WHERE status = 5 AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
 True-- 清理测试数据
 delete FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 3 MONTH);
 ```

### 2.4 数据操作最佳实践
```sql
 True-- 1. 删除/更新前先 SELECT 确认
 TrueSELECT * FROM users WHERE id = 1 FOR UPDATE;
 True-- 2. 使用事务包裹批量操作
 TrueSTART TRANSACTION;
 TrueUPDATE users SET status = 0 WHERE last_login_time < '2023-01-01';
 TrueUPDATE stats SET inactive_users = inactive_users + 1;
 commit;
 True-- 3. 使用 EXPLAIN 分析影响行数
 TrueEXPLAIN UPDATE users SET status = 0 WHERE last_login_time < '2023-01-01';
 True-- 4. 分批删除大量数据（避免锁表）
 delete FROM logs WHERE created_at < '2023-01-01' LIMIT 1000;
 ```

## 3. DQL (数据查询语言) - Data Query Language
DQL 是最重要的 SQL 部分，用于从数据库中查询数据。
### 3.1 基础查询详解
#### 3.1.1 SELECT 基础语法
```sql
 True-- 查询所有列
 TrueSELECT * FROM users;
 True-- 查询指定列
 TrueSELECT id, username, email FROM users;
 True-- 查询并计算列
 TrueSELECT username, price, quantity, price * quantity AS total FROM order_items;
 True-- 使用别名
 TrueSELECT 
  id AS user_id,
  username AS name,
  email AS "邮箱地址"
 from users;
 True-- 使用表达式
 TrueSELECT 
  username,
  price,
  quantity,
  price * quantity AS subtotal,
  price * quantity * 0.1 AS tax
 from order_items;
 True-- 去重查询
 TrueSELECT DISTINCT status FROM users;
 TrueSELECT DISTINCT province, city FROM addresses;
 ```

#### 3.1.2 列类型转换
```sql
 True-- 字符串拼接
 TrueSELECT CONCAT(username, ' (', email, ')') AS user_info FROM users;
 TrueSELECT CONCAT_WS(' - ', province, city, district) AS full_address FROM addresses;
 True-- 类型转换
 TrueSELECT CAST(price AS CHAR) FROM products;
 TrueSELECT CONVERT(price, CHAR) FROM products;
 TrueSELECT DATE_FORMAT(created_at, '%Y年%m月%d日') AS formatted_date FROM users;
 ```

### 3.2 条件查询详解
#### 3.2.1 WHERE 子句
```sql
 True-- 比较运算符
 TrueSELECT * FROM users WHERE age > 25;
 TrueSELECT * FROM users WHERE age >= 25;
 TrueSELECT * FROM users WHERE age < 30;
 TrueSELECT * FROM users WHERE age <= 30;
 TrueSELECT * FROM users WHERE age = 25;
 TrueSELECT * FROM users WHERE age != 25;
 TrueSELECT * FROM users WHERE age <> 25;
 ```

#### 3.2.2 逻辑运算符
```sql
 True-- AND 运算符
 TrueSELECT * FROM users WHERE age > 25 AND status = 1;
 TrueSELECT * FROM users WHERE age > 20 AND age < 30 AND gender = '男';
 True-- OR 运算符
 TrueSELECT * FROM users WHERE status = 1 OR status = 2;
 TrueSELECT * FROM users WHERE username = '张三' OR username = '李四';
 True-- NOT 运算符
 TrueSELECT * FROM users WHERE NOT status = 0;
 TrueSELECT * FROM users WHERE NOT (age < 20 OR age > 30);
 True-- 组合逻辑
 TrueSELECT * FROM users 
 TrueWHERE (age > 25 AND status = 1) OR (age < 20 AND status = 2);
 ```

#### 3.2.3 范围查询
```sql
 True-- BETWEEN（闭区间）
 TrueSELECT * FROM users WHERE age BETWEEN 20 AND 30;
 TrueSELECT * FROM users WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';
 True-- NOT BETWEEN
 TrueSELECT * FROM users WHERE age NOT BETWEEN 20 AND 30;
 ```

#### 3.2.4 IN 和 NOT IN
```sql
 True-- IN（匹配列表中的任意值）
 TrueSELECT * FROM users WHERE status IN (1, 2, 3);
 TrueSELECT * FROM users WHERE username IN ('张三', '李四', '王五');
 True-- 子查询 IN
 TrueSELECT * FROM users WHERE id IN (SELECT user_id FROM vip_users);
 True-- NOT IN
 TrueSELECT * FROM users WHERE status NOT IN (0, -1);
 ```

#### 3.2.5 LIKE 模糊查询
```sql
 True-- %：匹配任意长度字符
 TrueSELECT * FROM users WHERE username LIKE '张%'; -- 以张开头
 TrueSELECT * FROM users WHERE username LIKE '%张%'; -- 包含张
 TrueSELECT * FROM users WHERE username LIKE '%张'; -- 以张结尾
 True-- _：匹配单个字符
 TrueSELECT * FROM users WHERE username LIKE '张_'; -- 张后面一个字
 TrueSELECT * FROM users WHERE username LIKE '__张'; -- 张前面两个字
 True-- 组合使用
 TrueSELECT * FROM users WHERE phone LIKE '138%'; -- 手机号以138开头
 TrueSELECT * FROM users WHERE email LIKE '%@gmail.com'; -- Gmail邮箱
 True-- NOT LIKE
 TrueSELECT * FROM users WHERE username NOT LIKE '%admin%';
 True-- ESCAPE 转义字符
 TrueSELECT * FROM users WHERE username LIKE '%100%%' ESCAPE '%';
 ```

#### 3.2.6 NULL 值查询
```sql
 True-- IS NULL
 TrueSELECT * FROM users WHERE email IS NULL;
 TrueSELECT * FROM users WHERE deleted_at IS NULL;
 True-- IS NOT NULL
 TrueSELECT * FROM users WHERE email IS NOT NULL;
 True-- 注意事项：不要使用 = NULL 或 != NULL
 True-- 错误：SELECT * FROM users WHERE email = NULL;
 True-- 正确：SELECT * FROM users WHERE email IS NULL;
 ```

#### 3.2.7 条件查询实战
```sql
 True-- 查询所有女性员工
 TrueSELECT * FROM employees_info WHERE Employees_sex = '女';
 True-- 查询女性员工且入职日期小于2015年
 TrueSELECT * FROM employees_info WHERE Employees_sex = '女' AND Hiredate < '2015-01-01';
 True-- 查询工龄超过15年的员工
 TrueSELECT *, YEAR(NOW()) - YEAR(Hiredate) AS 工龄 
 from employees_info 
 TrueWHERE YEAR(NOW()) - YEAR(Hiredate) > 15;
 True-- 查询岗位编号在cg1001到hr1001之间的员工
 TrueSELECT * FROM employees_info WHERE Post_id BETWEEN 'cg1001' AND 'hr1001';
 True-- 查询特定岗位的员工
 TrueSELECT * FROM employees_info WHERE Post_id IN ('cg1001', 'hr1001');
 True-- 模糊查询：姓名包含"王"的员工
 TrueSELECT * FROM employees_info WHERE Employees_name LIKE '%王%';
 True-- 查询年龄大于30岁的客户
 TrueSELECT *, YEAR(NOW()) - YEAR(Customer_Birth) AS 年龄 
 from customer_info 
 TrueWHERE YEAR(NOW()) - YEAR(Customer_Birth) > 30;
 True-- 查询没有填写出生日期的客户
 TrueSELECT * FROM customer_info WHERE Customer_Birth IS NULL;
 ```

### 3.3 排序与分页详解
#### 3.3.1 ORDER BY 排序
```sql
 True-- 升序排序（ASC，默认）
 TrueSELECT * FROM users ORDER BY age ASC;
 TrueSELECT * FROM users ORDER BY age; -- 默认升序
 True-- 降序排序（DESC）
 TrueSELECT * FROM users ORDER BY created_at DESC;
 True-- 多列排序
 TrueSELECT * FROM users ORDER BY status ASC, age DESC;
 True-- 按表达式排序
 TrueSELECT *, age * 365 AS days_alive FROM users ORDER BY days_alive DESC;
 True-- 按别名排序
 TrueSELECT *, price * quantity AS subtotal FROM order_items ORDER BY subtotal DESC;
 True-- 按列序号排序（不推荐）
 TrueSELECT id, username, email FROM users ORDER BY 3; -- 按第3列排序
 ```

#### 3.3.2 LIMIT 分页
```sql
 True-- 查询前10条
 TrueSELECT * FROM users LIMIT 10;
 True-- 查询第11-20条（分页）
 TrueSELECT * FROM users LIMIT 10 OFFSET 10;
 TrueSELECT * FROM users LIMIT 10, 10; -- 简写形式
 True-- 查询最后5条
 TrueSELECT * FROM users ORDER BY id DESC LIMIT 5;
 True-- 分页查询示例
 True-- 第1页
 TrueSELECT * FROM users ORDER BY id LIMIT 10 OFFSET 0;
 True-- 第2页
 TrueSELECT * FROM users ORDER BY id LIMIT 10 OFFSET 10;
 True-- 第3页
 TrueSELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;
 True-- 限制影响行数
 TrueSELECT * FROM users LIMIT 1;
 ```

### 3.4 分组查询详解
#### 3.4.1 GROUP BY 基础
```sql
 True-- 基本分组
 TrueSELECT status, COUNT(*) AS count FROM users GROUP BY status;
 True-- 按多个字段分组
 TrueSELECT province, city, COUNT(*) AS count FROM users GROUP BY province, city;
 True-- 分组并计算平均值
 TrueSELECT status, AVG(age) AS avg_age FROM users GROUP BY status;
 True-- 分组并计算总和
 TrueSELECT status, SUM(balance) AS total_balance FROM users GROUP BY status;
 ```

#### 3.4.2 HAVING 子句
HAVING 用于过滤分组后的结果，WHERE 用于过滤分组前的记录。
```sql
 True-- HAVING 基本用法
 TrueSELECT status, COUNT(*) AS count 
 from users 
 TrueGROUP BY status 
 TrueHAVING count > 10;
 True-- HAVING 与 WHERE 组合
 TrueSELECT status, AVG(age) AS avg_age, COUNT(*) AS count
 from users
 TrueWHERE age > 0 -- 先过滤
 TrueGROUP BY status -- 再分组
 TrueHAVING count > 5; -- 最后过滤分组结果
 True-- 多条件 HAVING
 TrueSELECT status, COUNT(*) AS count, AVG(age) AS avg_age
 from users
 TrueGROUP BY status
 TrueHAVING count > 10 AND avg_age > 25;
 ```

#### 3.4.3 GROUP BY 实战
```sql
 True-- 统计男性和女性客户人数
 TrueSELECT COUNT(Customer_name) AS 人数, Customer_sex AS 性别 
 from customer_info GROUP BY Customer_sex;
 True-- 统计每件商品的销售总数
 TrueSELECT Commodity_id, SUM(Sales_Number) AS 总数 
 from sales_list GROUP BY Commodity_id;
 True-- 找出销售均价高于1500元的商品
 TrueSELECT Commodity_id, AVG(Sales_price) AS 平均售价 
 from sales_list 
 TrueGROUP BY Commodity_id 
 TrueHAVING AVG(Sales_price) > 1500;
 True-- 找出畅销商品（销售总数量超过50）
 TrueSELECT Commodity_id, SUM(Sales_Number) AS 总数量 
 from sales_list 
 TrueGROUP BY Commodity_id 
 TrueHAVING SUM(Sales_Number) > 50;
 ```

#### 3.4.4 GROUP BY 注意事项
```sql
 True-- MySQL 5.7+ 默认开启 ONLY_FULL_GROUP_BY 模式
 True-- SELECT 中未在 GROUP BY 中指定的列不能直接 SELECT
 True-- 错误示例：
 True-- SELECT id, status, COUNT(*) FROM users GROUP BY status;
 True-- 正确写法：
 TrueSELECT status, COUNT(*) FROM users GROUP BY status;
 TrueSELECT ANY_VALUE(id), status, COUNT(*) FROM users GROUP BY status;
 ```

### 3.5 聚合函数详解
#### 3.5.1 常用聚合函数
| 函数 | 说明 | 示例 |
| :--- | :--- | :--- |
| COUNT | 计数 | COUNT(*)、COUNT(column)、COUNT(DISTINCT column) |
| SUM | 求和 | SUM(price)、SUM(quantity) |
| AVG | 平均值 | AVG(price) |
| MAX | 最大值 | MAX(price)、MAX(created_at) |
| MIN | 最小值 | MIN(price)、MIN(created_at) |
| GROUP_CONCAT | 拼接字符串 | GROUP_CONCAT(username SEPARATOR ',') |
#### 3.5.2 COUNT 用法
```sql
 True-- COUNT(*)：统计所有行数，包括 NULL
 TrueSELECT COUNT(*) FROM users;
 True-- COUNT(column)：统计非 NULL 值数量
 TrueSELECT COUNT(email) FROM users;
 True-- COUNT(DISTINCT)：统计不同值的数量
 TrueSELECT COUNT(DISTINCT status) FROM users;
 TrueSELECT COUNT(DISTINCT province, city) FROM users;
 ```

#### 3.5.3 聚合函数综合示例
```sql
 True-- 统计采购总成本
 TrueSELECT SUM(Purchase_price * Purchase_Number) AS 总成本 FROM purchase_list;
 True-- 统计平均采购数量、最大采购数量、最小采购数量
 TrueSELECT 
  AVG(Purchase_Number) AS 平均采购数量, 
  MAX(Purchase_Number) AS 最大采购数量, 
  MIN(Purchase_Number) AS 最小采购数量 
 from purchase_list;
 True-- 按采购单统计
 TrueSELECT 
  Purchase_id, 
  SUM(Purchase_Number) AS 总量, 
  AVG(Purchase_Number) AS 平均, 
  MAX(Purchase_Number) AS 最大, 
  MIN(Purchase_Number) AS 最小 
 from purchase_list 
 TrueGROUP BY Purchase_id;
 ```

---
### 更新日志 (Changelog)
- 2026-05-27: 拆分为独立文件，添加元数据，版本升级至 v4.0.0
- 2026-04-30: 大幅细化内容，添加 DML/DQL 详解、聚合函数、实战示例等
- 2026-04-05: 整合 SQL 基础语法知识

## 延伸阅读

- [[data-analysis/pandas|Pandas 数据操作]]
