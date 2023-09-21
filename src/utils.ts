import consola from "consola";

export const logger = consola.create({
  stdout: process.stderr,
  defaults: {
    tag: "zzip",
  },
});
