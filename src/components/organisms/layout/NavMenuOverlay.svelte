<script lang="ts" context="module">
  export type NavMenuTabType = 'lang' | 'accessibility' | null;
  export const getNavCurrentTab = () => getContext<Writable<NavMenuTabType>>('currentTab');
</script>

<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { fade } from 'svelte/transition';
  import DefaultMenuOverlayContent from './DefaultMenuOverlayContent.svelte';
  import MenuOverlayAccessibilityTab from './MenuOverlayAccessibilityTab.svelte';
  import MenuOverlayLangTab from './MenuOverlayLangTab.svelte';

  let currentTab = writable<NavMenuTabType>(null);

  setContext('currentTab', currentTab);

  let height = 0;
  let width = 0;
</script>

<div class="menu" style="--width: {width}px; --height: {height}px;">
  {#if $currentTab === 'lang'}
    <div transition:fade class="menu-group" bind:clientWidth={width} bind:clientHeight={height}>
      <MenuOverlayLangTab />
    </div>
  {:else if $currentTab === 'accessibility'}
    <div transition:fade class="menu-group" bind:clientWidth={width} bind:clientHeight={height}>
      <MenuOverlayAccessibilityTab />
    </div>
  {:else}
    <div transition:fade class="menu-group" bind:clientWidth={width} bind:clientHeight={height}>
      <DefaultMenuOverlayContent />
    </div>
  {/if}
</div>

<style lang="scss">
  .menu {
    position: relative;
    overflow: hidden;
    width: var(--width);
    height: var(--height);
    transition: height ease 0.2s;

    &-group {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      gap: 26px;
      width: 240px;
      padding: 16px;
    }
  }
</style>
