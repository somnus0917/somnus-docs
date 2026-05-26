# Vaultwarden

## 页面说明

Vaultwarden 是轻量的 Bitwarden 兼容密码库服务。本页整理以 Docker Compose 和 Caddy 部署个人实例的步骤。客户端自动填充和浏览器扩展需要 HTTPS，因此部署前应先准备域名和可开放 `80`、`443` 端口的服务器。

## 部署前准备

- 一台已经安装 Docker 与 Docker Compose 的 Linux 服务器。
- 一个解析到服务器公网 IP 的子域名，例如 `pwd.example.com`。
- 防火墙或安全组放行 TCP `80` 和 `443`，供 Caddy 申请和续签证书。
- 一份脱离服务器保存的备份位置，密码库数据不能只留在运行实例中。

若所在网络无法直接拉取 Docker Hub 镜像，可在确认代理服务可信后临时从镜像代理拉取，再按实际镜像名称调整 Compose 配置：

```bash
docker pull docker.1ms.run/vaultwarden/server:latest
docker pull docker.1ms.run/library/caddy:2
```

## 创建部署目录

```bash
mkdir -p ~/services/vaultwarden
cd ~/services/vaultwarden
```

创建 `Caddyfile`，将域名替换成自己的记录：

```caddyfile
pwd.example.com {
    encode zstd gzip
    reverse_proxy vaultwarden:80
}
```

## Compose 部署

创建 `docker-compose.yaml`：

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: https://pwd.example.com
      SIGNUPS_ALLOWED: "true" # 首次注册完成后改为 false
    volumes:
      - ./vw-data:/data

  caddy:
    image: caddy:2
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - ./caddy-data:/data
      - ./caddy-config:/config
    depends_on:
      - vaultwarden
```

启动并检查服务：

```bash
docker compose up -d
docker compose ps
docker compose logs --tail=100 caddy vaultwarden
```

访问 `https://pwd.example.com` 注册第一个账号，并妥善保存主密码。注册完成后，将 `SIGNUPS_ALLOWED` 改为 `"false"`，再应用配置：

```bash
docker compose up -d
```

## 维护与备份

在升级前先停止写入并备份持久化目录：

```bash
cd ~/services/vaultwarden
docker compose stop vaultwarden
tar -czf "vaultwarden-data-$(date +%F).tar.gz" vw-data
docker compose start vaultwarden

docker compose pull
docker compose up -d
docker compose logs --tail=100 vaultwarden
```

## 注意事项

- `./vw-data` 包含数据库、附件和密钥相关数据，升级前必须完整备份。
- 备份的价值取决于恢复测试；应定期在隔离环境验证能否登录并读取附件。
- 主密码忘记后无法由服务端恢复；应使用可靠的离线方式保存恢复信息。
- 管理令牌、SMTP 凭据等敏感项应存入服务器环境文件或密钥管理工具，不能提交至 Git。
- 使用中国大陆服务器公开提供网站服务时，应按服务商和监管要求确认备案条件。

## TODO

- [ ] 固定镜像版本并记录安全升级流程。
- [ ] 添加备份保留周期和恢复演练日志。
- [ ] 补充 SMTP 与客户端首次连接检查步骤。
