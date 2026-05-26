# RAFT-Stereo 实验记录

## 页面说明

本页是 RAFT-Stereo 双目视差实验的持续记录模板，用来统一环境、数据集路径、模型权重、运行命令与对比结果。实际参数应与使用的代码仓库提交保持对应。

## 实验环境

| 项目 | 记录值 |
| --- | --- |
| 代码版本 | `git rev-parse HEAD` 的输出 |
| Python | `python --version` |
| PyTorch / CUDA | `python -c "import torch; print(torch.__version__, torch.version.cuda)"` |
| GPU | `nvidia-smi --query-gpu=name,memory.total --format=csv` |
| 权重目录 | `${PROJECT_ROOT}/checkpoints/` |

```bash
export PROJECT_ROOT="$HOME/projects/RAFT-Stereo"
export DATA_ROOT="$HOME/datasets/stereo"
export CHECKPOINT_DIR="$PROJECT_ROOT/checkpoints"
mkdir -p "$CHECKPOINT_DIR"
```

## 数据集路径

```text
${DATA_ROOT}/
├── sceneflow/
├── middlebury/
│   └── Middlebury2014/
└── custom/
```

数据准备完成后，在此记录下载来源、解压脚本、软链接命令和校验方式。

## 训练命令模板

```bash
cd "$PROJECT_ROOT"
python train_stereo.py \
  --name raftstereo-baseline \
  --train_datasets sceneflow \
  --batch_size 4 \
  --num_steps 100000 \
  --save_dir "$CHECKPOINT_DIR/raftstereo-baseline"
```

## 验证命令模板

```bash
cd "$PROJECT_ROOT"
python evaluate_stereo.py \
  --restore_ckpt "$CHECKPOINT_DIR/raftstereo-baseline/latest.pth" \
  --dataset middlebury_MiddEval3
```

## 模型与结果记录

| 实验名称 | 权重路径 | 数据集 | 精度 / 指标 | 显存 | 备注 |
| --- | --- | --- | --- | --- | --- |
| baseline | `checkpoints/raftstereo-baseline/latest.pth` | 待填写 | 待测量 | 待测量 | 初始复现实验 |

## Middlebury2014 记录区域

```bash
# 在确认仓库提供的评估参数后替换此模板中的 dataset 名称与路径。
python evaluate_stereo.py \
  --restore_ckpt "$CHECKPOINT_DIR/model.pth" \
  --dataset Middlebury2014
```

需要记录图像缩放策略、非遮挡区域指标、提交文件生成方式以及与官方评测的一致性。

## FP16 与轻量化实验区域

| 实验 | 改动 | 速度 | 显存 | 精度变化 | 结论 |
| --- | --- | --- | --- | --- | --- |
| FP16 / AMP | 待验证 | - | - | - | - |
| 轻量化迭代次数 | 待验证 | - | - | - | - |
| 特征提取器裁剪 | 待验证 | - | - | - | - |

## 注意事项

- 命令行参数在不同 fork 或提交间可能改变，运行前先查阅仓库对应版本的说明。
- 训练和评估结果必须绑定权重文件、代码提交和数据预处理方法。
- FP16 可能产生数值稳定性变化，除速度和显存外必须同时复测精度。

## TODO

- [ ] 填写真实仓库地址、提交号与可复现依赖锁定文件。
- [ ] 接入 Middlebury2014 数据路径并记录首个验证结果。
- [ ] 完成 FP16 和轻量化设置的速度、显存、精度对照表。
