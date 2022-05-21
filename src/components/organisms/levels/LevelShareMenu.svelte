<script lang="ts">
  import Button from '@/components/atoms/Button.svelte';
  import Icon from '@/components/atoms/Icon.svelte';
  import Popover from '@/components/atoms/Popover.svelte';
  import { page } from '$app/stores';

  import type { Level } from '@/types';
  import CopyableInput from '@/components/atoms/CopyableInput.svelte';
  import ShareButton from '@/components/molecules/ShareButton.svelte';
  import Copy from 'svelte-icons/fa/FaCopy.svelte';
  import Twitter from 'svelte-icons/fa/FaTwitter.svelte';

  export let level: Level;

  $: url = `${$page.url.protocol}//${$page.url.host}/levels/${level.id}`;

  const copy = () => {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(url);
    }
  };

  const twitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?${new URLSearchParams({
        text: `${level.artists.join(' & ')} - ${level.title}\n`,
        url
      })}`
    );
  };
</script>

<Popover placement="top-end">
  <Button type="levelAction" slot="button">
    <Icon icon="share" size={20} />
  </Button>
  <div class="p-4 flex flex-col gap-2 max-w-[320px] w-screen">
    <div class="text-xl font-bold">Share</div>
    <CopyableInput value={url} />
    <div class="flex gap-2">
      <ShareButton on:click={copy}>
        <Copy />
      </ShareButton>
      <ShareButton on:click={twitter} class="bg-blue">
        <Twitter />
      </ShareButton>
    </div>
  </div>
</Popover>
