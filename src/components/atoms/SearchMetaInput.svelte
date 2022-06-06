<script lang="ts">
  import Avatar from './Avatar.svelte';

  export let placeholder: string | null = null;

  export let value = '';

  let inputType = 'text';

  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;

  const handleInput = (e: any) => {
    value = inputType.match(/^(number|range)$/) ? +e.target.value : e.target.value;
  };

  export { inputType as type };
</script>

<div class="bg-white bg-opacity-20 rounded-[5px] h-[30px] w-full relative">
  {#if placeholder}
    <div
      class="absolute placeholder flex items-center transition-opacity pointer-events-none h-full w-full px-2 leading-[0] z-[2]"
      class:opacity-0={!!value}
      class:opacity-40={!value}
    >
      {placeholder}
    </div>
  {/if}
  <input
    type={inputType}
    {value}
    on:input={handleInput}
    {min}
    {max}
    class="bg-transparent px-2 w-full outline-none h-full absolute left-0 top-0 z-[1]"
  />
</div>
