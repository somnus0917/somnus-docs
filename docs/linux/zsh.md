# Zsh 与终端提示符

## 页面说明

本页用于新机器上的终端初始化，包括 Zsh、Oh My Zsh、自动提示插件与可选提示符主题。Zsh 基本兼容常见 Bash 交互命令，但依赖 `source setup.bash` 的开发环境应单独确认加载脚本是否兼容。

## 安装并切换 Shell

```bash
# Ubuntu / Debian
sudo apt update
sudo apt install -y zsh git curl

# Arch / CachyOS
sudo pacman -S zsh git curl

# macOS 已预装 zsh，必要时通过 Homebrew 更新
brew install zsh
```

确认安装并切换默认 Shell：

```bash
zsh --version
chsh -s "$(command -v zsh)"
echo "$SHELL"
```

`chsh` 后需要退出当前登录会话再重新进入，`echo "$SHELL"` 才会反映新的默认 Shell。

## Oh My Zsh 与插件

安装前备份已有配置；以下为 Oh My Zsh 官方安装脚本入口：

```bash
cp -a ~/.zshrc ~/.zshrc.bak 2>/dev/null || true
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

git clone https://github.com/zsh-users/zsh-autosuggestions \
  "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions"
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \
  "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting"
```

在 `~/.zshrc` 中启用插件：

```zsh
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)

autoload -Uz compinit
compinit
```

```bash
source ~/.zshrc
```

## 提示符方案

Starship 适合跨机器维护同一套轻量配置。安装后在 `~/.zshrc` 加入初始化命令：

```bash
curl -sS https://starship.rs/install.sh | sh
mkdir -p ~/.config
```

```zsh
eval "$(starship init zsh)"
```

`~/.config/starship.toml` 示例：

```toml
add_newline = false

[directory]
truncation_length = 4

[git_branch]
symbol = "git:"
```

若希望使用 Powerlevel10k，应选择它代替 Starship，避免叠加两个提示符初始化器：

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
```

```zsh
ZSH_THEME="powerlevel10k/powerlevel10k"
```

```bash
source ~/.zshrc
p10k configure
```

Powerlevel10k 的图标显示依赖 Nerd Font，应先在终端中设置支持图标的等宽字体。

## 注意事项

- 安装 Oh My Zsh 前备份已有 `.zshrc`，避免安装脚本覆盖个人配置。
- 执行来自网络的安装脚本前应先查看脚本来源；服务器环境可优先使用发行版的软件包。
- 性能变慢时使用 `zsh -xv` 或逐步禁用插件排查，不要无限叠加插件。
- 服务器环境应保持提示符简单，避免依赖未安装字体导致字符显示异常。

## TODO

- [ ] 整理真实插件清单及加载耗时对比。
- [ ] 补充 macOS 与 Linux 共用配置的组织方式。
- [ ] 记录 Nerd Font 安装与终端图标显示检查结果。
