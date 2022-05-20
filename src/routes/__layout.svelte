<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ url }) => ({ props: { url } });
</script>

<script lang="ts">
  import '../stylesheets/main.scss';
  import Nav from '../components/organisms/Nav.svelte';
  import LoadingIndiciator from '@/components/atoms/LoadingIndiciator.svelte';
  export let url: string;
  import { fade } from 'svelte/transition';
</script>

<LoadingIndiciator />

<Nav />
{#key url}
  <div in:fade={{ duration: 250, delay: 300 }} out:fade={{ duration: 250 }}>
    <slot />
  </div>
{/key}
