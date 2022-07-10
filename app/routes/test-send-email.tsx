import type { LoaderFunction } from '@remix-run/node';

import { sendEmail } from '~/utils/mail.server';

export const loader: LoaderFunction = async ({ request }) => {
	const email = new URL(request.url).searchParams.get('email');

	if (!email) throw new Response('No email', { status: 400 });

	try {
		await sendEmail({
			html: 'Test',
			receiver: email,
			plainTextVersion: 'Test',
			senderName: 'Planotes Magic test',
			subject: 'Test',
		});
	} catch {
		throw new Response('Failed sending email', { status: 500 });
	}

	return new Response('Success', { status: 200 });
};
