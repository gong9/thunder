# anov-3d-ecology

> 3d 引擎生态包

### description

packages

- anov-3d 3d 引擎基础核心包
- anov-3d-gis 3d 引擎 gis 扩展包
- anov-3d-utils 3d 引擎工具包
- anov-3d-vue3 3d 引擎 vue3 扩展包
- ...

playground

开发调试

### development

```bash
pnpm i
```

pnpm 常用命令

- 根依赖安装 pnpm add xxx -w
- 子包依赖安装 pnpm add xxx --filter packageName

#### publish

- pnpm changeset 更新需要发布的各子包 changelog
- pnpm release 子包版本更新
- pnpm all-publish 子包发布
