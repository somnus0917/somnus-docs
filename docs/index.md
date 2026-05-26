# Somnus Docs

这里是 **Somnus 的个人技术文档站**，用于持续沉淀能够复用的技术手册、配置模板、实验命令与排错记录。内容以可执行、可检索和可长期维护为目标，而不是按时间线发布文章。

!!! info "文档站与博客的分工"
    [somnus.top](https://somnus.top) 记录折腾过程、项目复盘与思考；这个文档站则沉淀已经验证过的流程、命令与配置。当同一个问题再次出现时，应当能直接从这里找到操作答案。

## 从这里开始

<div class="grid cards" markdown>

-   :material-server-network:{ .lg .middle } **Self-hosting**

    ---

    Caddy、Vaultwarden、AFFiNE 与个人服务部署维护笔记。

    [:octicons-arrow-right-24: 查看自托管手册](self-hosting/index.md)

-   :material-linux:{ .lg .middle } **Linux**

    ---

    Shell、终端工作流以及 CachyOS / Arch 系维护记录。

    [:octicons-arrow-right-24: 查看 Linux 手册](linux/index.md)

-   :material-flask-outline:{ .lg .middle } **Research**

    ---

    计算机视觉实验环境、训练命令、结果与复现实验记录。

    [:octicons-arrow-right-24: 查看实验手册](research/index.md)

-   :material-tools:{ .lg .middle } **Tools**

    ---

    Typst、Git、GitHub Actions 和静态站点发布流程。

    [:octicons-arrow-right-24: 查看工具手册](tools/index.md)

</div>

## 编写原则

- 优先保存可重复执行的命令、配置片段和检查清单。
- 涉及服务变更时，写清楚备份、回滚与验证步骤。
- 实验文档固定记录环境、数据集、权重、命令与结果，便于复现。

## 近期整理方向

- [ ] 完善现有自托管服务的真实部署参数与恢复演练记录。
- [ ] 迁移常用 Linux 初始化和排错命令。
- [ ] 为计算机视觉实验补充版本化结果表与运行日志索引。
