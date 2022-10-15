<script lang="ts">
  import Icon from '@/components/atoms/Icon.svelte';
  import Tooltip from '@/components/atoms/Tooltip.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Level } from '@/types';

  export let level: Level;
</script>

<div class="flex gap-[18px]">
  <!-- XXX Will be remove -->
  <Tooltip placement="bottom-end">
    <a slot="button" href="adofaigg://level/{level.id}">
      <Icon icon="playFilled" size={36} alt="Play button icon" />
    </a>
    <div class="p-2 text-lg font-medium">
      <Translation key="LEVEL_OPEN_IN_ADOFAI" />
    </div>
  </Tooltip>

  {#if level.workshop}
    <a href={level.workshop} target="_blank" rel="noreferer"
      ><Icon icon="steam" size={36} alt="Steam Workshop icon" /></a
    >
  {/if}
  {#if level.download}
    <a href={level.download} target="_blank" rel="noreferer"
      ><Icon icon="download" size={36} alt="Download icon" /></a
    >
  {/if}
</div>
