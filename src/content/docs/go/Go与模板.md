---
order: 77
title: 'Go与模板'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'text/template与html/template'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 模板

```go
tmpl := template.Must(template.New("hello").Parse("Hello, {{.Name}}!"))
tmpl.Execute(os.Stdout, struct{ Name string }{"Alice"})
```
