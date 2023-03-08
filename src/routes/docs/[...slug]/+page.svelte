<script lang="ts">
  import { page } from '$app/stores';
  import 'github-markdown-css/github-markdown-dark.css';
</script>

<div class="title">
  {$page.data.metadata.title}
</div>

<div class="markdown-body">
  <svelte:component this={$page.data.component} />
</div>

<style>
  .title {
    font-weight: 600;
    font-size: 36px;
  }

  .markdown-body {
    background: transparent !important;
    font-family: var(--font-normal), sans-serif !important;
  }
</style>
