# 远程服务器基础操作

## 页面说明

本页整理通过 SSH 操作远程 Linux 服务器，以及在本地和服务器之间传输训练数据、日志与模型文件的常用命令。示例中的账号、域名、端口和路径都需要替换为实际值。

## SSH 连接

服务器使用默认 `22` 端口时：

```bash
ssh user@example-server
```

服务器使用自定义端口时：

```bash
ssh -p 44012 user@example-server
```

首次连接会显示主机指纹，应先与服务商控制台或管理员提供的指纹核对，再接受并保存到 `~/.ssh/known_hosts`。

## 使用 SCP 复制文件

`scp` 适合临时复制单个文件或体积不大的目录。它的端口参数为大写 `-P`：

```bash
# 从远程下载一个文件
scp -P 44012 user@example-server:/remote/path/train.log ~/Downloads/

# 从远程下载整个目录
scp -P 44012 -r user@example-server:/remote/path/checkpoints ~/work/project/

# 从本地上传文件
scp -P 44012 ./config.yaml user@example-server:/remote/path/
```

大文件传输中断后，`scp` 不便于恢复进度，此时优先使用 `rsync`。

## 使用 SFTP 交互浏览

需要先浏览远程目录再决定下载内容时，可使用 SFTP：

```bash
sftp -P 44012 user@example-server
```

进入交互界面后：

```text
pwd                       # 查看远程当前目录
ls -lh                    # 列出远程文件
cd /remote/path/logs      # 切换远程目录
lcd ~/Downloads           # 切换本地保存目录
get train.log             # 下载文件
put config.yaml           # 上传文件
exit                      # 退出
```

## 使用 Rsync 同步目录

`rsync` 适合同步数据集、检查点或输出目录，重复执行时只传输变动内容。非默认 SSH 端口应通过 `-e "ssh -p PORT"` 传递：

```bash
# 下载远程目录中的内容到本地目录
rsync -avz --progress -e "ssh -p 44012" \
  user@example-server:/remote/path/checkpoints/ \
  ~/work/project/checkpoints/

# 上传本地目录中的内容到远程目录
rsync -avz --progress -e "ssh -p 44012" \
  ./datasets/ \
  user@example-server:/remote/path/datasets/
```

源路径末尾的斜杠会影响复制结果：

- `checkpoints/` 表示同步该目录中的内容。
- `checkpoints` 表示同步目录本身及其内容。

对于可重跑的传输任务，可以增加 `--partial` 保留未完成文件，以便中断后继续同步：

```bash
rsync -avz --partial --progress -e "ssh -p 44012" \
  user@example-server:/remote/path/checkpoints/ \
  ~/work/project/checkpoints/
```

## 长任务建议

连接服务器开始训练或构建任务前，先进入 tmux 会话，避免 SSH 中断导致任务终止：

```bash
ssh -p 44012 user@example-server
tmux new -s train
```

详细会话操作参见 [tmux](tmux.md)。

## 注意事项

- 不要将服务器密码、私钥、访问令牌或真实内部地址写入公开文档和仓库。
- 训练数据或模型权重可能包含敏感内容；上传到第三方服务前确认授权范围。
- 使用 `rsync --delete` 前必须先加 `--dry-run` 检查删除范围，本页示例不默认启用该选项。
- 经常登录的服务器应配置 SSH 密钥并限制密码登录，密钥文件需设置适当权限。
