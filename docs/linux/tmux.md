# tmux

## 页面说明

tmux 用于保持远程会话、复用窗格和恢复工作现场。本页收集低记忆成本的快捷键和基础配置，前缀键以下以默认 `Ctrl-b` 表示。

## 常用命令与快捷键

| 操作 | 命令或快捷键 |
| --- | --- |
| 新建命名会话 | `tmux new -s work` |
| 列出会话 | `tmux ls` |
| 恢复会话 | `tmux attach -t work` |
| 暂时离开 | `Ctrl-b d` |
| 新建窗口 | `Ctrl-b c` |
| 垂直/水平拆分 | `Ctrl-b %` / `Ctrl-b "` |
| 切换窗格 | `Ctrl-b` 加方向键 |

## 配置模板

```tmux
# ~/.tmux.conf
set -g mouse on
set -g history-limit 20000
set -g base-index 1
setw -g pane-base-index 1
set -g status-interval 5

bind r source-file ~/.tmux.conf \; display-message "配置已重载"
```

```bash
tmux source-file ~/.tmux.conf
tmux list-keys | less
```

## 注意事项

- 远程 SSH 连接中运行长期任务时，先确认任务确实位于 tmux 会话内再断开。
- 更换前缀键需要同步更新肌肉记忆和文档，否则现场排障容易混乱。
- 复制模式与系统剪贴板行为受终端、SSH 和操作系统共同影响，应单独测试。

## TODO

- [ ] 添加个人窗口命名规范和常用布局。
- [ ] 记录复制到系统剪贴板的跨平台配置。
- [ ] 评估 tmux 插件管理器与会话恢复插件。
