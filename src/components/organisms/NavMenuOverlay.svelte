<script lang="ts">
  import NavSignArea from '../molecules/NavSignArea.svelte';
  import NavLinks from '../molecules/NavLinks.svelte';
  import { createEventDispatcher } from 'svelte';
  import clsx from 'clsx';
  import { browser } from '$app/env';

  export let open: boolean;

  const dispatch = createEventDispatcher();

  const close = () => {
    dispatch('close');
  };

  $: listener = {
    subscribe() {
      if (!browser) {
        return () => null;
      }

      const fn = () => {
        if (open) {
          close();
        }
      };

      window.addEventListener('mouseup', fn);
      return () => {
        window.removeEventListener('mouseup', fn);
      };
    }
  };

  $: $listener;
</script>

<div
  class={clsx(
    'bg-dropdown absolute right-0 top-full mt-4 mr-4 p-4 rounded-[5px] w-[240px] transition-all',
    {
      invisible: !open,
      visible: open,
      'opacity-0': !open
    }
  )}
>
  <div class="block md:hidden flex flex-col gap-4">
    <NavLinks />
    <div class="bg-white bg-opacity-20 w-full h-[1px]" />
    <NavSignArea />
  </div>
</div>
