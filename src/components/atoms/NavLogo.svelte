<script lang="ts">
  import { Asset } from '@/utils/assets';

  import Image from './Image.svelte';
</script>

<a href="/">
  <Image src={Asset.url('images/logo.svg')} alt="" width="139" height="20" />
</a>
