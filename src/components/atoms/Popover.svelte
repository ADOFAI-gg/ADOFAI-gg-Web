<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  export let anchorX: 'left' | 'right' = 'right';

  let open = false;

  const toggle = () => (open = !open);

  let button: HTMLElement;

  let position: { x: number; y: number } = { x: 0, y: 0 };

  let width = 0;

  let height = 0;

  let portal: HTMLElement;

  let ref: HTMLElement;

  const updatePosition = () => {
    if (button && width && height) {
      const rect = button.getBoundingClientRect();
      let x = rect.left + 6;
      let y = rect.top + button.clientHeight + 6;
      if (anchorX === 'right') {
        x -= width - rect.width + 12;
      }
      position = {
        x: Math.max(0, x),
        y: Math.max(0, y)
      };
    }
  };

  $: {
    if (button && width && height) {
      updatePosition();
    }
  }

  const onWindowClick = () => {
    if (open && !isHovered && !isButtonHovered) {
      open = false;
    }
  };

  onMount(() => {
    portal = document.createElement('div');
    document.body.appendChild(portal);
    portal.appendChild(ref);
  });

  onDestroy(() => {
    document.body.removeChild(portal);
  });

  let isHovered = false;

  const onHoverEnter = () => {
    isHovered = true;
  };

  const onHoverExit = () => {
    isHovered = false;
  };

  let isButtonHovered = false;

  const onButtonHoverEnter = () => {
    isButtonHovered = true;
  };

  const onButtonHoverExit = () => {
    isButtonHovered = false;
  };
</script>

<svelte:window on:click={onWindowClick} on:resize={updatePosition} />

<div>
  <div
    on:click={toggle}
    bind:this={button}
    on:mouseenter={onButtonHoverEnter}
    on:mouseleave={onButtonHoverExit}
  >
    <slot name="button" />
  </div>
  <div class="hidden">
    <div
      bind:this={ref}
      bind:clientWidth={width}
      bind:clientHeight={height}
      class="absolute rounded-md bg-dropdown max-w-[100vw] z-[90] transition-all overflow-auto {open
        ? `opacity-100`
        : `invisible opacity-0`}"
      style="left: {position.x}px; top: {position.y}px;"
      on:mouseenter={onHoverEnter}
      on:mouseleave={onHoverExit}
    >
      <slot />
    </div>
  </div>
</div>
