<script lang="ts">
  import type { User } from '@/types';
  import UserListItem from '../molecules/UserListItem.svelte';

  export let users: User[] | string[];

  export let label: string;

  export let moreTitle: string | null = null;

  $: resolvedUsers = (async () => {
    if (typeof users[0] === 'string') {
      return users.map(
        (x) =>
          ({
            id: x,
            name: x
          } as User)
      );
    }
    return users;
  })() as Promise<User[]>;
</script>

{#await resolvedUsers then data}
  <div class="flex md:gap-[24px] md:items-center text-shadow-6 flex-col md:flex-row">
    <span class="text-2xl font-regular whitespace-nowrap">{label}</span>
    <div class="flex-grow flex items-center gap-[12px] overflow-hidden">
      {#each data as user (user.id)}
        <UserListItem {user} />
      {/each}
    </div>
  </div>
{/await}
