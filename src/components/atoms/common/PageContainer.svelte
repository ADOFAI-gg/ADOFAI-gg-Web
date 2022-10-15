<script lang="ts">
  export let wide = false;
</script>

<div class:px-4={!wide}>
  <div class={wide ? 'px-[16px] xl:px-[120px]' : 'max-w-[1100px] mx-auto'}>
    <slot />
  </div>
</div>
