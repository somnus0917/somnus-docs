# tmux

## 页面说明

tmux 用于保持远程会话、复用窗口与窗格，适合 SSH 中运行训练或编译等长任务。本页配置将默认前缀键从 `Ctrl-b` 更换为 `Ctrl-a`，下方快捷键均基于这一设置。

tmux 的结构是：

```text
session（会话）
└── window（窗口）
    └── pane（窗格）
```

## 安装

```bash
# Ubuntu / Debian
sudo apt install tmux

# Fedora
sudo dnf install tmux

# Arch / CachyOS
sudo pacman -S tmux

# macOS
brew install tmux
```

## 常用命令与快捷键

| 操作 | 命令或快捷键 |
| --- | --- |
| 新建命名会话 | `tmux new -s work` |
| 列出会话 | `tmux ls` |
| 恢复会话 | `tmux attach -t work` |
| 删除会话 | `tmux kill-session -t work` |
| 暂时离开 | `Ctrl-a d` |
| 新建窗口 | `Ctrl-a c` |
| 上/下一个窗口 | `Ctrl-a p` / `Ctrl-a n` |
| 垂直/水平拆分 | `Ctrl-a %` / `Ctrl-a "` |
| 切换窗格 | `Ctrl-a` 加方向键 |
| 放大/还原窗格 | `Ctrl-a z` |
| 进入复制模式 | `Ctrl-a [` |

## 配置 TPM 与主题

安装 TPM（tmux Plugin Manager）：

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

写入 `~/.tmux.conf`：

```tmux
set -g prefix C-a
unbind C-b
bind C-a send-prefix

set -g mouse on
set -g history-limit 20000
set -g base-index 1
setw -g pane-base-index 1
set -g status-interval 5

set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'catppuccin/tmux'
set -g @catppuccin_flavour 'mocha'

bind r source-file ~/.tmux.conf \; display-message "配置已重载"

# TPM 初始化必须放在插件设置之后
run '~/.tmux/plugins/tpm/tpm'
```

启动 `tmux` 后按 `Ctrl-a`，再按大写 `I` 安装插件。修改配置后可重新加载：

```bash
tmux source-file ~/.tmux.conf
tmux list-keys | less
```

## 远程任务工作流

```bash
ssh user@server
tmux new -s train
# 在会话中启动任务；临时离开时按 Ctrl-a d
tmux attach -t train
```

网络断开后重新 SSH 登录，再执行 `tmux attach -t train` 即可回到仍在运行的终端会话。

## 注意事项

- 远程 SSH 连接中运行长期任务时，先确认任务确实位于 tmux 会话内再断开。
- 本页已经更换前缀键为 `Ctrl-a`；连接到使用默认配置的机器时应改用 `Ctrl-b`。
- 复制模式与系统剪贴板行为受终端、SSH 和操作系统共同影响，应单独测试。

## TODO

- [ ] 添加个人窗口命名规范和常用布局。
- [ ] 记录复制到系统剪贴板的跨平台配置。
- [ ] 评估会话恢复插件。
