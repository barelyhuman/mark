import esbuild from "esbuild";
import globImportPlugin from "esbuild-plugin-import-glob";
import { nodeExternals } from "esbuild-plugin-node-externals";

import { readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const APP_SCRIPT_REGEX =
  /(id\=["]app-script["])\s+(src\=["]((?!.+\.bundle.js).+)["])/g;

const ImportGlobPlugin = globImportPlugin.default;

const __dirname = dirname(fileURLToPath(import.meta.url));

export const esbuildContext = await esbuild.context({
  outdir: join(__dirname, "../dist"),
  entryPoints: [join(__dirname, "../src/server.js")],
  platform: "node",
  bundle: true,
  logLevel: "info",
  format: "esm",
  plugins: [ImportGlobPlugin(), nodeExternals()],
});

export async function createClientContext() {
  const clientDir = join(__dirname, "../client");
  const template = join(clientDir, "index.html");

  const templateData = await readFile(template, "utf8");
  const matchers = APP_SCRIPT_REGEX.exec(templateData);

  const getOutName = (file) => file.replace(extname(file), ".bundle.js");
  const outname = getOutName(matchers[3]);
  let context;
  if (matchers && matchers.length) {
    context = await esbuild.context({
      entryPoints: [join(clientDir, matchers[3])],
      bundle: true,
      logLevel: "info",
      platform: "browser",
      outfile: join(clientDir, "dist", outname),
      format: "esm",
    });
  }

  const matchIndex = matchers.index;
  const lines = templateData.split("\n");
  let read = 0;
  let onLine;
  lines.forEach((x, i) => {
    const lineChars = x.split("");
    lineChars.forEach((c) => {
      read += 1;
      if (read == matchIndex) {
        onLine = i;
      }
    });
  });

  let distTemplate = templateData;

  if (onLine) {
    distTemplate = [
      ...lines.slice(0, onLine),
      `<script type="module" id="app-script" src="${normalize(
        outname
      )}"></script>`,
      ...lines.slice(onLine + 1),
    ].join(`\n`);
  }

  await writeFile(join(clientDir, "dist/index.html"), distTemplate, "utf8");
  return context;
}
