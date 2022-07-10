module.exports = {
  content: [
    process.argv[1].includes('start-storybook') ? './src/**/*.{svelte,mdx}' : './src/**/*.svelte'
  ],
  theme: {
    extend: {
      keyframes: (theme) => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }),
      animation: {
        'fade-in': 'fadeIn 0.2s linear'
      },
      colors: {
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
        xs: '11px',
        md: '14px',
        lg: '16px',
        xl: '21px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '36px'
      },
      fontFamily: {
        sans: ['"Quicksand", "M PLUS Rounded 1c", "NanumSquareRound", sans-serif']
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        bold: '700'
      },
      letterSpacing: {
        normal: '-0.011em'
      },
      height: {
        nav: '56px'
      },
      dropShadow: {
        6: '0px 0px 6px #000000',
        5: '0px 0px 5px 0px rgba(0, 0, 0, 0.75)'
      }
    }
  },
  plugins: [],
  mode: 'jit'
};
