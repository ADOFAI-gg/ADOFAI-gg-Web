<script lang="ts">
  import type { User } from '@/types';
  import Avatar from '../atoms/Avatar.svelte';
  import Popover from '../atoms/Popover.svelte';
  import UserOverlay from '../organisms/UserOverlay.svelte';

  export let user: User;

  export let small = false;
</script>

<Popover
  placement={small ? 'right' : 'bottom'}
  options={{
    offset: small ? [0, 20] : [0, 10],
    arrow: !small
  }}
>
  <div
    slot="button"
    class="flex gap-[6px] items-center {small
      ? 'text-lg'
      : 'text-2xl'} font-medium whitespace-nowrap"
  >
    <Avatar size={small ? 20 : 24} url={user.avatar} />
    {user.name}
  </div>
  <UserOverlay {user} />
</Popover>
