import Switch from '@/components/atoms/form/Switch.svelte';
import type { Meta } from '@storybook/svelte';

export default {
  title: 'Switch',
  component: Switch,
  parameters: {
    actions: {
      handles: ['change']
    }
  }
} satisfies Meta;

export const Primary = {};
