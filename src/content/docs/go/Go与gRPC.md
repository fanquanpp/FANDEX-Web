---
order: 61
title: 'Go与gRPC'
module: 'go'
category: 'Go'
difficulty: 'intermediate'
description: 'gRPC服务开发'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. gRPC 服务

```go
type GreeterServer struct { pb.UnimplementedGreeterServer }

func (s *GreeterServer) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloReply, error) {
  return &pb.HelloReply{Message: "Hello " + req.Name}, nil
}

lis, _ := net.Listen("tcp", ":50051")
grpc.NewServer().Serve(lis)
```
