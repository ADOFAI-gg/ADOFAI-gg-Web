<script lang="ts">
  import { Asset } from '@/utils/assets';

  import Image from './Image.svelte';
</script>

<div style="aspect-ratio: 7/1;" class="relative w-full">
  <div class="absolute left-0 top-0 w-full h-full">
    <Image src={Asset.url('images/logo.svg  ')} alt="" width="100%" height="100%" />
  </div>
</div>
