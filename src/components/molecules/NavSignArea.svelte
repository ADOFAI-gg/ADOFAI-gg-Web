<script>
  import Button from '../atoms/Button.svelte';
</script>

<div class="flex gap-[16px] items-center w-full md:w-fit">
  <a
    href="/signup"
    class="font-regular text-md opacity-60 hover:opacity-100 w-full md:w-fit transition-opacity text-center"
    >Sign Up</a
  >
  <Button type="nav" href="/login" class="w-full md:w-fit">Log In</Button>
</div>
