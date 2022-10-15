<script lang="ts">
  import Check from 'svelte-icons/fa/FaCheck.svelte';
  import Icon from '@atoms/asset/Icon.svelte';

  export let value: string;

  let currentTimeout: any = null;

  let copied = false;

  const copy = async () => {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
      currentTimeout = null;
    }

    if (window.isSecureContext) {
      await navigator.clipboard.writeText(value);
    }

    copied = true;

    currentTimeout = setTimeout(() => {
      copied = false;
    }, 1000);
  };
</script>

<div class="bg-black bg-opacity-40 p-2 rounded-md w-full flex gap-[6px]">
  <input type="text" readonly class="outline-none bg-transparent flex-grow w-0" {value} />
  <div
    class="w-[16px] h-[16px] flex-shrink-0 cursor-pointer"
    class:text-green-400={copied}
    on:click={copy}
  >
    {#if copied}
      <Icon size={16} icon="check" alt="Copy Success" />
    {:else}
      <Icon size={16} icon="copy" alt="Copy icon" />
    {/if}
  </div>
</div>
