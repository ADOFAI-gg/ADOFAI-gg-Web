<script lang="ts">
  import logo from '@/assets/images/logo.svg';

  import Image from '@atoms/asset/Image.svelte';
</script>

<div class="home-logo">
  <div>
    <Image src={logo} alt="ADOFAI.gg Logo" width="100%" height="100%" />
  </div>
</div>

<style lang="scss">
  .home-logo {
    position: relative;
    width: 100%;
    user-select: none;
    aspect-ratio: 7 / 1;

    & > div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
