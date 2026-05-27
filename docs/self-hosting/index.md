# Self-hosting

本栏目记录运行在个人服务器上的服务部署方式、反向代理配置、升级流程与数据保护策略。配置示例中的域名、路径和密钥应按实际环境替换。

## 目录

- [Caddy](caddy.md)：HTTPS 入口、反向代理模板与容器内重载命令。
- [Vaultwarden](vaultwarden.md)：密码库服务的 Compose 部署、HTTPS 入口和备份检查点。
- [AFFiNE](affine.md)：知识库服务的 Compose 运维、代理和 AI 配置提醒。

<!-- prettier-ignore -->
!!! warning "先保护数据"
    对存在持久化数据的服务，升级镜像或修改 Compose 文件之前先制作可恢复的备份，并记录恢复验证结果。
