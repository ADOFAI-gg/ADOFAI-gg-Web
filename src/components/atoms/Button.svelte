<script lang="ts">
  export let href = '';
  export let type = 'default';

  $: className = (() => {
    switch (type) {
      case 'nav':
        return 'opacity-60 font-medium hover:opacity-100 transition-opacity px-[20px] border-[1px] py-[8px] text-md rounded-full text-center';
      case 'bordered':
        return 'opacity-60 hover:opacity-100 transition-opacity px-[10px] border-[1px] py-[8px] rounded-[6px] text-center';
      case 'levelAction':
        return 'bg-darkblue bg-opacity-40 hover:bg-opacity-60 transition-all p-[6px] rounded-[3px]';
      case 'search':
        return 'border opacity-80 border-opacity-40 border-white flex items-center justify-center w-[23px] md:w-fit h-[23px] md:px-2 rounded-[5px] gap-[6px] hover:opacity-100 transition-all';
      default:
        return 'bg-white bg-opacity-20 h-[42px] px-8 rounded-[5px] text-lg hover:bg-opacity-30 transition-colors text-center';
    }
  })();
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {href}
  {...$$props}
  class={$$props.class ? className + ' ' + $$props.class : className}
>
  <slot />
</svelte:element>
