import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modals/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Layout
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        
        card: {
          DEFAULT: 'var(--card-bg)',
          foreground: 'var(--foreground)',
          border: 'var(--card-border)',
        },
        
        // Brand Colors (Updated for Blue/Yellow)
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          foreground: '#ffffff', // Primary is Blue, so white text is best
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: '#1e293b', // Accent is Yellow, so dark text is best
        },

        // UI Feedback
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',

        // Navigation & Inputs
        'nav-bg': 'var(--nav-bg)',
        'nav-border': 'var(--nav-border)',
        'nav-text': 'var(--nav-text)',
        'input-bg': 'var(--input-bg)',
        'input-border': 'var(--input-border)',
        'input-text': 'var(--input-text)',

        // Dashboard Specific
        dash: {
          bg: 'var(--dash-bg)',
          surface: 'var(--dash-surface)',
          'surface-2': 'var(--dash-surface-2)',
          border: 'var(--dash-border)',
          text: 'var(--dash-text)',
          'text-muted': 'var(--dash-text-muted)',
        },

        muted: {
          DEFAULT: 'var(--muted-bg)',
          foreground: 'var(--muted-text)',
        },
        
        border: 'var(--card-border)',
        input: 'var(--input-border)',
        ring: 'var(--primary)',
      },

      fontFamily: {
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Helpful for your Blue theme
        'brand-gradient': 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
      },

      animation: {
        fadeIn: 'fadeIn 0.3s ease',
        slideUp: 'slideUp 0.3s ease',
        slideDown: 'slideDown 0.5s ease',
        modalSlideIn: 'modalSlideIn 0.3s ease',
        shimmer: 'shimmer 2s infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        scroll: 'scroll 30s linear infinite'
      },

      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' }
        },
        modalSlideIn: {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;