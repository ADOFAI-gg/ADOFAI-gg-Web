<script lang="ts">
  import 'tippy.js/dist/tippy.css';

  import tippy, { type Placement, type Props } from 'tippy.js';

  export let placement: Placement = 'auto';

  let content: HTMLElement;
  let button: HTMLElement;

  export let options: Partial<Props> = {};

  $: subscriber = {
    subscribe: () => {
      if (typeof window === 'undefined') {
        return () => null;
      }

      if (!content || !button) return () => null;

      const instance = tippy(button, {
        content,
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
  <div style="display: none;">
    <div bind:this={content}>
      <slot />
    </div>
  </div>
</div>
