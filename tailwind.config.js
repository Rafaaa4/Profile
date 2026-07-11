/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        void: '#05070A',
        surface: '#0B0F14',
        neon: {
          blue: '#3FC6FF',
          purple: '#8B5CF6',
          emerald: '#22D3A6',
        },
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(63,198,255,0.10), transparent 40%), radial-gradient(circle at 80% 0%, rgba(139,92,246,0.10), transparent 40%), radial-gradient(circle at 50% 100%, rgba(34,211,166,0.08), transparent 40%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(63,198,255,0.35)',
        'glow-purple': '0 0 40px -10px rgba(139,92,246,0.35)',
        'glow-emerald': '0 0 40px -10px rgba(34,211,166,0.35)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        blob: 'blob 12s infinite ease-in-out',
        blink: 'blink 1s step-start infinite',
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
