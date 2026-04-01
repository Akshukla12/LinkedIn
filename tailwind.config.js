/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ======== FONT FAMILIES ======== */
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },

      /* ======== COLOR TOKENS ======== */
      colors: {
        /* Tailwind CSS-variable bridge */
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',

        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        /* Gradient helpers (kept for compat) */
        'gradient-start': 'hsl(var(--gradient-start))',
        'gradient-mid':   'hsl(var(--gradient-mid))',
        'gradient-end':   'hsl(var(--gradient-end))',

        /* Obsidian Amber raw palette */
        navy: {
          DEFAULT: '#050B16',
          mid:     '#0F172A',
          light:   '#1E293B',
          muted:   '#475569',
        },
        amber: {
          DEFAULT: '#F59E0B',
          dim:     '#D97706',
          bright:  '#FBBF24',
          50:      '#FFFBEB',
          100:     '#FEF3C7',
          200:     '#FDE68A',
          300:     '#FCD34D',
          400:     '#FBBF24',
          500:     '#F59E0B',
          600:     '#D97706',
          700:     '#B45309',
          800:     '#92400E',
          900:     '#78350F',
        },
        zinc: {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },
      },

      /* ======== BORDER RADIUS ======== */
      borderRadius: {
        sm:   '0.375rem',
        md:   '0.5rem',
        lg:   '0.75rem',
        xl:   '0.875rem',
        '2xl':'1.25rem',
        '3xl':'1.5rem',
      },

      /* ======== BOX SHADOWS ======== */
      boxShadow: {
        'card':        '0 1px 4px rgba(5,11,22,0.06), 0 4px 20px rgba(5,11,22,0.04)',
        'card-hover':  '0 4px 16px rgba(5,11,22,0.1), 0 12px 40px rgba(5,11,22,0.06)',
        'amber-glow':  '0 8px 24px rgba(245,158,11,0.3)',
        'amber-sm':    '0 4px 12px rgba(245,158,11,0.2)',
        'nav':         '0 2px 16px rgba(5,11,22,0.06)',
        'navy':        '0 8px 32px rgba(5,11,22,0.25)',
      },

      /* ======== BACKGROUND IMAGES ======== */
      backgroundImage: {
        'amber-gradient':   'linear-gradient(135deg, #D97706, #F59E0B, #FBBF24)',
        'amber-radial':     'radial-gradient(circle at center, rgba(245,158,11,0.15), transparent 70%)',
        'surface-gradient': 'linear-gradient(180deg, #111113, #0E0E10)',
        'noise':            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },

      /* ======== ANIMATIONS ======== */
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245,158,11,0.2)' },
          '50%':       { boxShadow: '0 0 40px rgba(245,158,11,0.4)' },
        },
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-right': {
          from: { opacity: 0, transform: 'translateX(-16px)' },
          to:   { opacity: 1, transform: 'translateX(0)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':       { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':       { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
      animation: {
        'shimmer':        'shimmer 1.5s ease-in-out infinite',
        'float':          'float 4s ease-in-out infinite',
        'glow':           'glow-pulse 2.5s ease-in-out infinite',
        'fade-up':        'fade-up 0.5s ease-out forwards',
        'slide-right':    'slide-right 0.4s ease-out forwards',
        'gradient':       'gradient-shift 3s ease infinite',
        'blob':           'blob 7s infinite',
        'spin-slow':      'spin 1.5s linear infinite',
      },

      /* ======== SPACING ======== */
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '68':  '17rem',
        '76':  '19rem',
        '84':  '21rem',
        '88':  '22rem',
        '92':  '23rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      /* ======== Z-INDEX ======== */
      zIndex: {
        '60':   '60',
        '70':   '70',
        '80':   '80',
        '90':   '90',
        '100':  '100',
        '1000': '1000',
      },

      /* ======== LINE HEIGHT ======== */
      lineHeight: {
        'heading': '1.1',
        'display': '1.05',
        'relaxed': '1.7',
      },

      /* ======== LETTER SPACING ======== */
      letterSpacing: {
        'display': '-0.03em',
        'heading': '-0.02em',
        'label':   '0.08em',
        'wide-xl': '0.12em',
      },

      /* ======== TRANSITION TIMING ======== */
      transitionTimingFunction: {
        'spring':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-expo':'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },

      /* ======== SCREENS ======== */
      screens: {
        'xs':  '375px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
