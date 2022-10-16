module.exports = {
  content: [
    process.argv[1].includes('start-storybook') ? './src/**/*.{svelte,mdx}' : './src/**/*.svelte'
  ],
  theme: {
    extend: {
      keyframes: (theme) => ({
        // 가져옴
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }),
      animation: {
        // 가져옴
        'fade-in': 'fadeIn 0.2s linear'
      },
      colors: {
        // 가져옴
        yellow: '#FFE76E',
        red: '#F54F51',
        blue: '#4D93FC',
        cyan: '#2FBAAF',
        black: '#000000',
        darkblue: '#00020F',
        dropdown: '#0B1823',
        darkblue40: '#00020F66',
        white: '#FFFFFF'
      },
      fontSize: {
        // 가져옴
        xs: '11px',
        md: '14px',
        lg: '16px',
        xl: '21px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '36px'
      },
      fontFamily: {
        // 가져옴
        sans: ['"Quicksand", "M PLUS Rounded 1c", "NanumSquareRound", sans-serif'],
        mono: ['"Roboto Mono"', 'monospace']
      },
      fontWeight: {
        // 가져옴
        light: '300',
        regular: '400',
        medium: '500',
        bold: '700'
      },
      letterSpacing: {
        // 가져옴
        normal: '-0.011em'
      },
      height: {
        nav: '56px'
      },
      dropShadow: {
        // 가져옴
        6: '0px 0px 6px #000000',
        5: '0px 0px 5px 0px rgba(0, 0, 0, 0.75)'
      }
    }
  },
  plugins: [],
  mode: 'jit'
};
