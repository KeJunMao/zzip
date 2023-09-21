import { loadConfig } from "c12";
import * as compressing from "compressing";
import { resolve } from "node:path";
import { format } from "./format";

type Mode = Exclude<keyof typeof compressing, "gzip">;

export interface ZipConfig {
  entries: string[];
  name: string;
  outDir: string;
  mode: Mode;
  overwrite: boolean;
  date: string;
}

const ConfigDefaults: ZipConfig = {
  entries: [],
  name: "format:%entry.name",
  outDir: ".",
  mode: "zip",
  overwrite: true,
  date: "short",
};

export async function loadZipConfig(
  overrides?: Partial<ZipConfig>
): Promise<ZipConfig> {
  const { config } = await loadConfig<ZipConfig>({
    name: "zip",
    defaults: ConfigDefaults,
    globalRc: true,
    overrides: {
      ...(overrides as ZipConfig),
    },
  });
  if (!config?.entries.length) {
    config!.entries = ["dist"];
  }
  config!.entries = Array.from(
    new Set(config?.entries.map((entry) => resolve(process.cwd(), entry)))
  );
  if (config?.name.startsWith("format:")) {
    config.name = await format(config);
  }
  return config!;
}
