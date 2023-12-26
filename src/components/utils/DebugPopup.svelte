<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Button from '../atoms/interaction/Button.svelte';
  import { debugData } from '@/utils/debug';
  import Switch from '../atoms/form/Switch.svelte';

  let down = false;

  let dialogEl: HTMLDivElement;
  let startDialogX = 0;
  let startDialogY = 0;
  let startMouseX = 0;
  let startMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;

  let show = false;

  const onMouseDown = (e: MouseEvent) => {
    down = true;

    const rect = dialogEl.getBoundingClientRect();

    startDialogX = rect.x;
    startDialogY = rect.y;
    startMouseX = e.x;
    startMouseY = e.y;
  };

  const close = () => {
    show = false;
  };

  const onMouseUp = () => {
    down = false;
  };

  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.x;
    mouseY = e.y;
    if (!down) return;
    const deltaX = startMouseX - e.x;
    const deltaY = startMouseY - e.y;
    dialogEl.style.top = `${startDialogY - deltaY}px`;
    dialogEl.style.left = `${startDialogX - deltaX}px`;
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.altKey && e.code === 'KeyD') {
      show = !show;
      if (show) {
        dialogEl.style.top = `${mouseY}px`;
        dialogEl.style.left = `${mouseX}px`;
      }
    }
  };

  onMount(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('keypress', onKey);
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('keypress', onKey);
  });
</script>

<div class="debug-menu" bind:this={dialogEl} class:show>
  <button class="debug-menu-header" on:mousedown={onMouseDown} on:mouseup={onMouseUp}>
    <div class="debug-menu-title">Debug Menu</div>
    <Button on:click={close}>Close</Button>
  </button>
  <div class="debug-menu-content">
    <div class="debug-control">
      <div class="debug-label">Verification Notification</div>
      <Switch bind:checked={$debugData.emailVerificationNotification} />
    </div>
  </div>
</div>

<style lang="scss">
  .debug-control {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .debug-label {
    flex-grow: 1;
  }

  .debug-menu {
    position: fixed;
    z-index: 999999;
    min-width: 300px;
    padding: 24px;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    visibility: hidden;
    transition:
      opacity ease 0.2s,
      visibility ease 0.2s;
    backdrop-filter: blur(24px);

    &.show {
      opacity: 1;
      visibility: visible;
    }

    &-header {
      display: flex;
      width: 100%;
      text-align: left;
      cursor: move;
      user-select: none;
    }

    &-title {
      flex-grow: 1;
      font-weight: 700;
      font-size: 20px;
    }

    &-content {
      margin-top: 12px;
    }
  }
</style>
