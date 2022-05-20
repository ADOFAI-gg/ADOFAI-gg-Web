<script lang="ts">
  import type { User } from '@/types';
  import Avatar from '../atoms/Avatar.svelte';

  export let user: User;
</script>

<div class="flex gap-[6px] items-center text-2xl font-medium whitespace-nowrap">
  <span class="drop-shadow-6 w-[24px] h-[24px]"><Avatar url={user.avatar} /></span>
  {user.name}
</div>
