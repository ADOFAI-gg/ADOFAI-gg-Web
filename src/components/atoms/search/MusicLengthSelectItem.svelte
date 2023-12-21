<script lang="ts">
  import { searchSettingStore, type SearchSettings } from '@/stores/search';

  import Translation from '@/components/utils/Translation.svelte';

  import Icon from '@atoms/asset/Icon.svelte';
  import TagCheckboxBase from '@atoms/search/TagCheckboxBase.svelte';

  export let tag: number | string;

  export let icon = `${tag}`;

  export let namespace = 'tag';

  export let value: SearchSettings['filter']['musicLength'];

  const click = () => {
    const length = $searchSettingStore.filter.musicLength;
    if (length === value) {
      searchSettingStore.update((v) => ({
        ...v,
        filter: {
          ...v.filter,
          musicLength: null
        }
      }));
    } else {
      searchSettingStore.update((v) => ({
        ...v,
        filter: {
          ...v.filter,
          musicLength: value
        }
      }));
    }
  };
</script>

<TagCheckboxBase on:click={click} include={value === $searchSettingStore.filter.musicLength}>
  <Icon style="" size={22} namespace="tagIcons" {icon} slot="icon" alt="Tag Icon" />
  <Translation key="tags:{namespace}-{tag}-name" slot="name" />
  <Translation key="tags:{namespace}-{tag}-description" slot="description" />
</TagCheckboxBase>
