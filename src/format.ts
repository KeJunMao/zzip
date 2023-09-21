import { join } from "node:path";
import { ZipConfig } from "./config";
import { getLastCommitWithFormat, getLastGitTag } from "./git";
import { createRequire } from "module";

const _require = createRequire(import.meta.url);

function getFirstEntryName(entries: string[]) {
  return entries[0];
}

function getProjectName(cwd: string) {
  try {
    const packageJSON = _require(join(cwd, "package.json"));
    return packageJSON.name
  } catch (error) {

  }
  return "";
}

export async function format(config: ZipConfig) {
  let name = config.name;
  name = name.replaceAll("%tag", await getLastGitTag());
  name = name.replaceAll("%entryname", getFirstEntryName(config.entries));
  name = name.replaceAll("%projectname", getProjectName(process.cwd()));
  name = await getLastCommitWithFormat(name, config.date);
  return name;
}
