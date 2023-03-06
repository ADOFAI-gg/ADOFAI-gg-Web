import type { Preview } from '@storybook/svelte';
import '../src/stylesheets/main.scss'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'image',
      values: [
        {
          name: 'image',
          value: `url('/background.webp')`
        },
        {
          name: 'solid',
          value: 'rgba(var(--color-bg-solid), 1)'
        }
      ]
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
