<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';

  export let title: string;
</script>

<div>
  <div class="text-lg"><Translation key={title} /></div>
  <div class="border-t mt-[12px] mb-[10px] border-opacity-20 border-white" />
  <div class="flex flex-col gap-[10px]">
    <slot />
  </div>
</div>
