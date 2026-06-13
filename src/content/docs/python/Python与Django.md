---
order: 59
title: 'Python与Django'
module: 'python'
category: 'Python'
difficulty: 'intermediate'
description: 'Django Web框架'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. Django 基础

```python
# models.py
class Article(models.Model):
  title = models.CharField(max_length=200)
  content = models.TextField()
  published = models.DateTimeField(auto_now_add=True)

# views.py
def article_list(request):
  articles = Article.objects.all()
  return render(request, 'articles.html', {'articles': articles})
```
