<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';

  export let title: string;
  export let moreLink: string | null = null;
</script>

<div class="main-section-title">
  <span class="main-section-title-text">
    <Translation key={title} />
  </span>

  <div class="main-section-title-space" />

  {#if moreLink}
    <a href={moreLink} class="main-section-title-more">
      <Translation key="SHOW_MORE" />
      <div>›</div>
    </a>
  {/if}
</div>

<style lang="scss">
  .main-section-title {
    display: flex;
    align-items: flex-end;
    margin-bottom: 24px;
    padding-bottom: 8px;
    border-bottom: 1px rgba(255, 255, 255, 0.2) solid;

    &-text {
      font-weight: 700;
      font-size: 28px;
    }

    &-space {
      flex-grow: 1;
    }

    &-more {
      display: flex;
      gap: 8px;
      font-size: 21px;
      transition: all 0.2s ease;
      transition-property: font-weight, gap;

      &:hover,
      &:focus {
        gap: 10px;
        font-weight: 700;
      }
    }
  }
</style>
