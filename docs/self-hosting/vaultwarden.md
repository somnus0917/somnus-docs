# Vaultwarden

## 页面说明

Vaultwarden 是轻量的 Bitwarden 兼容服务。本页作为部署记录入口，后续补入实际镜像版本、SMTP、管理员入口保护方式与恢复演练结果。

## Compose 模板

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    restart: unless-stopped
    environment:
      DOMAIN: https://vault.somnus.top
      SIGNUPS_ALLOWED: "false"
    volumes:
      - ./data:/data
    networks:
      - web

networks:
  web:
    external: true
```

## Caddy 代理示例

```caddyfile
vault.somnus.top {
    encode zstd gzip
    reverse_proxy vaultwarden:80
}
```

## 维护命令

```bash
docker compose pull vaultwarden
docker compose up -d vaultwarden
docker compose logs --tail=100 vaultwarden
```

## 注意事项

- `./data` 包含数据库、附件和密钥相关数据，升级前必须完整备份。
- 备份的价值取决于恢复测试；应定期在隔离环境验证能否登录并读取附件。
- 管理令牌、SMTP 凭据等敏感项应存入服务器环境文件或密钥管理工具，不提交至 Git。

## TODO

- [ ] 固定镜像版本并记录安全升级流程。
- [ ] 添加备份脚本、备份保留周期和恢复演练日志。
- [ ] 补充 SMTP 与客户端首次连接检查步骤。
