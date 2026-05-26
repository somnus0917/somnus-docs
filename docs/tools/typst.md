# Typst

## 页面说明

本页记录 Typst 模板的本地开发、预览、包结构与版本发布过程，适合沉淀论文或报告排版资产的维护方法。

## 模板开发命令

```bash
typst --version
typst watch examples/main.typ output/main.pdf
typst compile examples/main.typ output/main.pdf
```

一个简单的模板入口结构：

```typst
// src/lib.typ
#let report(title: "", author: "", body) = {
  set text(font: ("Noto Serif CJK SC", "Libertinus Serif"), size: 11pt)
  align(center)[#text(size: 18pt, weight: "bold")[#title]]
  align(center)[#author]
  body
}
```

## 包与版本记录模板

```text
package/
├── typst.toml
├── src/lib.typ
├── README.md
└── examples/main.typ
```

```toml
[package]
name = "somnus-template"
version = "0.1.0"
entrypoint = "src/lib.typ"
authors = ["Somnus"]
```

## 注意事项

- 模板发布前编译所有示例文件，并检查中英文字体在目标系统的可获得性。
- 版本变更应同步更新 `typst.toml`、README 示例和变更摘要。
- 引用本地字体或资源时避免依赖个人绝对路径。

## TODO

- [ ] 整理现有模板的目录结构与字体替代策略。
- [ ] 记录 Typst Universe 包发布步骤与审核要求。
- [ ] 添加论文、简历或报告模板的截图与回归样例。
