export async function getLastGitTag() {
  const r = await execCommand("git", [
    "--no-pager",
    "tag",
    "-l",
    "--sort=creatordate",
  ]).then((r) => r.split("\n"));
  return r[r.length - 1];
}

export async function getLastCommitWithFormat(format: string, date: string) {
  const r = await execCommand("git", [
    "--no-pager",
    "log",
    `--pretty=${format}`,
    "-n 1",
    `--date=${date}`,
  ]).then((r) => r.replaceAll("\n", ""));
  return r;
}

async function execCommand(cmd: string, args: string[]) {
  const { execa } = await import("execa");
  const res = await execa(cmd, args);
  return res.stdout;
}
