<script lang="ts" context="module">
  import { generateIconStyles } from '@/utils/icon';

  const css = generateIconStyles();
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html css}
</svelte:head>
