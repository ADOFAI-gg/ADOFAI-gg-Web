<script lang="ts">
  import Translation from '../utils/Translation.svelte';

  export let title: string;
  export let moreLink: string | null = null;
</script>

<div class="flex border-b border-opacity-20 border-b-white pb-[8px] mb-[24px] items-end">
  <span class="text-3xl font-bold"> <Translation key={title} /></span>

  <div class="flex-grow" />

  {#if moreLink}
    <a
      href={moreLink}
      class="text-xl flex gap-[8px] hover:font-medium hover:gap-[10px] ease transition-all"
    >
      <Translation key="SHOW_MORE" /> <span> ›</span>
    </a>
  {/if}
</div>
