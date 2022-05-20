<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ url }) => ({ props: { url } });
</script>

<script lang="ts">
  import '../stylesheets/main.scss';
  import Nav from '../components/organisms/Nav.svelte';
  import LoadingIndiciator from '@/components/atoms/LoadingIndiciator.svelte';
  export let url: string;
</script>

<LoadingIndiciator />

<Nav />
{#key url}
  <div>
    <slot />
  </div>
{/key}
