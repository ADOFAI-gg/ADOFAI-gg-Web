<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import Tooltip from '@atoms/common/Tooltip.svelte';
  import Translation from '@/components/utils/Translation.svelte';

  export let tag: number;
  export let size = 24;
</script>

<Tooltip placement="bottom-start">
  <Icon slot="button" icon={`${tag}`} namespace="tagIcons" {size} alt="tag icon" />

  <div style="padding: 12px; font-size: 14px;">
    <div style="font-weight: 700;">
      <Translation key="TAG_{tag}_NAME" />
    </div>

    <div style="font-weight: 400;">
      <Translation key="TAG_{tag}_DESCRIPTION" />
    </div>
  </div>
</Tooltip>
