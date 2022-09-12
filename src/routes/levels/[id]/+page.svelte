<script lang="ts" context="module">
  import LevelDetails from '@/components/templates/LevelDetails.svelte';
  import type { Level } from '@/types';
</script>

<script lang="ts">
  export let data: Level;
</script>

<LevelDetails level={data} />
