<script lang="ts">
  import type { User } from '@/types';
  import Avatar from '../atoms/Avatar.svelte';

  export let user: User;

  export let small = false;
</script>

<div
  class="flex gap-[6px] items-center {small ? 'text-lg' : 'text-2xl'} font-medium whitespace-nowrap"
>
  <Avatar size={small ? 20 : 24} url={user.avatar} />
  {user.name}
</div>
