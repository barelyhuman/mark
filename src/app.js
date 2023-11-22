import { config } from "dotenv";
config();

import { defineModule } from "./lib/module-graph";
import "./modules/**/*.js";

export const app = {};

app.env = process.env;
app.defineModule = defineModule;
