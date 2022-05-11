<script lang="ts">
  import ShowMoreIcon from '../../assets/icons/showMore.svg?url';
  import Icon from './Icon.svelte';

  export let title: string;
  export let moreLink: string | null = null;
</script>

<div class="flex border-b border-opacity-20 border-b-white pb-[8px] items-end">
  <span class="text-3xl font-bold">{title}</span>

  <div class="flex-grow" />

  {#if moreLink}
    <a href={moreLink} class="text-xl flex gap-2">
      Show More
      <Icon icon={ShowMoreIcon} size={16} />
    </a>
  {/if}
</div>
