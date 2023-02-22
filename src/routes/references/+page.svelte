<script lang="ts" context="module">
  enum ReferenceTab {
    Reference,
    Indication
  }
</script>

<script lang="ts">
  import MainSectionTitle from '@atoms/common/MainSectionTitle.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import TabGroup from '@atoms/interaction/TabGroup.svelte';
  import TabItem from '@molecules/TabItem.svelte';
  import DifficultyIndication from '@organisms/reference/DifficultyIndication.svelte';
  import DifficultyReference from '@organisms/reference/DifficultyReference.svelte';
  import { writable } from 'svelte/store';

  const currentTab = writable(ReferenceTab.Reference);

  $: isReferenceTab = $currentTab === ReferenceTab.Reference;
</script>

<div class="h-nav mt-[24px]" />

<div class="table-view-header-area">
  <PageContainer wide={isReferenceTab}>
    <MainSectionTitle title="REFERENCES" />

    <TabGroup bind:value={$currentTab}>
      <TabItem icon="scale" title="DIFFICULTY_REFERENCE" value={ReferenceTab.Reference} />
      <TabItem icon="question" title="DIFFICULTY_INDICATION" value={ReferenceTab.Indication} />
    </TabGroup>
  </PageContainer>
</div>

{#if $currentTab === ReferenceTab.Reference}
  <div class="mt-[16px] table-view-container">
    <!-- Content -->
    <DifficultyReference />
  </div>
{/if}
{#if $currentTab === ReferenceTab.Indication}
  <div class="mt-[16px]" />
  <PageContainer>
    <DifficultyIndication />
  </PageContainer>
{/if}

<style lang="scss">
  .table-view-header-area {
    position: sticky;
    left: 0;
    width: 100vw;
  }

  .table-view-container {
    padding-right: 24px;
    padding-left: 24px;

    @media screen and (min-width: 1280px) {
      padding-right: 120px;
      padding-left: 120px;
    }
  }
</style>
