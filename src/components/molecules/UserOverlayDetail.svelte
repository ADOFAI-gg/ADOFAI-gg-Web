<script lang="ts">
  export let label: string;
  export let value: string;
</script>

<div class="flex text-center flex-col items-center flex-grow w-0">
  <div class="text-md font-light">{label}</div>
  <div class="text-lg font-medium">{value}</div>
</div>
