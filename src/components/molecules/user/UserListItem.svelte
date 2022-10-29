<script lang="ts">
  import type { PartialMember } from '@/types';
  import Popover from '@atoms/common/Popover.svelte';
  import UserOverlay from '@organisms/user/UserOverlay.svelte';

  export let user: PartialMember;

  export let popup = false;

  // const useAccount = !!import.meta.env.VITE_USE_ACCOUNT;

  $: itemClasses = `flex gap-[6px] cursor-pointer items-center font-medium whitespace-nowrap ${
    popup ? 'text-lg' : 'text-2xl'
  }`;
</script>

<Popover
  placement={popup ? 'right' : 'bottom'}
  options={{
    offset: popup ? [0, 20] : [0, 10],
    arrow: !popup
  }}
>
  <div slot="button" class={itemClasses}>
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
