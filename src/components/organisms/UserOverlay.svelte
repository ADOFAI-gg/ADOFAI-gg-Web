<script lang="ts">
  import type { User } from '@/types';
  import Avatar from '../atoms/Avatar.svelte';
  import Button from '../atoms/Button.svelte';
  import Image from '../atoms/Image.svelte';
  import UserOverlayDetail from '../molecules/UserOverlayDetail.svelte';
  import Translation from '../utils/Translation.svelte';

  export let user: User;
</script>

<div class="relative w-screen max-w-[256px] pt-[32px] pb-[24px]">
  <div class="absolute overflow-hidden top-0 h-[72px] w-full -z-10">
    <Image src={user.banner} width="100%" height="100%" />
  </div>
  <div class="flex flex-col items-center">
    <Avatar url={user.avatar || null} size={88} />
    <div class="mt-[12px] text-xl font-bold">{user.name}</div>
    <div class="text-center text-md opacity-60 font-medium">
      :NekoD: :NekoD: :NekoD: :NekoD: :NekoD: :NekoD: :NekoD: :NekoD:
    </div>
    <div class="w-[110px] border-b opacity-40 my-[16px]" />
    <div class="flex w-full px-[32px]">
      <UserOverlayDetail label="USER_POPUP_RANKING" value="#66,236" />
      <UserOverlayDetail label="USER_POPUP_TOTAL_PP" value="20,854.81" />
    </div>
    <Button href="/users/{user.id}" type="bordered" class="mt-[24px] text-md border-blue text-blue">
      <Translation key="USER_POPUP_SHOW_MORE_LINK" />
    </Button>
  </div>
</div>
