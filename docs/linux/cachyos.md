# CachyOS 与 Arch 系维护

## 页面说明

本页记录 CachyOS / Arch 系滚动发行版的更新步骤、`pacman` 与 AUR 日常命令，以及升级失败时需要先收集的信息。

## 常用维护命令

```bash
sudo pacman -Syu
sudo pacman -S --needed base-devel git
pacman -Qdtq
pacman -Q | grep -i linux

# 使用已安装的 AUR helper 时
paru -Syu
paru -Qua
```

收集排错信息的模板：

```bash
uname -a
pacman -Q linux linux-cachyos 2>/dev/null
sudo journalctl -b -p warning..alert
```

## 常见问题记录模板

```markdown
### YYYY-MM-DD：问题标题

- 更新前状态：
- 触发命令：
- 错误原文：
- 处理步骤：
- 回滚或验证结果：
```

## 注意事项

- Arch 系不建议长期执行局部升级；安装软件前通常先完成完整系统更新。
- 升级内核、引导器或显卡驱动前确认可用的回滚入口与启动介质。
- AUR 包来自用户维护脚本，更新前阅读 `PKGBUILD` 变更并优先保留构建日志。

## TODO

- [ ] 补充 CachyOS 实际内核选择与 NVIDIA/AMD 驱动记录。
- [ ] 记录 pacman keyring、镜像源与包冲突问题的解决流程。
- [ ] 添加 Btrfs 快照或其他更新前回滚策略。
