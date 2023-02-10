# zipp

> 压缩 dist 为 zip, tar, taz. 由 [compressing](https://www.npmjs.com/package/compressing) 驱动

[English](./README.md) | 简体中文

## 快速开始

压缩 dist 文件夹为 dist.zip

```sh
npx zipp
```

压缩 dist 文件夹为 dist.tgz

```sh
npx zipp --mode=tgz
```

格式化输出名称

```sh
npx zipp --name="format:dist-%cd%h"
# dist-2023-02-09-2421035.zip
```

格式化日期名称

```sh
npx zipp --name="format:dist-%cd-%tag" --date=format:"%Y%m%d"
# dist-20230209-v0.0.1.zip
```

## CLI 用法

```sh
npx zipp [...参数] [<文件列表>]
```

**参数:**

- `--outdir`: 输入目录, 默认值为**.**。
- `--name`: 输出名称。未提供时, 默认值为 **dist**。使用 `--name[=<format>]`格式化名称，详情查看 [git 提交格式](https://www.git-scm.com/docs/git-log#Documentation/git-log.txt---prettyltformatgt)。
- `--mode`: 压缩模式。未提供时，默认值为**zip**。
- `--overwrite`: 是否覆盖输出文件，默认值为**true**。使用`--no overwrite`时，当文件存在时将引发错误
- `--date=<format>`: 默认值为 **short**. 更多查看 [more](https://www.git-scm.com/docs/git-log#Documentation/git-log.txt---dateltformatgt)

## 配置

配置项使用 [unjs/c12](https://github.com/unjs/c12) 自动从 cwd 中加载。
您可以使用 `zip.json`, `zip.{ts,js,mjs,cjs}`, `.ziprc` 或者在 `package.json` 中使用 `zip` 字段

有关可用选项和默认值，请参见[./src/config.ts](./src/config.ts)。

## 协议

用 💛 发电

根据[MIT 许可证](./LICENSE)发布
