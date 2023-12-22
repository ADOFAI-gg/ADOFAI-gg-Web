import type { Preview } from '@storybook/svelte';
import '../src/stylesheets/main.scss';
import StorybookGlobalDecorator from '../src/components/storybook/StorybookGlobalDecorator.svelte';
import { withActions } from '@storybook/addon-actions/decorator';

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
          value: 'rgba(35, 43, 90, 1)'
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
  },
  // @ts-expect-error (maybe) storybook type issue
  decorators: [() => StorybookGlobalDecorator, withActions]
};

export default preview;
