import { envsafe, str, url, email } from 'envsafe';

export const env = envsafe({
	NODE_ENV: str({
		devDefault: 'development',
		choices: ['development', 'test', 'production'],
	}),
	DATABASE_URL: url({
		devDefault: 'postgresql://postgres:postgres@localhost:5432/planotes',
	}),
	DKIM_PRIVATE_KEY: str({
		devDefault: 'dkim_key',
	}),
	DKIM_SELECTOR: str({
		devDefault: 'dkim_selector',
	}),
	SMTP_HOST: str({
		devDefault: 'localhost',
	}),
	SMTP_USER: email({
		devDefault: 'magic@planotes.xyz',
	}),
	SMTP_PASSWORD: str({
		devDefault: 'hard_password_123',
	}),
});
