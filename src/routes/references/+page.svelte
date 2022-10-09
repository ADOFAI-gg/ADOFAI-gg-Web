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
  import { writable } from 'svelte/store';

  const currentTab = writable(ReferenceTab.Reference);
</script>

<div class="h-nav mt-[24px]" />

<PageContainer wide>
  <MainSectionTitle title="REFERENCES" />

  <TabGroup bind:value={$currentTab}>
    <TabItem icon="scale" title="DIFFICULTY_REFERENCE" value={ReferenceTab.Reference} />
    <TabItem icon="question" title="DIFFICULTY_INDICATION" value={ReferenceTab.Indication} />
  </TabGroup>

  {$currentTab}
</PageContainer>
