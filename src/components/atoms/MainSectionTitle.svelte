<script lang="ts">
  import Icon from './Icon.svelte';

  export let title: string;
  export let moreLink: string | null = null;
</script>

<div class="flex border-b border-opacity-20 border-b-white pb-[8px] mb-[24px] items-end">
  <span class="text-3xl font-bold">{title}</span>

  <div class="flex-grow" />

  {#if moreLink}
    <a href={moreLink} class="transition text-xl flex gap-[8px] hover:font-medium hover:gap-[10px]">
      Show More <span> ›</span>
    </a>
  {/if}
</div>
