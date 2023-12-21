<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';
  import Icon from '@atoms/asset/Icon.svelte';

  import TagCheckboxBase from './TagCheckboxBase.svelte';
  import type { TranslationKey } from '@/utils/i18n';

  export let icon: string;
  export let key: TranslationKey;

  export let checked: boolean;
</script>

<div style="min-width: 90px;">
  <TagCheckboxBase hideSelectedIcon tooltip={false} on:click include={checked}>
    <Icon style="" {icon} size={13} slot="icon" alt={`${icon} icon`} />
    <Translation {key} slot="name" />
  </TagCheckboxBase>
</div>
