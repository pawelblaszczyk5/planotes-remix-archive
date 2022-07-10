import type { Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import { createTransport } from 'nodemailer';

let transporter: Transporter;

declare global {
	// eslint-disable-next-line no-var -- there needs to be var to work with globalThis
	var __transporter: Transporter | undefined;
}

const transporterConfig: SMTPTransport.Options = {
	host: process.env.SMTP_HOST,
	port: 587,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
	dkim: {
		privateKey: process.env.DKIM_PRIVATE_KEY,
		keySelector: process.env.DKIM_SELECTOR,
		domainName: 'planotes.xyz',
	},
};

if (process.env.NODE_ENV === 'production') {
	transporter = createTransport(transporterConfig);
} else {
	if (!global.__transporter) {
		global.__transporter = createTransport(transporterConfig);
	}
	transporter = global.__transporter;
}

interface SendEmailOptions {
	html: string;
	receiver: string;
	plainTextVersion?: string;
	senderName: string;
	subject: string;
}

interface SendEmailResult {
	accepted: Array<string>;
}

export const sendEmail = async ({ html, receiver, plainTextVersion, senderName, subject }: SendEmailOptions) => {
	try {
		const { accepted }: SendEmailResult = await transporter.sendMail({
			from: `"${senderName}" <${process.env.SMTP_USER}>`,
			to: receiver,
			subject,
			text: plainTextVersion,
			html,
		});

		if (!accepted.includes(receiver)) throw new Error('Unable to send email');
	} catch {
		throw new Error('Unable to send email');
	}
};
