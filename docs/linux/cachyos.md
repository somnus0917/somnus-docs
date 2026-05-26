# CachyOS 与 Arch 系维护

## 页面说明

本页记录 CachyOS 的双系统安装排错、国内镜像源处理方式，以及 Arch 系滚动发行版的日常维护命令。安装引导器或修改磁盘前，必须提前备份重要文件并准备可启动恢复介质。

## 安装前检查

- 使用 UEFI 模式启动安装介质，并在主板设置中关闭 CSM / Legacy 兼容启动。
- 双硬盘安装 Windows 与 CachyOS 时，确认目标 Linux 磁盘及其 EFI 分区。
- 关闭可能阻碍安装或第三方驱动加载的 Secure Boot 设置，具体要求以当前安装文档为准。
- 安装步骤可参考 [Shorin CachyOS 指南](https://github.com/SHORiN-KiWATA/Shorin-ArchLinux-Guide/wiki/CachyOS)，本页集中记录容易复现的异常。

## 双系统引导排错

### 安装器报告 `grub-install` 失败

可能出现以下错误：

```text
The bootloader could not be installed. The installation command
grub-install --target=i386-pc --recheck --force /dev/nvme0n1
returned error code 1.
```

在分区步骤中检查安装器左下角的 bootloader 目标位置，确保引导器安装到准备承载 CachyOS 的磁盘，而不是误选 Windows 所在磁盘或错误的传统启动目标。若安装器以 Legacy 方式启动，应重新用 UEFI 模式启动安装介质后再安装。

### 重启后直接进入 Windows

先在 BIOS/UEFI 中确认启动顺序是否选择了 Linux 引导项。如果 GRUB 无法发现 Windows，且两块硬盘采用了不同启动模式，检查主板是否开启 CSM。Windows 与 Linux 应统一使用 UEFI 启动；关闭 CSM 后，必要时重新安装引导器或系统。

## 安装阶段更换镜像源

若安装环境中下载速度过慢，可在 Live ISO 中将 CachyOS 与 Arch 镜像列表临时改为中科大镜像。执行前先保留原配置，便于失败时恢复：

```bash
cd /etc/pacman.d/
sudo cp cachyos-mirrorlist cachyos-mirrorlist.bak
sudo cp mirrorlist mirrorlist.bak

sudo tee cachyos-mirrorlist >/dev/null <<'EOF'
Server = https://mirrors.ustc.edu.cn/cachyos/repo/$arch/$repo
EOF

sudo tee cachyos-v3-mirrorlist >/dev/null <<'EOF'
Server = https://mirrors.ustc.edu.cn/cachyos/repo/$arch_v3/$repo
EOF

sudo tee cachyos-v4-mirrorlist >/dev/null <<'EOF'
Server = https://mirrors.ustc.edu.cn/cachyos/repo/$arch_v4/$repo
EOF

sudo tee mirrorlist >/dev/null <<'EOF'
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
EOF
```

此操作针对安装阶段的网络问题；安装完成后应根据所在地区、当前镜像可用状态及 CachyOS 官方建议维护镜像列表。

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

## 安装常用软件与 Shell

安装 AUR helper 后，可以安装仅在 AUR 提供的软件。安装任何 AUR 包前都应检查 `PKGBUILD`：

```bash
paru -S clash-verge-rev-bin
```

若希望从系统默认 Shell 切换到 Zsh：

```bash
echo "$SHELL"
sudo pacman -S zsh
chsh -s /usr/bin/zsh
```

重新登录后使用 `echo "$SHELL"` 核验结果。详细插件与提示符配置参见 [Zsh 与终端提示符](zsh.md)。

## 注意事项

- Arch 系不建议长期执行局部升级；安装软件前通常先完成完整系统更新。
- 升级内核、引导器或显卡驱动前确认可用的回滚入口与启动介质。
- AUR 包来自用户维护脚本，更新前阅读 `PKGBUILD` 变更并优先保留构建日志。
- 双系统修复引导时先确认两套系统的启动模式，混用 UEFI 与 Legacy 通常会让排错复杂化。

## TODO

- [ ] 补充 CachyOS 实际内核选择与 NVIDIA/AMD 驱动记录。
- [ ] 记录 pacman keyring 与包冲突问题的解决流程。
- [ ] 添加 Btrfs 快照或其他更新前回滚策略。
