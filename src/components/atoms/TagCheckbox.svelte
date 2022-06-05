<script lang="ts">
  import { searchSetingStore } from '@/stores/search';

  import Translation from '../utils/Translation.svelte';

  import Icon from './Icon.svelte';

  import Tooltip from './Tooltip.svelte';

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

<Tooltip placement="bottom-start" options={{ arrow: false }}>
  <div
    slot="button"
    class="flex gap-[6px] transition-all opacity-60 hover:opacity-80 cursor-pointer"
    class:exclude={$searchSetingStore.filter.tags.exclude.includes(tag)}
    class:include={$searchSetingStore.filter.tags.include.includes(tag)}
    on:click={update}
  >
    <Icon size={22} namespace="tagIcons" icon={`${tag}`} />
    <div><Translation key="TAG_{tag}_NAME" /></div>
  </div>
  <div class="p-4">
    <div class="text-lg font-extrabold"><Translation key="TAG_{tag}_NAME" /></div>
    <div class="text-md mt-1"><Translation key="TAG_{tag}_DESCRIPTION" /></div>
  </div>
</Tooltip>

<style lang="scss">
  .exclude {
    @apply opacity-100;
    filter: invert(30%) sepia(57%) saturate(6528%) hue-rotate(333deg) brightness(99%) contrast(94%);
  }
  .include {
    @apply opacity-100;
  }
</style>
