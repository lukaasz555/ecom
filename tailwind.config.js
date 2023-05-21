/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		colors: {
			white: '#fff',
			black: '#140004',
			gray: '#f5f5f6',
			whiteBg: 'rgba(255, 255, 255, 0.75)',
			whiteBg2: 'rgba(255, 255, 255, 0.9)',
			lightBlack: 'rgba(0, 0, 0, .5)',
			lightGray: '#f3f3f3',
			sparkle: '#4A5859',
			blush: '#EA638C',
			brownSugar: '#B96D40',
			green: '#7AC74F',
			darkGreen: '#0C8346',
			pencil: '#707070',
			sapphire: '#0C6291',
			transparent: 'transparent',
			error: '#F52500',
		},

		fontSize: {
			'2xl': '24px',
			xl: '20px',
			l: '18px',
			m: '16px',
			s: '14px',
			xs: '12px',
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
