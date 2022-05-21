<script lang="ts">
  import type { User } from '@/types';
  import Avatar from '../atoms/Avatar.svelte';
  import Popover from '../atoms/Popover.svelte';
  import UserOverlay from '../organisms/UserOverlay.svelte';

  export let user: User;

  export let popup = false;
</script>

<Popover
  placement={popup ? 'right' : 'bottom'}
  options={{
    offset: popup ? [0, 20] : [0, 10],
    arrow: !popup
  }}
>
  <div
    slot="button"
    class="flex gap-[6px] items-center {popup
      ? 'text-lg'
      : 'text-2xl'} font-medium whitespace-nowrap"
  >
    <Avatar size={popup ? 20 : 24} url={user.avatar} />
    {user.name}
  </div>
  <UserOverlay {user} />
</Popover>
