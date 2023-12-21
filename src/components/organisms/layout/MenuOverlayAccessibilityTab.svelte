<script lang="ts">
  import NavMenuGroup from '@/components/molecules/nav/NavMenuGroup.svelte';
  import NavSettingsSwitch from '@/components/molecules/nav/NavSettingsSwitch.svelte';
  import { reduceMotion, useSolidBackground } from '@/utils/settings';
</script>

<NavMenuGroup labelKey="nav:setting-accessibility" backTab={null}>
  <NavSettingsSwitch
    labelKey="settings:accessibility-solid-background"
    bind:checked={$useSolidBackground}
  />
  <NavSettingsSwitch
    labelKey="settings:accessibility-reduce-animation"
    bind:checked={$reduceMotion}
  />
</NavMenuGroup>
