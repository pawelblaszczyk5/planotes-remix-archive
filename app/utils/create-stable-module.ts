// This helper allows creating modules that are stable across Remix development live reloading

import { env } from '~/utils/env.server';

declare global {
	// eslint-disable-next-line no-var
	var __globalModules: Map<string, unknown>;
}

global.__globalModules = new Map();

export const createStableModule = <Module>(key: string, createModule: () => Module): Module => {
	if (env.NODE_ENV === 'production') {
		return createModule();
	}

	if (!global.__globalModules.has(key)) {
		global.__globalModules.set(key, createModule());
	}

	return global.__globalModules.get(key) as Module;
};
