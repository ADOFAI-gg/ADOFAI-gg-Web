<script lang="ts">
  import Button from '@atoms/interaction/Button.svelte';
  import Translation from '@/components/utils/Translation.svelte';

  export let overlay = false;
</script>

<div class="sign-area" class:sign-area__overlay={overlay}>
  <a href="/auth/signup" class="sign-area__singup">
    <Translation key="common:sign-up" />
  </a>

  <Button type="nav" href="/auth/signin">
    <Translation key="common:sign-in" />
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

    &__overlay {
      width: 100% !important;
    }

    &__signup {
      font-weight: 400;
      font-size: 14px;
      text-align: center;
      opacity: 0.6;
      transition: opacity 0.2s ease-in-out;

      &:hover,
      &:focus {
        opacity: 1;
      }

      @media screen and (width >= 768px) {
        width: fit-content;
      }
    }

    @media screen and (width >= 768px) {
      width: fit-content;
      &__overlay {
        display: none;
      }
    }
  }
</style>
