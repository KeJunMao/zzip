#!/usr/bin/env node
import consola from "consola";
import mri from "mri";
import { join, resolve } from "node:path";
import { loadZipConfig } from "./config";
import Compressing from "compressing";
import prettyBytes from "pretty-bytes";
import chalk from "chalk";

import { createWriteStream, existsSync } from "node:fs";

async function main() {
  const args = mri(process.argv.splice(2), {
    default: {
      overwrite: true,
    },
  });

  const config = await loadZipConfig({
    entries: args._,
    outDir: args.outdir,
    mode: args.mode,
    name: args.name,
    overwrite: args.overwrite,
    date: args.date,
  });

  const logger = consola.create({
    stdout: process.stderr,
    defaults: {
      tag: "zzip",
    },
  });
  logger.info(chalk.cyan(`Start compressing`));

  if (
    !["zip", "tar", "tgz"].includes(String(config.mode).toLocaleLowerCase())
  ) {
    logger.warn(
      chalk.yellow(`Unsupported compression mode '${config.mode}', use 'zip'`)
    );
    config.mode = "zip";
  }

  const output = join(config.outDir, `${config.name}.${config.mode}`);
  const resolveOutput = resolve(process.cwd(), output);

  if (!config.overwrite && existsSync(resolveOutput)) {
    logger.error(chalk.red(`File exists: ${resolveOutput}`));
    process.exit(-1);
  }
  const stream = new Compressing[config.mode].Stream();
  config.entries.forEach((entry) => {
    if (existsSync(entry)) {
      logger.log(`  Add ${chalk.bold(entry)}`);
      stream.addEntry(entry);
    } else {
      logger.error(chalk.red(`No such file or directory, stat ${entry}`));
      process.exit(-1);
    }
  });
  const writeStream = stream
    .pipe(createWriteStream(resolveOutput))
    .on("error", consola.error)
    .on("finish", () => {
      logger.success(chalk.green(`Compression succeeded ${output}`));
      logger.log(
        `Σ Total size (byte size): ${chalk.cyan(
          prettyBytes(writeStream.bytesWritten)
        )}`
      );
      console.log();
    });
}

main().catch(consola.error);
