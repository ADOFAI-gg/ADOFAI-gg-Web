<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';

  export let icon: string;
  export let value: string;
</script>

<div class="flex gap-[6px] opacity-60 items-center">
  <Icon {icon} size={16} alt={`${icon} icon`} />
  <span class="text-md">{value}</span>
</div>
