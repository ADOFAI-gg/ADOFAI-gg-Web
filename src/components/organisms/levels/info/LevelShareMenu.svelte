<script lang="ts">
  import Button from '@atoms/interaction/Button.svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import Popover from '@atoms/common/Popover.svelte';
  import { page } from '$app/stores';

  import type { Level } from '@/types';
  import CopyableInput from '@atoms/interaction/CopyableInput.svelte';
  import ShareButton from '@molecules/ShareButton.svelte';
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
  <Button
    type="levelAction"
    slot="button"
    class="w-[36px] h-[36px] flex justify-center items-center"
  >
    <Icon icon="share" size={20} alt="Share Icon" />
  </Button>

  <div class="p-4 flex flex-col gap-2 max-w-[320px] w-screen">
    <div class="text-xl font-bold">Share</div>
    <CopyableInput value={url} />
    <div class="flex gap-2">
      <ShareButton on:click={copy}>
        <Icon size={16} icon="copy" alt="Copy Icon" />
      </ShareButton>
      <ShareButton on:click={twitter} class="bg-blue">
        <Twitter />
      </ShareButton>
    </div>
  </div>
</Popover>
