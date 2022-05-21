<script lang="ts">
  import 'tippy.js/dist/tippy.css';
  import { onDestroy, onMount } from 'svelte';

  import tippy, { type Instance, type Placement, type Props } from 'tippy.js';

  export let placement: Placement = 'auto';

  let content: HTMLElement;
  let button: HTMLElement;

  let instance: Instance;

  export let options: Partial<Props> = {};

  onMount(() => {
    instance = tippy(button, {
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
      hideOnClick: false,
      onClickOutside: () => {
        instance.hide();
      },
      interactive: true,
      ...options
    });
  });

  onDestroy(() => {
    instance.destroy();
  });
</script>

<div>
  <div bind:this={button}>
    <slot name="button" />
  </div>
  <div bind:this={content}>
    <slot />
  </div>
</div>
