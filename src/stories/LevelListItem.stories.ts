import LevelListItem from '@/components/organisms/levels/list/LevelListItem.svelte';
import { dummpyLevel } from './dummpyData';

export default {
  title: 'Level List Item',
  component: LevelListItem
};

export const Primary = {
  render: () => ({
    Component: LevelListItem,
    props: {
      level: dummpyLevel
    }
  })
};
