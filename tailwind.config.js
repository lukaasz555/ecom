/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		colors: {
			fab: '#fab',
			white: '#fff',
		},
		screens: {
			s: '350px',
			sm: '576px',
			md: '960px',
			lg: '1280px',
		},
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
