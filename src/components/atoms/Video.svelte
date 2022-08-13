<script lang="ts">
  import { browser } from '$app/env';
  import { onMount } from 'svelte';

  export let videoId: string;

  export let iframe: HTMLIFrameElement | null = null;

  // eslint-disable-next-line no-undef
  export let player: YT.Player | null = null;

  $: origin = (() => {
    if (!browser) return '';

    return `${window.location.protocol}//${window.location.host}`;
  })();

  onMount(() => {
    // eslint-disable-next-line no-undef
    const p = new YT.Player(iframe!, {
      events: {
        onReady: () => {
          player = p;
        }
      }
    });
  });
</script>

<div class="w-full aspect-video rounded-[16px] overflow-hidden">
  <iframe
    bind:this={iframe}
    type="text/html"
    width="100%"
    height="100%"
    title="Video"
    src="https://www.youtube.com/embed/{videoId}?enablejsapi=1&origin={origin}"
    frameborder="0"
  />
</div>
