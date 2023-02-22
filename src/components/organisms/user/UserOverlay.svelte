<script lang="ts">
  import { browser } from '$app/environment';

  import { api } from '@/api';

  import type { Member, PartialMember } from '@/types';
  import LoadingSpinner from '@atoms/common/LoadingSpinner.svelte';
  // import Avatar from '../atoms/Avatar.svelte';
  // import Button from '../atoms/Button.svelte';
  // import Image from '../atoms/Image.svelte';
  import UserOverlayDetail from '@molecules/user/UserOverlayDetail.svelte';
  // import Translation from '../utils/Translation.svelte';

  export let user: PartialMember;

  $: fullUserPromise = browser
    ? api.get<Member>(`/api/v1/members/${user.id}`).then((x) => x.data)
    : null;
</script>

<div class="user-overlay">
  {#if fullUserPromise}
    {#await fullUserPromise}
      <div class="user-overlay-loader"><LoadingSpinner size={36} /></div>
    {:then member}
      <div class="user-overlay-padder">
        <div class="user-overlay-content">
          <div class="name-text">{member.name}</div>
          <div class="divider" />
          <div class="details-container">
            <!-- <UserOverlayDetail label="USER_POPUP_RANKING" value="#66,236" /> -->
            <UserOverlayDetail label="USER_POPUP_TOTAL_PP" value={`${member.totalPp.toFixed(3)}`} />
          </div>
        </div>
      </div>
    {/await}
  {/if}
  <!-- <div class="absolute overflow-hidden top-0 h-[72px] w-full -z-10">
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
  </div> -->
</div>

<style lang="scss">
  .user-overlay {
    position: relative;
    width: 100vw;
    max-width: 256px;

    > .user-overlay-loader {
      display: flex;
      justify-content: center;
      padding: 12px 0;
    }

    > .user-overlay-padder {
      padding: 24px 0;

      > .user-overlay-content {
        display: flex;
        flex-direction: column;
        align-items: center;

        > .name-text {
          font-size: 21px;
          font-weight: 700;

          text-align: center;
        }

        > .divider {
          width: 110px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);

          margin: 16px 0;
        }

        > .details-container {
          display: flex;
          width: 100%;
          padding: 0 32px;
        }
      }
    }
  }
</style>
