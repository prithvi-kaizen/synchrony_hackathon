const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				dark: '#171717',
  				primary: '#da3229',
  				secondary: '#5c2623',
  				accent: '#e0392f'
  			},
  			background: {
  				DEFAULT: '#ffffff',
  				dark: '#171717'
  			},
  			foreground: {
  				DEFAULT: '#171717',
  				dark: '#f5f5f5'
  			},
  			surface: {
  				DEFAULT: '#f9fafb',
  				dark: '#1e1e1e'
  			},
  			muted: {
  				DEFAULT: '#9ca3af',
  				dark: '#6b7280'
  			},
  			// Shadcn compatibility colors
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			accent: 'hsl(var(--accent))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'brand-sm': '8px',
  			brand: '12px',
  			'brand-lg': '16px',
  			'brand-xl': '24px'
  		},
  		boxShadow: {
  			'brand-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			brand: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  			'brand-lg': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  			'brand-xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  			'brand-glow': '0 0 32px -8px rgba(224, 57, 47, 0.25)'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		animation: {
  			gradient: 'gradient 6s ease infinite',
  			'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
  			'star-movement-top': 'star-movement-top linear infinite alternate',
  			'slide-right': 'slide-right 2s ease-in-out infinite',
  			'slide-left': 'slide-left 2s ease-in-out infinite'
  		},
  		keyframes: {
  			gradient: {
  				'0%, 100%': {
  					'background-position': '0% 50%'
  				},
  				'50%': {
  					'background-position': '100% 50%'
  				}
  			},
  			'star-movement-bottom': {
  				'0%': {
  					transform: 'translate(0%, 0%)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translate(-100%, 0%)',
  					opacity: '0'
  				}
  			},
  			'star-movement-top': {
  				'0%': {
  					transform: 'translate(0%, 0%)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translate(100%, 0%)',
  					opacity: '0'
  				}
  			},
  			'slide-right': {
  				'0%': {
  					transform: 'translateX(-100%)',
  					opacity: '0'
  				},
  				'50%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateX(200%)',
  					opacity: '0'
  				}
  			},
  			'slide-left': {
  				'0%': {
  					transform: 'translateX(100%)',
  					opacity: '0'
  				},
  				'50%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateX(-200%)',
  					opacity: '0'
  				}
  			}
  		}
  	}
  },
  plugins: [],
};
