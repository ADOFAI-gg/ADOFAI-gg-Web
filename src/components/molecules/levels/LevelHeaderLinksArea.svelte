<script lang="ts">
  import Icon from '@/components/atoms/Icon.svelte';
  import type { Level } from '@/types';

  export let level: Level;
</script>

<div class="flex gap-[18px]">
  {#if level.workshop}
    <a href={level.workshop} target="_blank" rel="noreferer"><Icon icon="steam" size={36} /></a>
  {/if}
  {#if level.download}
    <a href={level.download} target="_blank" rel="noreferer"><Icon icon="download" size={36} /></a>
  {/if}
</div>
