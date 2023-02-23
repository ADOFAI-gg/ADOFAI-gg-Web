<script lang="ts">
  import logo from '@/assets/images/logo.svg';

  import Image from '@atoms/asset/Image.svelte';
</script>

<a aria-label="ADOFAI.gg" href="/">
  <Image src={logo} alt="ADOFAI.gg Logo" width="139" height="20" />
</a>

<style lang="scss">
  a {
    user-select: none;
  }
</style>
