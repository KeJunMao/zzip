import { basename, join } from "node:path";
import { ZipConfig } from "./config";
import { getLastCommitWithFormat, getLastGitTag } from "./git";
import { createRequire } from "module";
const _require = createRequire(import.meta.url);

function getFirstEntryName(entries: string[]) {
  return basename(entries[0]);
}

function getPackageName(cwd: string) {
  try {
    const packageJSON = _require(join(cwd, "package.json"));
    const name = packageJSON.displayName ?? packageJSON.name ?? basename(cwd);
    return name.replace(/[\\\/:*?"<>|\s]/gm, "-")
  } catch (error) {}
  return "";
}

export async function format(config: ZipConfig) {
  let name = config.name;
  try {
    name = name.replaceAll("%tag", await getLastGitTag());
  } catch (error: any) {
    name = name.replaceAll("%tag", "");
  }
  name = name.replaceAll("%entry.name", getFirstEntryName(config.entries));
  name = name.replaceAll("%package.name", getPackageName(process.cwd()));
  try {
    name = await getLastCommitWithFormat(name, config.date);
  } catch (error: any) {}

  name = name.replace("format:", "");
  return name;
}
