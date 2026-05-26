# Caddy 反向代理

## 页面说明

Caddy 作为公网入口负责自动 HTTPS 和服务转发。本页保存适用于个人服务的 `Caddyfile` 模板以及容器化维护命令，域名规划以 `docs.somnus.top` 同级子域名为例。

## 常用配置模板

单服务最小反向代理配置：

```caddyfile
service.somnus.top {
    encode zstd gzip
    reverse_proxy 127.0.0.1:8080
}
```

Vaultwarden 和 AFFiNE 的代理示例：

```caddyfile
vault.somnus.top {
    encode zstd gzip
    reverse_proxy vaultwarden:80
}

affine.somnus.top {
    encode zstd gzip
    reverse_proxy affine:3010
}
```

当 Caddy 与目标服务位于同一个 Docker 网络时，`vaultwarden` 和 `affine` 应使用 Compose 服务名；Caddy 在宿主机运行时，改用仅绑定到本机的映射端口。

## 容器内校验与重载

```bash
docker compose exec caddy caddy validate --config /etc/caddy/Caddyfile
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
docker compose logs --tail=100 caddy
```

## 注意事项

- 变更代理前确认 DNS 已指向服务器，且公网可访问 `80` 与 `443` 端口。
- 服务后台需要获取客户端协议或地址时，先核对其对反向代理头的信任设置。
- 不要将管理端口或调试接口直接暴露到公网；需要访问时优先使用内网或 VPN。

## TODO

- [ ] 补充生产环境使用的 Docker 网络名称与目录布局。
- [ ] 记录 Caddy 数据卷备份和证书故障排查步骤。
- [ ] 添加 WebSocket 与大文件上传服务的验证清单。
