<script lang="ts">
  import type { PartialMember } from '@/types';
  import Popover from '@atoms/common/Popover.svelte';
  import UserListItem from '@molecules/user/UserListItem.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import HorizontalUserListPopoverContent from '../../molecules/user/HorizontalUserListPopoverContent.svelte';
  import HorizontalUserListMorebutton from '../../molecules/user/HorizontalUserListMorebutton.svelte';
  import type { TranslationKey } from '@/utils/i18n';

  let moreButton: HTMLButtonElement;

  export let users: PartialMember[];

  export let labelKey: TranslationKey;

  export let allTitleKey = labelKey;

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

<div class="user-list">
  {#if labelKey}
    <span class="user-list-label"><Translation key={labelKey} /></span>
  {/if}
  <div class="user-list-content" bind:clientWidth={containerWidth}>
    {#each users as user, i (i)}
      <div bind:this={items[i]} class="user-list-item-container">
        <div class="user-list-item">
          <UserListItem {user} />
        </div>

        {#if i < users.length - 1}
          <span class="and-text">&</span>
        {/if}
      </div>
    {/each}

    <div class="popover-container">
      <Popover
        bind:button={moreButton}
        options={{
          popperOptions: {
            strategy: 'fixed'
          }
        }}
      >
        <HorizontalUserListMorebutton slot="button" />
        <HorizontalUserListPopoverContent {allTitleKey} {users} />
      </Popover>
    </div>
  </div>
</div>

<style lang="scss">
  .user-list {
    display: flex;
    flex-direction: column;
    text-shadow: 0 0 6px rgb(0, 0, 0);

    &-label {
      font-weight: 400;
      font-size: 24px;
      white-space: nowrap;
    }

    &-content {
      display: flex;
      flex-grow: 1;
      gap: 12px;
      align-items: center;
      overflow: hidden;
    }

    .user-list-item-container {
      display: flex;
      gap: 12px;
      align-items: center;

      .user-list-item {
        flex-shrink: 0;
      }

      > .and-text {
        font-weight: 400;
        font-size: 24px;
        opacity: 0.4;
      }
    }

    .popover-container {
      flex-shrink: 0;
    }

    @media (width >= 768px) {
      flex-direction: row;
      gap: 24px;
      align-items: center;
    }
  }
</style>
