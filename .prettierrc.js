module.exports = {
  // 针对 Markdown 的特殊处理
  overrides: [
    {
      files: "*.md",
      options: {
        printWidth: 80,
        tabWidth: 4,
        useTabs: false,
        proseWrap: 'preserve',
      },
    },
  ],
};
