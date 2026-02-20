/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Premium Light Mode Color System
        background: "#F8F6F2",
        surface: "#FFFFFF",
        primary: "#0f766e",
        accent: "#f59e0b",
        
        // Semantic colors
        gold: {
          50: "#FEF9E7",
          100: "#FCF0C3",
          200: "#FAE499",
          300: "#F7D76F",
          400: "#F4B400",
          500: "#E39B00",
          600: "#C48200",
          700: "#A16900",
          800: "#7D5000",
          900: "#5A3A00"
        },
        stone: {
          50: "#FAFAF9",
          100: "#F5F4F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917"
        }
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"]
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(28, 25, 23, 0.08)',
        'soft-lg': '0 8px 30px rgba(28, 25, 23, 0.12)',
        'soft-xl': '0 16px 40px rgba(28, 25, 23, 0.16)',
        'glow-gold': '0 0 20px rgba(244, 180, 0, 0.3)',
        'card-hover': '0 12px 28px rgba(28, 25, 23, 0.12)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(244, 180, 0, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(244, 180, 0, 0.4)' }
        }
      }
    }
  },
  plugins: []
};
