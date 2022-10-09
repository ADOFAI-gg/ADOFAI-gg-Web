<script lang="ts" context="module">
  enum ReferenceTab {
    Reference,
    Indication
  }
</script>

<script lang="ts">
  import MainSectionTitle from '@/components/atoms/MainSectionTitle.svelte';
  import PageContainer from '@/components/atoms/PageContainer.svelte';
  import TabGroup from '@/components/atoms/TabGroup.svelte';
  import TabItem from '@/components/molecules/TabItem.svelte';
  import DifficultyIndication from '@/components/organisms/reference/DifficultyIndication.svelte';
  import DifficultyReference from '@/components/organisms/reference/DifficultyReference.svelte';
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
    width: 100vw;
    position: sticky;
    left: 0;
  }

  .table-view-container {
    padding-left: 24px;
    padding-right: 24px;
    @media screen and (min-width: 1280px) {
      padding-left: 120px;
      padding-right: 120px;
    }
  }
</style>
