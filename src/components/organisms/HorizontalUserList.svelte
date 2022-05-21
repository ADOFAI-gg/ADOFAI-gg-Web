<script lang="ts">
  import type { User } from '@/types';
  import Icon from '../atoms/Icon.svelte';
  import Popover from '../atoms/Popover.svelte';
  import UserListItem from '../molecules/UserListItem.svelte';
  import Translation from '../utils/Translation.svelte';

  export let users: User[] | string[];

  export let label: string;

  export let allTitle: string = label;

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

  let containerWidth = 0;

  let moreButton: HTMLElement | null = null;

  let items: HTMLElement[] = [];

  $: {
    if (containerWidth && moreButton) {
      let hidden = false;
      moreButton.style.display = 'flex';
      let w = moreButton.clientWidth + 12;
      for (const item of items) {
        item.style.display = 'block';
        w += item.clientWidth;
        if (w > containerWidth) {
          hidden = true;
        }
        if (hidden) {
          item.style.display = 'none';
        } else {
          w += 12;
        }
      }
      if (!hidden) {
        moreButton.style.display = 'none';
      }
    }
  }
</script>

<div class="flex md:gap-[24px] md:items-center text-shadow-6 flex-col md:flex-row">
  {#if label}
    <span class="text-2xl font-regular whitespace-nowrap"><Translation key={label} /></span>
  {/if}
  {#await resolvedUsers then data}
    <div
      class="flex-grow flex items-center gap-[12px] overflow-hidden"
      bind:clientWidth={containerWidth}
    >
      {#each data as user, i (i)}
        <div bind:this={items[i]} class="flex-shrink-0"><UserListItem {user} /></div>
      {/each}
      <div class="flex-shrink-0">
        <Popover>
          <div
            slot="button"
            class="flex items-center gap-[6px] whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            bind:this={moreButton}
          >
            <div class="drop-shadow-6 w-[14px] h-[14px]"><Icon size={14} icon="showMore" /></div>
            <div>Show All</div>
          </div>
          <div class="p-[14px] min-w-[240px]">
            <div class="text-md font-bold">{allTitle}</div>
            <div class="mt-[12px] max-h-[320px] overflow-y-auto flex flex-col gap-[16px]">
              {#each data as user, i (i)}
                <UserListItem popup {user} />
              {/each}
            </div>
          </div>
        </Popover>
      </div>
    </div>
  {/await}
</div>
