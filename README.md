# Somnus Docs

Somnus Docs 是计划发布到 [docs.somnus.top](https://docs.somnus.top/) 的个人技术文档站。项目使用 MkDocs Material 构建，内容面向长期维护的手册、配置模板、实验命令和排错记录，而不是按发布日期组织的博客文章。

当前栏目包括：

- `Self-hosting`：Caddy、Vaultwarden、AFFiNE 等个人服务部署。
- `Linux`：Zsh、tmux、CachyOS / Arch 系统维护。
- `Research`：RAFT-Stereo 等计算机视觉实验记录。
- `Tools`：Hugo、Typst、Git 与 GitHub 协作流程。

## 环境要求

- Python 3.10 或更高版本，推荐 Python 3.12。
- Git，用于本地版本管理和页面修订日期生成。

`mkdocs-git-revision-date-localized-plugin` 当前版本要求 Python 3.10+。修订日期插件在 GitHub Actions 发布构建中启用，工作流会检出完整 Git 历史；本地预览默认关闭该插件，使尚未提交的空项目也能通过严格构建。

## 本地开发

创建虚拟环境并安装依赖：

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

启动本地预览：

```bash
mkdocs serve
```

浏览器访问 `http://127.0.0.1:8000/` 查看站点；修改 `docs/` 中的 Markdown 文件后页面会自动刷新。

仓库已有提交历史后，需要在本地同时预览修订日期时可运行：

```bash
CI=true mkdocs serve
```

执行严格构建检查：

```bash
mkdocs build --strict
```

构建产物写入 `site/`，该目录已被 Git 忽略。

## 内容结构

```text
docs/
├── index.md
├── self-hosting/
├── linux/
├── research/
├── tools/
└── assets/stylesheets/extra.css
```

新增页面时，应同时在 `mkdocs.yml` 的 `nav` 中登记入口，并至少写明页面用途、可执行模板、注意事项与后续完善方向。

## 自动部署

工作流文件 `.github/workflows/deploy.yml` 会在提交推送至 `main` 分支时执行以下步骤：

1. 使用 Python 3.12 安装 `requirements.txt` 中的依赖。
2. 运行 `mkdocs build --strict` 生成静态站点。
3. 通过 GitHub 官方 Pages Actions 上传 `site/` 并发布到 GitHub Pages。

首次部署前，在仓库页面打开：

`Repository Settings -> Pages -> Build and deployment -> Source`

将 Source 选择为 **GitHub Actions**。随后将项目推送到 `somnus4214/somnus-docs` 仓库的 `main` 分支即可触发部署。

## 自定义域名

要将站点发布为 `docs.somnus.top`：

1. 在 GitHub 仓库的 **Settings -> Pages -> Custom domain** 中填写 `docs.somnus.top`，保存后启用 HTTPS。
2. 在域名 DNS 服务商处添加 `CNAME` 记录，将主机记录 `docs` 指向 `somnus4214.github.io`。
3. DNS 生效和 GitHub 校验完成后，确认 `https://docs.somnus.top/` 能正常访问并启用 HTTPS 强制跳转。

更换域名配置期间，保留 GitHub Pages 提供的默认地址用于验证部署产物是否正常。

## 后续内容规划

- 将真实自托管服务的备份、升级和恢复演练流程整理为可执行检查单。
- 补齐 CachyOS 日常维护、服务器初始化与故障处理记录。
- 将 RAFT-Stereo 的环境、Middlebury2014、FP16 和轻量化结果持续版本化。
- 沉淀 Typst 模板发布及个人静态站自动部署的稳定流程。
