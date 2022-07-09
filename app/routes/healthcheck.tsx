import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
	const host = request.headers.get('host');
	const selfURL = new URL('/', `http://${host}`);

	try {
		const response = await fetch(selfURL.toString(), { method: 'HEAD' });

		if (response.ok) return new Response('OK', { status: 204 });

		return new Response('FAIL', { status: 500 });
	} catch {
		return new Response('FAIL', { status: 500 });
	}
};
