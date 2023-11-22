import { defineModule } from "../lib/module-graph.js";
import features from "../features/*.feat.js";

defineModule({
  name: "mark:features",
  async onLoad(app) {
    features.forEach((feat) => {
      const mod = "default" in feat ? feat.default : feat;
      app[mod.name] = {
        app: app,
      };
      mod(app[mod.name]);
    });
  },
});
