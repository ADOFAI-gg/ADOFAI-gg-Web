<script lang="ts">
  import NavMenuGroup from '@/components/molecules/nav/NavMenuGroup.svelte';
  import NavSettingsSwitch from '@/components/molecules/nav/NavSettingsSwitch.svelte';
  import { reduceMotion, useSolidBackground } from '@/utils/settings';
</script>

<NavMenuGroup label="NAV_SETTINGS_ACCESSIBILITY" backTab={null}>
  <NavSettingsSwitch label="ACCESSIBILITY_SOLID_BACKGROUND" bind:checked={$useSolidBackground} />
  <NavSettingsSwitch label="ACCESSIBILITY_REDUCE_ANIMATION" bind:checked={$reduceMotion} />
</NavMenuGroup>
