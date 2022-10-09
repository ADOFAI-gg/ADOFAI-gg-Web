<script lang="ts">
  export let wide = false;
</script>

<div class="px-4">
  <div class={wide ? 'px-[120px]' : 'max-w-[1100px] mx-auto'}>
    <slot />
  </div>
</div>
