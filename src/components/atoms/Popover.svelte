<script lang="ts">
  import 'tippy.js/dist/tippy.css';

  import tippy, { type Placement, type Props } from 'tippy.js';
  import LoadingSpinner from './LoadingSpinner.svelte';

  export let placement: Placement = 'auto';

  let content: HTMLElement;
  let button: HTMLElement;

  export let options: Partial<Props> = {};

  let show = false;

  $: subscriber = {
    subscribe: () => {
      if (typeof window === 'undefined') {
        return () => null;
      }

      if (!content || !button) return () => null;

      console.log(content);

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
        ...options,
        onShow: (i) => {
          show = true;
          if (options.onShow) options.onShow(i);
        },
        onHidden: (i) => {
          show = false;

          if (options.onHidden) options.onHidden(i);
        }
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
    {#if show}
      <slot />
    {/if}
  </div>
</div>
