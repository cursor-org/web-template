/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: {
    relative: true,
    files: ['./app/**/*.{ts,tsx}', './app/**/*.module.scss'],
  },
  prefix: '',
  theme: {
    fontFamily: {
      sans: [
        '"Inter", sans-serif',
        {
          fontFeatureSettings: '"cv11", "ss01"',
          fontVariationSettings: '"opsz" 32',
        },
      ],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          //       300: '#d0d1eb',
          50: '#f4f2fd',
          10: '#e0d8f7',
          200: '#e9eaff',
          300: '#d0d1eb',
          400: '#8b5da1',
          500: '#8069bf',
          600: '#6e5da3',
          700: '#5c4a87',
          800: '#4a3a6d',
          900: '#38254c',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        glow: '0 0 30px rgba(255, 255, 255, 0.5)',
        left: '-4px 0 10px -2px rgba(0, 0, 0, 0.5)',
        right: '4px 0 10px -2px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        glowPrimary: {
          '0%, 100%': { borderColor: 'hsl(var(--input))', opacity: '1', borderWidth: '1.5px' },
          '25%, 75%': { borderColor: 'hsl(var(--primary))', opacity: '1', borderWidth: '2px' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        textGlow: {
          '0%': { textShadow: '0 0 10px rgba(255, 255, 255, 0.2)' },
          '100%': { textShadow: '0 0 20px rgba(255, 255, 255, 1)' },
        },
        backgroundAnimate: {
          '0%': {
            opacity: '0.5',
            left: '30%',
          },
          '50%': {
            opacity: '1',
            left: '70%',
          },
          '100%': {
            opacity: '0.5',
            left: '30%',
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'glow-primary-once': 'glowPrimary 1.5s ease-in-out 5',
        background: 'backgroundAnimate 15s ease-in-out infinite',
        background2: 'backgroundAnimate 45s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        textGlow: 'textGlow 4s ease-in-out infinite alternate',
        'spin-slow': 'spin 10s linear infinite',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        glow: 'glow 3s infinite alternate ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
