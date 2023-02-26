<script lang="ts">
  import 'tippy.js/dist/tippy.css';

  import tippy, { type Placement, type Props } from 'tippy.js';

  export let placement: Placement = 'auto';

  let content: HTMLElement;
  export let button: HTMLElement | null = null;

  export let options: Partial<Props> = {};

  let show = false;

  $: subscriber = {
    subscribe: () => {
      if (typeof window === 'undefined') {
        return () => null;
      }

      if (!content || !button) return () => null;

      const instance = tippy(button, {
        content,
        trigger: 'focus click',
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

<div {...$$restProps}>
  <div bind:this={button} aria-expanded={show} role="button" tabindex="0">
    <slot name="button" />
  </div>

  <div role="menu" bind:this={content}>
    {#if show}
      <slot />
    {/if}
  </div>
</div>
