import express from "express";
import { defineModule } from "../lib/module-graph.js";

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url))


defineModule({
  name: "mark:views",
  async onLoad(app) {
    app.server.use("/", express.static(join(__dirname, "../client/dist")));
  },
});
