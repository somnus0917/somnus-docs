# Git 与 GitHub 协作

## 页面说明

本页保存高频 Git 命令、分支与标签规则，以及通过 GitHub Pull Request 合并变更的最小流程，作为多个个人项目共享的操作参考。

## 常用命令

```bash
git status --short --branch
git switch -c docs/add-topic
git add docs/
git commit -m "docs: add topic notes"
git fetch origin
git rebase origin/main
git push -u origin docs/add-topic
```

## 分支与 Tag 模板

| 类型 | 示例 | 用途 |
| --- | --- | --- |
| 文档变更分支 | `docs/caddy-backup` | 内容新增或更正 |
| 功能分支 | `feat/search-config` | 配置或能力更新 |
| 修复分支 | `fix/pages-build` | 构建或发布修复 |
| 发布标签 | `v0.1.0` | 稳定里程碑 |

```bash
git tag -a v0.1.0 -m "Somnus Docs v0.1.0"
git push origin v0.1.0
```

## GitHub PR 流程

```bash
git switch main
git pull --ff-only origin main
git switch -c docs/new-note
# 编辑、构建验证并提交
git push -u origin docs/new-note
gh pr create --fill
```

PR 描述至少说明变更范围、本地验证命令和影响到的导航或部署配置。

## 注意事项

- 提交前运行站点构建，避免将导航断链或 YAML 配置错误推送到主分支。
- 不将密钥、真实 `.env` 或生成的 `site/` 目录纳入版本控制。
- 已共享的提交需要改写历史时，先确认协作者和部署影响，再执行强制推送。

## TODO

- [ ] 定义此站点使用的提交信息和发布标签规范。
- [ ] 增加 GitHub Pages 部署失败后的回滚操作记录。
- [ ] 添加常见冲突解决案例和 PR 检查清单。
