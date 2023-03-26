<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  export let videoId: string;

  export let startTime = 0;

  export let iframe: HTMLIFrameElement | null = null;

  // eslint-disable-next-line no-undef
  export let player: YT.Player | null = null;

  $: origin = (() => {
    if (!browser) return '';

    return `${window.location.protocol}//${window.location.host}`;
  })();

  onMount(() => {
    if (!iframe) return;
    (async () => {
      while (!window.YT?.Player) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // eslint-disable-next-line no-undef
      const p = new YT.Player(iframe, {
        events: {
          onReady: () => {
            player = p;
          }
        }
      });
    })();
  });
</script>

<div class="video">
  <iframe
    bind:this={iframe}
    width="100%"
    height="100%"
    title="Video"
    src="https://www.youtube.com/embed/{videoId}?enablejsapi=1&origin={origin}&start={startTime}"
    allow="fullscreen"
    frameborder="0"
  />
</div>

<style lang="scss">
  .video {
    overflow: hidden;
    width: 100%;
    border-radius: 16px;
    aspect-ratio: 16 / 9;
  }
</style>
