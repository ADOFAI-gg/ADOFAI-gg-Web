<script lang="ts">
  import Icon from '../atoms/Icon.svelte';
  import Search from '../../assets/icons/search.svg?url';

  export let value = '';
</script>

<div
  class="w-full rounded-full bg-white bg-opacity-20 h-[34px] flex items-center px-[13px] gap-[9px]"
>
  <Icon icon={Search} size="16" />
  <input
    bind:value
    type="text"
    class="bg-transparent outline-none flex-grow text-lg"
    placeholder="Search Level, Song, Artist, or Creator"
  />
</div>
