<script lang="ts">
  import { searchSetingStore, type SearchSettings } from '@/stores/search';

  import Translation from '../utils/Translation.svelte';

  import Icon from './Icon.svelte';
  import TagCheckboxBase from './TagCheckboxBase.svelte';

  export let tag: number | string;

  export let icon = `${tag}`;

  export let namespace = 'TAG';

  export let value: SearchSettings['filter']['musicLength'];

  const click = () => {
    const length = $searchSetingStore.filter.musicLength;
    if (length === value) {
      searchSetingStore.update((v) => ({
        ...v,
        filter: {
          ...v.filter,
          musicLength: null
        }
      }));
    } else {
      searchSetingStore.update((v) => ({
        ...v,
        filter: {
          ...v.filter,
          musicLength: value
        }
      }));
    }
  };
</script>

<TagCheckboxBase on:click={click} include={value === $searchSetingStore.filter.musicLength}>
  <Icon class="" size={22} namespace="tagIcons" {icon} slot="icon" />
  <Translation key="{namespace}_{tag}_NAME" slot="name" />
  <Translation key="{namespace}_{tag}_DESCRIPTION" slot="description" />
</TagCheckboxBase>
