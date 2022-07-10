// This helper allows creating modules that are stable across Remix development live reloading

declare global {
	// eslint-disable-next-line no-var
	var __globalModules: Map<string, unknown>;
}

global.__globalModules = new Map();

export const createStableModule = <Module>(key: string, createModule: () => Module): Module => {
	let module: Module;

	if (process.env.NODE_ENV === 'production') {
		module = createModule();
	} else {
		if (!global.__globalModules.has(key)) {
			global.__globalModules.set(key, createModule());
		}
		module = global.__globalModules.get(key) as Module;
	}

	return module;
};
