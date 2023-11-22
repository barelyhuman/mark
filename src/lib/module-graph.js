const moduleMap = new Map();

export function defineModule(config) {
  if (moduleMap.has(config.name)) {
    throw new Error(`Module ${config.name} already registered.`);
  }

  moduleMap.set(config.name, {
    loaded: false,
    mod: config,
    deps: config.dependsOn || [],
    name: config.name,
  });
}

export async function loadModules(app) {
  for (let currentModuleKey of moduleMap.keys()) {
    const currentModuleDefinition = moduleMap.get(currentModuleKey);
    if (currentModuleDefinition.loaded) continue;

    for (let dependencyKey of currentModuleDefinition.deps) {
      const depModuleDefinition = moduleMap.get(dependencyKey);
      if (!depModuleDefinition) {
        console.warn(`Invalid dependency module key ${dependencyKey}`);
        continue;
      }
      if (depModuleDefinition.loaded) continue;
      await depModuleDefinition.mod.onLoad(app);
      depModuleDefinition.loaded = true;
      moduleMap.set(dependencyKey, depModuleDefinition);
    }
    await currentModuleDefinition.mod.onLoad(app);
    currentModuleDefinition.loaded = true;
    moduleMap.set(currentModuleKey, currentModuleDefinition);
  }
}
