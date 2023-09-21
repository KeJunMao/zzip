# zzip

> 压缩 dist 为 zip, tar, taz. 由 [compressing](https://www.npmjs.com/package/compressing) 驱动

[English](./README.md) | 简体中文

## 快速开始

压缩 dist 文件夹为 dist.zip

```sh
npx zzip
```

压缩 dist 文件夹为 dist.tgz

```sh
npx zzip --mode=tgz
```

格式化输出名称

```sh
npx zzip --name="format:dist-%cd%h"
# dist-2023-02-09-2421035.zip
```

格式化输出日期

```sh
npx zzip --name="format:dist-%cd-%tag" --date=format:"%Y%m%d"
# dist-20230209-v0.0.1.zip
```

## CLI 用法

```sh
npx zzip [...参数] [<文件/文件夹列表>]
```

**参数:**

- `--outdir`: 输入目录, 默认值为**.**。
- `--name`: 输出名称。未提供时, 默认值为 **format:%entry.name**。使用 `--name[=<format>]`格式化名称，详情查看 [git 提交格式](https://www.git-scm.com/docs/git-log#Documentation/git-log.txt---prettyltformatgt)，除了支持 git 提供的格式外，还支持以下格式:
  - `%tag`: 最新的 tag 名称
  - `%entry.name`: 第一个文件/文件夹的名称
  - `%package.name`: package.json 的 name 字段
- `--mode`: 压缩模式。未提供时，默认值为**zip**。
- `--overwrite`: 是否覆盖输出文件，默认值为**true**。使用`--no overwrite`时，当文件存在时将引发错误
- `--date=<format>`: 默认值为 **short**. 更多查看 [more](https://www.git-scm.com/docs/git-log#Documentation/git-log.txt---dateltformatgt)

## 配置

配置项使用 [unjs/c12](https://github.com/unjs/c12) 自动从 cwd 中加载。
你可以使用 `zip.config.json`, `zip.config.{ts,js,mjs,cjs}` 或者 `.ziprc`

有关可用选项和默认值，请参见[./src/config.ts](./src/config.ts)。

## 协议

用 💛 发电

根据[MIT 许可证](./LICENSE)发布
