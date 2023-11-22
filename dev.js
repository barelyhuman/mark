import { spawn } from "child_process";
import { createClientContext, esbuildContext } from "./build/context.js";

import { watch } from "chokidar";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
let running;

await dev();

async function dev() {
  await esbuildContext.watch();
  await (await createClientContext()).watch();

  const toWatch = [
    join(__dirname, "/dist/server.js"),
    join(__dirname, "/client/dist/*"),
  ];

  let ready = false;
  watch(...toWatch)
    .on("ready", () => {
      ready = true;
    })
    .on("all", (c) => {
      if (!ready) return;
      startServer();
    });
}

function startServer() {
  if (running) {
    process.kill(running);
  }

  const _process = spawn(`node`, [join(__dirname, "/dist/server.js")], {
    stdio: "inherit",
  });

  if (_process.pid) {
    running = _process.pid;
  }
}
