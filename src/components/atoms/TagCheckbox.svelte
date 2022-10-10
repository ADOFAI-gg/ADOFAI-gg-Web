<script lang="ts">
  import { searchSetingStore } from '@/stores/search';

  import Translation from '../utils/Translation.svelte';

  import Icon from './Icon.svelte';
  import TagCheckboxBase from './TagCheckboxBase.svelte';

  export let tag: number;

  const update = () => {
    const state = $searchSetingStore.filter.tags;

    if (state.exclude.includes(tag)) {
      searchSetingStore.update((v) => ({
        ...v,
        filter: {
          ...v.filter,
          tags: {
            include: v.filter.tags.include,
            exclude: v.filter.tags.exclude.filter((x) => x !== tag)
          }
        }
      }));
    } else if (state.include.includes(tag)) {
      searchSetingStore.update((v) => ({
        ...v,
        filter: {
          ...v.filter,
          tags: {
            include: v.filter.tags.include.filter((x) => x !== tag),
            exclude: [...v.filter.tags.exclude, tag]
          }
        }
      }));
    } else {
      searchSetingStore.update((v) => ({
        ...v,
        filter: {
          ...v.filter,
          tags: {
            include: [...v.filter.tags.include, tag],
            exclude: v.filter.tags.exclude
          }
        }
      }));
    }
  };
</script>

<TagCheckboxBase
  include={$searchSetingStore.filter.tags.include.includes(tag)}
  exclude={$searchSetingStore.filter.tags.exclude.includes(tag)}
  on:click={update}
>
  <Icon class="" size={22} namespace="tagIcons" icon={`${tag}`} slot="icon" />
  <Translation key="TAG_{tag}_NAME" slot="name" />
  <Translation key="TAG_{tag}_DESCRIPTION" slot="description" />
</TagCheckboxBase>
