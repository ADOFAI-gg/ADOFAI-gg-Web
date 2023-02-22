<script lang="ts">
  import type { PartialMember } from '@/types';
  import Popover from '@atoms/common/Popover.svelte';
  import UserListItem from '@molecules/user/UserListItem.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import HorizontalUserListPopoverContent from '../../molecules/user/HorizontalUserListPopoverContent.svelte';
  import HorizontalUserListMorebutton from '../../molecules/user/HorizontalUserListMorebutton.svelte';

  let moreButton: HTMLButtonElement;

  export let users: PartialMember[];

  export let label: string;

  export let allTitle: string = label;

  let containerWidth = 0;

  let items: HTMLElement[] = [];

  $: {
    if (containerWidth && moreButton) {
      let hidden = false;
      moreButton.style.display = 'flex';
      let w = moreButton.clientWidth + 12;
      let last: HTMLElement | null = null;
      for (const item of items) {
        item.style.display = 'flex';
        w += item.clientWidth;
        if (w > containerWidth) {
          hidden = true;
        }
        if (hidden) {
          item.style.display = 'none';
        } else {
          w += 12;
        }

        const andText = last?.querySelector('.and-text') as HTMLElement;

        if (andText) andText.style.display = hidden ? 'none' : 'block';

        last = item;
      }
      if (!hidden) {
        moreButton.style.display = 'none';
      }
    }
  }
</script>

<div class="user-list-container">
  {#if label}
    <span class="user-list-label"><Translation key={label} /></span>
  {/if}
  <div class="user-list" bind:clientWidth={containerWidth}>
    {#each users as user, i (i)}
      <div bind:this={items[i]} class="user-list-item-container">
        <div class="user-list-item"><UserListItem {user} /></div>
        {#if i < users.length - 1}
          <span class="and-text">&</span>
        {/if}
      </div>
    {/each}

    <div class="popover-container">
      <Popover bind:button={moreButton}>
        <HorizontalUserListMorebutton slot="button" />
        <HorizontalUserListPopoverContent {allTitle} {users} />
      </Popover>
    </div>
  </div>
</div>

<style lang="scss">
  .user-list-container {
    display: flex;
    flex-direction: column;
    text-shadow: 0 0 6px rgb(0, 0, 0);

    @media (min-width: 768px) {
      gap: 24px;
      align-items: center;
      flex-direction: row;
    }

    .user-list-label {
      font-size: 24px;
      font-weight: 400;
      white-space: nowrap;
    }

    .user-list {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      overflow: hidden;

      > .user-list-item-container {
        display: flex;
        align-items: center;
        gap: 12px;

        .user-list-item {
          flex-shrink: 0;
        }

        > .and-text {
          font-size: 24px;
          font-weight: 400;
          opacity: 0.4;
        }
      }

      > .popover-container {
        flex-shrink: 0;
      }
    }
  }
</style>
