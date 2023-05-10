import { babel } from "@rollup/plugin-babel";
import filesize from "rollup-plugin-filesize";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const packageJson = require("./package.json");

/*
 * We use cJS for generating common js modules that run in node environment like jest,
 * PSSSSS: Jest doesn't support esm yet
 */
const cjsConfig = {
  input: "build/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
    },
  ],
  external: [/@babel\/runtime/, "react"],
  plugins: [
    commonjs(),
    // We don't need declaration for cjs, if you need declaration for some reason, just remove the override
    typescript({ tsconfig: "./tsconfig.json", declaration: false }),
    babel({
      babelHelpers: "runtime",
      plugins: ["@babel/plugin-transform-runtime"],
    }),
    filesize(), // to show bundle size
    terser(), // to minify file size
  ],
};

/*
 * We use esm to handle es modules, that works for example in Browser environment,
 * We generate types by allowing declarations in tsconfig.json
 */
const esmConfig = {
  input: "build/index.ts",
  output: [
    {
      file: packageJson.module,
      format: "esm",
    },
  ],
  external: [/@babel\/runtime/, "react"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "types",
      emitDeclarationOnly: true,
    }),
    babel({
      babelHelpers: "runtime",
      plugins: ["@babel/plugin-transform-runtime"],
    }),
    filesize(), // to show bundle size
    terser(), // to minify file size
  ],
};

/*
 * We create index.d.ts that have all declarations as an entry point
 * PSSSSS: we delete declaration files that being generated in dist/esm/types
 *         to prevent duplications with index.d.ts in order to reduce library size
 */
const tsConfig = {
  input: "dist/esm/types/index.d.ts",
  output: [{ file: packageJson.types, format: "esm" }],
  plugins: [dts.default()],
};

export default [cjsConfig, esmConfig, tsConfig];
