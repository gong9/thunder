# thunder

> 基于 three.js 的 3d 引擎生态

### description

packages

- thunder-3d 3d 基础核心包
- thunder-utils 业务工具包
- ...

playground

开发调试

### example 

> notes: 暂时需科学上网


国内： http://182.92.210.127:8001/

使用文档：http://182.92.210.127:8004/

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

notes: 除 alpha、beta、rc 版本外可自行 publish 之外，正式版本请在`pnpm release` 更新子包 version 之后合入 main 分支，由 CI 自动发布
