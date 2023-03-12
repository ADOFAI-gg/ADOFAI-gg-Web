<script lang="ts">
  import { searchSettingStore } from '@/stores/search';

  import Translation from '@/components/utils/Translation.svelte';

  import Icon from '@atoms/asset/Icon.svelte';
  import TagCheckboxBase from '@atoms/search/TagCheckboxBase.svelte';

  export let tag: number;

  const update = () => {
    const state = $searchSettingStore.filter.tags;

    if (state.exclude.includes(tag)) {
      searchSettingStore.update((v) => ({
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
      searchSettingStore.update((v) => ({
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
      searchSettingStore.update((v) => ({
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
  include={$searchSettingStore.filter.tags.include.includes(tag)}
  exclude={$searchSettingStore.filter.tags.exclude.includes(tag)}
  on:click={update}
>
  <Icon style="" size={22} namespace="tagIcons" icon={`${tag}`} slot="icon" alt="tag icon" />
  <Translation key="TAG_{tag}_NAME" slot="name" />
  <Translation key="TAG_{tag}_DESCRIPTION" slot="description" />
</TagCheckboxBase>
