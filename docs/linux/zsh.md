# Zsh 与终端提示符

## 页面说明

本页用于沉淀新机器上的终端初始化过程，包括 Zsh、Oh My Zsh、Starship 的安装和个人选项。命令以常见 Linux 环境为起点。

## 初始化命令模板

```bash
zsh --version
chsh -s "$(command -v zsh)"

# 安装完成后确认实际加载文件
echo "$SHELL"
echo "$ZDOTDIR"
```

`~/.zshrc` 的可维护配置骨架：

```zsh
export EDITOR=nvim
export LANG=zh_CN.UTF-8

plugins=(git docker)

eval "$(starship init zsh)"
alias ll='ls -alh'
alias gs='git status --short --branch'
```

Starship 的轻量 `~/.config/starship.toml` 模板：

```toml
add_newline = false

[directory]
truncation_length = 4

[git_branch]
symbol = "git:"
```

## 注意事项

- 安装 Oh My Zsh 前备份已有 `.zshrc`，避免安装脚本覆盖个人配置。
- 性能变慢时使用 `zsh -xv` 或逐步禁用插件排查，不要无限叠加插件。
- 服务器环境应保持提示符简单，避免依赖未安装字体导致输出异常。

## TODO

- [ ] 整理真实插件清单及加载耗时对比。
- [ ] 补充 macOS 与 Linux 共用配置的组织方式。
- [ ] 记录字体安装与终端图标显示检查结果。
