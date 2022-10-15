<script lang="ts">
  import Button from '@atoms/interaction/Button.svelte';
  import Translation from '@/components/utils/Translation.svelte';
</script>

<div class="flex gap-[16px] items-center w-full md:w-fit flex-col md:flex-row">
  <a
    href="/signup"
    class="font-regular text-md opacity-60 hover:opacity-100 w-full md:w-fit transition-opacity text-center"
  >
    <Translation key="NAV_SIGNUP" /></a
  >
  <Button type="nav" href="/login" class="w-full md:w-fit leading-[16px]">
    <Translation key="NAV_LOGIN" />
  </Button>
</div>
