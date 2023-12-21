<script lang="ts">
  import UserListItem from '@/components/molecules/user/UserListItem.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { PartialMember } from '@/types';
  import type { TranslationKey } from '@/utils/i18n';

  export let users: PartialMember[];

  export let allTitleKey: TranslationKey;
</script>

<div class="list-popover-content">
  <div class="list-popover-content__title">
    <Translation key={allTitleKey} />
  </div>
  <div class="list-popover-content__user-list">
    {#each users as user, i (i)}
      <UserListItem popup {user} />
    {/each}
  </div>
</div>

<style lang="scss">
  .list-popover-content {
    min-width: 240px;
    padding: 14px;

    &__title {
      font-weight: 700px;
      font-size: 14px;
    }

    &__user-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow-y: auto;
      max-height: 320px;
      margin-top: 12px;
    }
  }
</style>
