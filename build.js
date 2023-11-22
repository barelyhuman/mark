import { esbuildContext } from "./build/context.js";

esbuildContext
  .rebuild()
  .then(() => {
    esbuildContext.dispose();
  })
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
