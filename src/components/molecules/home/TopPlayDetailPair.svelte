<script lang="ts">
  import Icon from '@/components/atoms/Icon.svelte';

  export let icon: string;
  export let value: string;
</script>

<div class="flex gap-[6px] opacity-60">
  <Icon {icon} size={16} />
  <span class="text-md">{value}</span>
</div>
