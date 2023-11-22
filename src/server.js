import express from "express";
import { app } from "./app.js";
import { loadModules } from "./lib/module-graph.js";

app.server = express();
app.env.PORT = app.env.PORT || 3000;

app.server.listen(app.env.PORT, () => {
  console.log(`> Listening on ${app.env.PORT}`);
});

await loadModules(app);
