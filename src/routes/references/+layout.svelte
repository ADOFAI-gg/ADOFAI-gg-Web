<script lang="ts" context="module">
  export enum ReferenceTab {
    Reference,
    Indication
  }
</script>

<script lang="ts">
  import TabItemLink from '@/components/molecules/TabItemLink.svelte';

  import MainSectionTitle from '@atoms/common/MainSectionTitle.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import { derived } from 'svelte/store';
  import { page } from '$app/stores';
  import LinkTabGroup from '@/components/atoms/interaction/LinkTabGroup.svelte';

  const currentTab = derived(page, (page) => {
    return page.data.tab;
  });

  $: isReferenceTab = $currentTab === ReferenceTab.Reference;
</script>

<div class="top-spacer" />

<div class="table-view-header-area">
  <PageContainer wide={isReferenceTab}>
    <MainSectionTitle titleKey="references:title" />

    <LinkTabGroup value={currentTab}>
      <TabItemLink
        icon="scale"
        titleKey="references:tab-reference"
        value={ReferenceTab.Reference}
        href="/references/levels"
      />
      <TabItemLink
        icon="question"
        titleKey="references:tab-indication"
        value={ReferenceTab.Indication}
        href="/references/indication"
      />
    </LinkTabGroup>
  </PageContainer>
</div>

<div class="top-spacer">
  <slot />
</div>

<style lang="scss">
  .table-view-header-area {
    position: sticky;
    left: 0;
    width: 100vw;
  }

  .top-spacer {
    margin-top: 16px;
  }
</style>
