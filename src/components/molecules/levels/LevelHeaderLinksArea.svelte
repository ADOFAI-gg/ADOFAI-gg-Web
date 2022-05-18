<script lang="ts">
  import Icon from '@/components/atoms/Icon.svelte';
  import type { Level } from '@/types';

  import SteamIcon from '@/assets/icons/steam.svg?url';
  import DownloadIcon from '@/assets/icons/download.svg?url';

  export let level: Level;
</script>

<div class="flex gap-[18px]">
  {#if level.workshop}
    <a href={level.workshop} target="_blank" rel="noreferer"><Icon icon={SteamIcon} size={36} /></a>
  {/if}
  {#if level.download}
    <a href={level.download} target="_blank" rel="noreferer"
      ><Icon icon={DownloadIcon} size={36} /></a
    >
  {/if}
</div>
