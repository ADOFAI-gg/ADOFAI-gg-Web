<script lang="ts">
  export let label: string;
</script>

<div class="flex flex-col gap-[6px]">
  <div class="text-lg font-light opacity-80">{label}</div>
  <div class="text-3xl font-medium leading-[28px]"><slot /></div>
</div>
