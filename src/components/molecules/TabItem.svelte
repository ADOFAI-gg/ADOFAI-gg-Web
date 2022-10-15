<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';

  type T = $$Generic;

  const currentValue = getContext<Writable<T>>('tabValue');

  export let value: T;

  $: active = $currentValue === value;

  export let title: string;

  export let icon: string | undefined = undefined;

  const activate = () => {
    $currentValue = value;
  };
</script>

<button
  class="flex-grow cursor-pointer select-none flex-shrink-0 relative overflow-hidden
    {active ? 'bg-darkblue/40' : 'bg-darkblue/20 hover:bg-darkblue/30 focus:bg-darkblue/30'}
    transition-all h-[42px] flex justify-center items-center gap-[10px] rounded-[8px] font-medium"
  on:click={activate}
>
  {#if icon}
    <Icon size={18} {icon} alt="{icon} icon" />
  {/if}
  <div>
    <Translation key={title} />
  </div>
  <div
    class="absolute bottom-0 h-[2px] w-full left-0 bg-blue transition-opacity
      {active ? 'opacity-100' : 'opacity-0'}"
  />
</button>
