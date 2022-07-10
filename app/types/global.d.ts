declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SMTP_HOST: string;
			SMTP_USER: string;
			SMTP_PASSWORD: string;
			DKIM_PRIVATE_KEY: string;
			DKIM_SELECTOR: string;
		}
	}
}

export {};
