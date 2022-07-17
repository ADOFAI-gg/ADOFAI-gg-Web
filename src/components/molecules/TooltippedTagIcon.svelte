<script lang="ts">
  import Icon from '../atoms/Icon.svelte';
  import Tooltip from '../atoms/Tooltip.svelte';
  import Translation from '../utils/Translation.svelte';

  export let tag: number;
</script>

<Tooltip placement="bottom-start">
  <Icon slot="button" icon={`${tag}`} namespace="tagIcons" size={24} />
  <div class="p-[12px] text-md">
    <div class="font-bold">
      <Translation key="TAG_{tag}_NAME" />
    </div>
    <div class="font-regular">
      <Translation key="TAG_{tag}_DESCRIPTION" />
    </div>
  </div>
</Tooltip>
