<script lang="ts">
  import type { PartialMember } from '@/types';
  import Popover from '@atoms/common/Popover.svelte';
  import UserOverlay from '@organisms/user/UserOverlay.svelte';

  export let user: PartialMember;

  export let popup = false;

  // const useAccount = !!import.meta.env.VITE_USE_ACCOUNT;
</script>

<Popover
  placement={popup ? 'right' : 'bottom'}
  options={{
    offset: popup ? [0, 20] : [0, 10],
    arrow: !popup
  }}
>
  <div slot="button" class="user" style="font-size: {popup ? '16px' : '24px'};">
    <!-- <Avatar size={popup ? 20 : 24} url={user.avatar} /> -->
    {user.name}
  </div>

  <UserOverlay {user} />
</Popover>

<!-- {#if useAccount}
  <Popover
    placement={popup ? 'right' : 'bottom'}
    options={{
      offset: popup ? [0, 20] : [0, 10],
      arrow: !popup
    }}
  >
    <div slot="button" class={itemClasses}>
      <Avatar size={popup ? 20 : 24} url={user.avatar} />
      {user.name}
    </div>
    <UserOverlay {user} />
  </Popover>
{:else}
  <a href="/users/{user.id}" class={itemClasses}>
    <Avatar size={popup ? 20 : 24} url={user.avatar} />
    {user.name}
  </a>
{/if} -->
<style lang="scss">
  .user {
    position: relative;
    display: flex;
    gap: 6px;
    align-items: center;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      border-radius: 100em;
      background-color: white;
      opacity: 0.4;
      transition: width 0.2s ease-in-out;
    }

    &:hover,
    &:focus {
      &::after {
        display: block;
        width: 100%;
      }
    }
  }
</style>
