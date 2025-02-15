# 人物扫雷

[English](./README.md) | [简体中文](./README.zh-CN.md)

这是一个独特的网页版扫雷游戏，玩家可以输入一个人物（真实或虚构），AI 将为游戏格子生成与该人物相关的概念。安全区域会填充与人物相关的概念，而地雷则隐藏在不相关的概念中。

## 特性

- 🎮 经典扫雷玩法（10x10 网格，20 个地雷）
- 🤖 基于 Claude（通过 OpenRouter）的 AI 概念生成
- 👤 基于人物的概念映射：
  - 80 个安全格子（人物相关概念）
  - 20 个地雷格子（人物无关概念）
- 🎯 交互式游戏体验：
  - 左键点击揭示格子
  - 右键点击放置/移除旗帜
  - 悬停显示已揭示格子的概念
  - 颜色编码的相邻地雷数字
- 🌏 多语言支持（中文/英文）
- 📱 响应式设计，适配多种屏幕尺寸

## 技术栈

- **前端框架**：Next.js 14（App Router）
- **样式**：Tailwind CSS + shadcn/ui
- **状态管理**：React hooks（useState + useCallback）
- **AI 集成**：OpenRouter API with Claude
- **开发语言**：TypeScript

## 环境要求

开始之前，请确保你有：
- Node.js 18.17 或更高版本
- pnpm 8.0 或更高版本
- OpenRouter API 密钥（在 https://openrouter.ai 获取）

## 快速开始

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/YYMinesweeper.git
cd sweeper
```

2. 安装依赖：
```bash
pnpm install
```

3. 设置环境变量：
```bash
# 创建 .env.local 文件并添加：
OPENROUTER_API_KEY=your_api_key_here
```

4. 启动开发服务器：
```bash
pnpm dev
```

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 游戏玩法

1. 输入你的 OpenRouter API 密钥
2. 输入一个你选择的人物（如"福尔摩斯"、"居里夫人"）
3. 选择你偏好的语言（中文/英文）
4. 等待 AI 生成人物相关概念
5. 开始游戏：
   - 左键点击揭示格子
   - 右键点击放置/移除旗帜
   - 数字显示相邻地雷数量
   - 悬停查看已揭示格子的概念
   - 标记所有地雷并揭示所有安全格子即可获胜

## 项目结构

```
src/
├── app/                 # Next.js app router 页面
├── components/         # React 组件
│   ├── ui/            # shadcn/ui 组件
│   ├── game-board/    # 游戏面板和格子组件
│   └── api-key-dialog # API 密钥管理
├── lib/               # 工具和 API 集成
└── types/             # TypeScript 类型定义
```

## 开发状态

### 已完成
- ✅ 核心扫雷机制
- ✅ AI 概念生成
- ✅ 基于人物的游戏玩法
- ✅ 多语言支持
- ✅ 基础 UI/UX 实现

### 计划功能
- ⏳ 难度级别
- ⏳ 人物保存
- ⏳ 统计追踪
- ⏳ 音效
- ⏳ 深色模式

## 参与贡献

1. Fork 本仓库
2. 创建你的特性分支（`git checkout -b feature/amazing-feature`）
3. 提交你的更改（`git commit -m 'Add some amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 开启一个 Pull Request

## 许可证

本项目基于 MIT 许可证 - 查看 LICENSE 文件了解详情。

## 致谢

- 使用 [Next.js](https://nextjs.org) 构建
- UI 组件来自 [shadcn/ui](https://ui.shadcn.com)
- AI 支持来自 [Claude](https://anthropic.com/claude)（通过 [OpenRouter](https://openrouter.ai)） 