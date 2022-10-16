<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';

  export let label: string;
</script>

<div class="flex flex-col">
  <div class="text-lg font-light opacity-80"><Translation key={label} /></div>
  <div class="text-3xl font-medium leading-[24px] mt-[6px]"><slot /></div>
</div>
