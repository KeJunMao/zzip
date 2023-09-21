import { rmSync } from "fs";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index", "src/cli"],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  failOnWarn: false,
  hooks: {
    "build:done": () => {
      rmSync("dist/cli.d.ts", { recursive: true, force: true });
      rmSync("dist/cli.cjs", { recursive: true, force: true });
    }
  }
});
