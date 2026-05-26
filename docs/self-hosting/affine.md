# AFFiNE

## 页面说明

AFFiNE 用于自建知识管理与协作。本页保留 Compose 维护命令、入口代理和 AI 能力接入时需要检查的配置项，具体服务拓扑将随实际部署更新。

## Compose 维护命令

```bash
docker compose pull
docker compose up -d
docker compose ps
docker compose logs --tail=150 affine
docker compose exec affine printenv | grep -E 'AFFINE|AI|OPENAI'
```

升级前可先导出当前 Compose 合并结果，方便追踪环境变量和挂载变化：

```bash
docker compose config > compose.resolved.yml
```

## Caddy 代理示例

```caddyfile
affine.somnus.top {
    encode zstd gzip
    reverse_proxy affine:3010
}
```

## AI 配置提醒

接入 DeepSeek 或 DashScope 时，先确认 AFFiNE 当前版本支持的 OpenAI 兼容配置名称，再在私有环境文件中设置对应值：

```dotenv
# 名称以部署版本的官方文档为准，不要直接照抄到生产环境。
OPENAI_API_KEY=replace-with-secret
OPENAI_BASE_URL=https://api.deepseek.com/v1
OPENAI_MODEL=deepseek-chat
```

使用 DashScope 时需替换为其 OpenAI 兼容端点与可用模型，并检查账户所在区域、额度和数据隐私需求。

## 注意事项

- 数据库、对象存储或持久化卷均应纳入升级前备份范围。
- `.env` 文件包含 API Key 和数据库凭据，应在 `.gitignore` 中单独保护后再投入真实部署。
- AI 请求失败时优先核对端点、模型标识、额度与容器到外网的网络连通性。

## TODO

- [ ] 根据正式部署补全数据库、缓存与存储服务拓扑。
- [ ] 验证 DeepSeek / DashScope 在当前版本中的环境变量名称。
- [ ] 编写升级前备份和升级后功能验收清单。
