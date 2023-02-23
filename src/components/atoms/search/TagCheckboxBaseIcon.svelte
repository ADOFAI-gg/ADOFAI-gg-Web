<script lang="ts">
  export let hideSelectedIcon: boolean;
  export let active: boolean;
</script>

<div class="icon" class:active class:disable-select-icon={hideSelectedIcon}>
  <slot />
</div>

<style lang="scss">
  .active.icon:not(.disable-select-icon) {
    clip-path: path(
      'M22 0H0V22H12.6736C12.2417 21.0907 12 20.0736 12 \
        19C12 15.134 15.134 12 19 \
        12C20.0736 12 21.0907 12.2417 22 12.6736V0Z'
    );
  }
</style>
