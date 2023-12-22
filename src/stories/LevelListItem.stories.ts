import LevelListItem from '@/components/organisms/levels/list/LevelListItem.svelte';
import { dummpyLevel } from './dummpyData';
import type { Meta } from '@storybook/svelte';

export default {
  title: 'Level List Item',
  component: LevelListItem
} satisfies Meta;

export const Primary = {
  args: { level: dummpyLevel }
};
