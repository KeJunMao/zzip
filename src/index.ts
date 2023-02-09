import { ZipConfig } from "./config";

export function defineConfig(
  config: Partial<ZipConfig> | (() => Partial<ZipConfig>)
) {
  if (typeof config === "function") {
    return config();
  }
  return config;
}
