/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		colors: {
			white: '#fff',
			black: '#140004',
			gray: '#f5f5f6',
			whiteBg: 'rgba(255, 255, 255, 0.75)',
			lightGray: '#f3f3f3',
			sparkle: '#4A5859',
			blush: '#EA638C',
			brownSugar: '#B96D40',
			green: '#7AC74F',
			pencil: '#707070',
		},
		extend: {
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
			},
			keyframes: {
				fromBottom: {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
			},
		},
	},
	plugins: [],
};
