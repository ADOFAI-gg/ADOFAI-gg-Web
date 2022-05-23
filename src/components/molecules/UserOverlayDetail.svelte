<script lang="ts">
  import Translation from '../utils/Translation.svelte';

  export let label: string;
  export let value: string;
</script>

<div class="flex text-center flex-col items-center flex-grow w-0">
  <div class="text-md font-light">
    <Translation key={label} />
  </div>
  <div class="text-lg font-medium">
    <Translation key={value} />
  </div>
</div>
