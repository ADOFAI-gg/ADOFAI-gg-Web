<script lang="ts">
  import Translation from '../utils/Translation.svelte';

  export let title: string;
</script>

<div>
  <div class="text-lg opacity-60 font-medium">
    <Translation key={title} />
  </div>
  <div class="flex flex-col mt-[4px] leading-[24px] text-md">
    <slot />
  </div>
</div>
