<script lang="ts">
  import { Asset } from '@/utils/assets';
  import Image from './Image.svelte';

  export let icon: string;
  export let size = 24;
</script>

<span style="width: {size}px;height: {size}px;"
  ><Image src={Asset.icon(icon)} alt="icon" width={size} height={size} /></span
>
