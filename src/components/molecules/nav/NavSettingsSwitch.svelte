<script lang="ts">
  import Switch from '@/components/atoms/form/Switch.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { TranslationKeys } from '@/utils/i18n';

  export let checked: boolean;

  export let label: TranslationKeys;
</script>

<div class="settings-switch">
  <div class="settings-switch-label">
    <Translation key={label} />
  </div>
  <Switch bind:checked />
</div>

<style lang="scss">
  .settings-switch {
    display: flex;
    gap: 8px;
    align-items: center;
    height: 36px;
    padding: 0 8px;

    &-label {
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
</style>
