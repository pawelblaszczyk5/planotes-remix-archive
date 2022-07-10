import { PrismaClient } from '@prisma/client';

import { createStableModule } from '~/utils/create-stable-module';

const createPrismaClient = () => {
	const db = new PrismaClient();

	db.$connect();
	return db;
};

export const db = createStableModule('db', createPrismaClient);
