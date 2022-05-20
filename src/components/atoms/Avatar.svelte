<script lang="ts">
  import { Asset } from '@/utils/assets';
  import Image from './Image.svelte';

  export let url: string | null = null;
  export let size = 24;

  const defaultUrl = Asset.url('images/defaultAvatar.svg');
</script>

<Image fallback={defaultUrl} src={url || defaultUrl} alt="Avatar" width={size} height={size} />
