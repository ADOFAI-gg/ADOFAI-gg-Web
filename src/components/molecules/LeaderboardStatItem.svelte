<script lang="ts">
  import Icon from '../atoms/Icon.svelte';

  export let icon: string;

  export let postfix = '';
</script>

<div class="flex gap-[4px] items-center">
  <div class="opacity-60">
    <Icon {icon} size={16} />
  </div>
  <div class="opacity-60 text-lg font-medium">
    <slot />
  </div>
  {#if postfix}
    <div class="text-lg font-regular opacity-40">
      {postfix}
    </div>
  {/if}
</div>
