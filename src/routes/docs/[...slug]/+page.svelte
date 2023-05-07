<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="title">
  {$page.data.metadata.title}
</div>

{#if $page.data.metadata.summary}
  <div class="summary">{$page.data.metadata.summary}</div>
{/if}

<div class="top-divider" />

<div class="markdown-body">
  <svelte:component this={$page.data.component} />
</div>

<style>
  .title {
    font-weight: 700;
    font-size: 48px;
  }

  .summary {
    margin-top: 4px;
    font-size: 18;
    opacity: 0.6;
  }

  .top-divider {
    width: 100%;
    height: 2px;
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .markdown-body {
    background: transparent !important;
    font-family: var(--font-normal), sans-serif !important;
  }
</style>
