<script lang="ts">
  import Translation from '../utils/Translation.svelte';

  export let label: string;
</script>

<div>
  <div class="opacity-80">
    <Translation key={label} />
  </div>
  <div class="mt-[4px]">
    <slot />
  </div>
</div>
