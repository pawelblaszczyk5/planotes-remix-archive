/* eslint-disable unicorn/prefer-module,no-undef */
module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
