import type { App, Plugin } from "@vue/runtime-core";

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options: any) => {
    const INSTALLED_KEY = Symbol("INSTALLED_KEY");
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;
    components.forEach((c) => app.use(c));
  };

  return {
    install,
  };
};
