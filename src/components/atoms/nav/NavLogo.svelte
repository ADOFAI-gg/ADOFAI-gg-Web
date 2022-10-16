<script lang="ts">
  import { Asset } from '@/utils/assets';

  import Image from '@atoms/asset/Image.svelte';
</script>

<a aria-label="ADOFAI.gg" href="/">
  <Image src={Asset.url('images/logo.svg')} alt="ADOFAI.gg Logo" width="139" height="20" />
</a>

<style lang="scss">
  a {
    user-select: none;
  }
</style>
