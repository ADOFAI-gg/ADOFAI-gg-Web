<script lang="ts">
  import UserListItem from '@/components/molecules/user/UserListItem.svelte';
  import type { PartialMember } from '@/types';

  export let users: PartialMember[];

  export let allTitle: string;
</script>

<div class="list-popover-content">
  <div class="popover-title">{allTitle}</div>
  <div class="popover-user-list">
    {#each users as user, i (i)}
      <UserListItem popup {user} />
    {/each}
  </div>
</div>

<style lang="scss">
  .list-popover-content {
    padding: 14px;
    min-width: 240px;

    > .popover-title {
      font-size: 14px;
      font-weight: 700px;
    }

    > .popover-user-list {
      margin-top: 12px;
      max-height: 320px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
</style>
