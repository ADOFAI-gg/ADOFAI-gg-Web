<script lang="ts">
  import Icon from '../atoms/Icon.svelte';

  export let value = '';
</script>

<div
  class="w-full rounded-full bg-white bg-opacity-20 h-[34px] flex items-center px-[13px] gap-[9px]"
>
  <Icon icon="search" size={16} />
  <input
    bind:value
    type="text"
    class="bg-transparent outline-none flex-grow text-lg w-0"
    placeholder="Search Level, Song, Artist, or Creator"
  />
</div>
