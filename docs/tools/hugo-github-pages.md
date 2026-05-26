# Hugo 与 GitHub Pages

## 页面说明

本页用于记录 Hugo 站点通过 GitHub Actions 发布至 GitHub Pages 的流程。它服务于已有博客或未来站点维护，与当前 MkDocs 文档站的构建配置相互独立。

## 本地命令模板

```bash
hugo version
hugo server -D
hugo --minify
```

## Actions 工作流模板

```yaml
name: Deploy Hugo

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: latest
          extended: true
      - run: hugo --minify
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: public
      - id: deployment
        uses: actions/deploy-pages@v4
```

## 注意事项

- Hugo 主题使用 Git submodule 时，检出步骤必须加载子模块并固定可回退的版本。
- 自定义域名、HTTPS 与 DNS 变更应在 Pages 设置和域名服务商处一并核验。
- 站点生成目录通常不进入源码分支，发布产物由 Actions 上传。

## TODO

- [ ] 记录 `somnus.top` 当前 Hugo 版本、主题来源与构建参数。
- [ ] 整理 DNS 和自定义域名迁移检查清单。
- [ ] 添加发布失败日志的常见定位步骤。
