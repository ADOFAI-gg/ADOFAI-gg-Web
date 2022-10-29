<script lang="ts">
  import Button from '@atoms/interaction/Button.svelte';
  import Translation from '@/components/utils/Translation.svelte';
</script>

<div class="sign-area">
  <a href="/signup" class="singup">
    <Translation key="NAV_SIGNUP" />
  </a>

  <Button type="nav" href="/login">
    <Translation key="NAV_LOGIN" />
  </Button>
</div>

<style lang="scss">
  .sign-area {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: center;
    width: 100%;

    .singup {
      font-weight: 400;
      font-size: 14px;
      text-align: center;
      opacity: 0.6;
      transition: opacity 0.2s ease-in-out;

      &:hover,
      &:focus {
        opacity: 1;
      }

      @media screen and (min-width: 768px) {
        width: fit-content;
      }
    }

    @media screen and (min-width: 768px) {
      width: fit-content;
    }
  }
</style>
