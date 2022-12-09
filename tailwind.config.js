/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		colors: {
			fab: '#fab',
			white: '#fff',
			black: '#140004',
			gray: '#f5f5f6',
			lightGray: '#f3f3f3',
			sparkle: '#4A5859',
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
