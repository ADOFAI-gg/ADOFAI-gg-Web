<script lang="ts">
  import Button from '@atoms/interaction/Button.svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import Popover from '@atoms/common/Popover.svelte';
  import { page } from '$app/stores';

  import type { Level } from '@/types';
  import CopyableInput from '@atoms/interaction/CopyableInput.svelte';
  import ShareButton from '@molecules/ShareButton.svelte';
  import Facebook from 'svelte-icons/fa/FaFacebook.svelte';
  import Twitter from 'svelte-icons/fa/FaTwitter.svelte';

  export let level: Level;

  $: url = `${$page.url.protocol}//${$page.url.host}/levels/${level.id}`;

  const facebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      'facebook-share-dialog',
      'width=800,height=600'
    );
  };

  const twitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?${new URLSearchParams({
        text: `${level.music.artists.map((x) => x.name).join(' & ')} - ${level.title}\n`,
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
      <ShareButton on:click={facebook} style="background-color: rgb(24, 119, 242);">
        <Facebook />
      </ShareButton>

      <ShareButton on:click={twitter} style="background-color: rgb(29, 155, 240);">
        <Twitter />
      </ShareButton>
    </div>
  </div>
</Popover>
