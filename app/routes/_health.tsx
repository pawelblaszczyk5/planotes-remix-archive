import type { LoaderFunction } from '@remix-run/node';

import { db } from '~/utils/db.server';

const fetchSelf = async (request: Request) => {
	const host = request.headers.get('host');
	const selfURL = new URL('/', `http://${host}`);
	const response = await fetch(selfURL.toString(), { method: 'HEAD' });

	if (!response.ok) throw new Error('Self head fetch failed');
};

const queryDB = async () => {
	// TODO: Change after users are used
	await db.user.findMany();
};

export const loader: LoaderFunction = async ({ request }) => {
	try {
		await Promise.all([fetchSelf(request), queryDB()]);

		return new Response('OK', { status: 204 });
	} catch {
		return new Response('FAIL', { status: 500 });
	}
};
