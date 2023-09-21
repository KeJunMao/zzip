# zzip

> Compression dist to zip, tar, taz. Powered by [compressing](https://www.npmjs.com/package/compressing)

English | [简体中文](./README.zh-CN.md)

## Quick Start

Compression the dist folder to dist.zip

```sh
npx zzip
# dist.zip
```

Compression the dist folder to dist.tgz

```sh
npx zzip --mode=tgz
# dist.tgz
```

Formating output name

```sh
npx zzip --name="format:dist-%cd%h"
# dist-2023-02-09-2421035.zip
```

Formating date

```sh
npx zzip --name="format:dist-%cd-%tag" --date=format:"%Y%m%d"
# dist-20230209-v0.0.1.zip
```

## CLI Usage

```sh
npx zzip [...args] [<entries>]
```

**Arguments:**

- `--outdir`: The output dir, **.** will be used as default.
- `--name`: The output name. When not provided, **format:%entry.name** will be used as default. Use `--name[=<format>]` to format name. See [git commit formatting](https://www.git-scm.com/docs/git-log#Documentation/git-log.txt---prettyltformatgt), ，除了支持 git 提供的格式外，还支持以下格式:
  - `%tag`: latest tag name
  - `%entry.name`: first file/dir name
  - `%package.name`: package.json name field
- `--mode`: Compression mode. When not provided, **zip** will be used as as default.
- `--overwrite`: Whether to overwrite the output file, **true** will be used as as default. When using `--no-overwrite`, an error will be thrown when the file exists
- `--date=<format>`: **short** will be used as as default. see [more](https://www.git-scm.com/docs/git-log#Documentation/git-log.txt---dateltformatgt)

## Configuration

Configuration is loaded by [unjs/c12](https://github.com/unjs/c12) from cwd. You can use either `zip.config.json`, `zip.config.{ts,js,mjs,cjs}`, `.ziprc`.

See [./src/config.ts](./src/config.ts) for available options and defaults.

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).
