<script lang="ts">
  import 'tippy.js/dist/tippy.css';
  import { onDestroy, onMount } from 'svelte';

  import tippy, { type Instance, type Placement, type Props } from 'tippy.js';

  export let placement: Placement = 'auto';

  let content: HTMLElement;
  let button: HTMLElement;

  let instance: Instance;

  export let options: Partial<Props> = {};

  $: subscriber = {
    subscribe: () => {
      if (typeof window === 'undefined') {
        return () => null;
      }

      if (!content || !button) return () => null;

      const instance = tippy(button, {
        content,
        trigger: 'click',
        placement,
        popperOptions: {
          strategy: 'fixed',
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                altAxis: true,
                tether: false
              }
            }
          ]
        },
        hideOnClick: 'toggle',
        onClickOutside: () => {
          instance.hide();
        },
        interactive: true,
        ...options
      });

      return () => {
        instance?.destroy?.();
      };
    }
  };

  $subscriber;
</script>

<div>
  <div bind:this={button}>
    <slot name="button" />
  </div>
  <div bind:this={content}>
    <slot />
  </div>
</div>
