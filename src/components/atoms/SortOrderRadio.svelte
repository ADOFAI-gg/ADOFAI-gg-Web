<script lang="ts">
  import Translation from '../utils/Translation.svelte';
  import Icon from '@/components/atoms/Icon.svelte';

  import TagCheckboxBase from './TagCheckboxBase.svelte';

  export let icon: string;
  export let key: string;

  export let checked: boolean;
</script>

<div class="min-w-[90px]">
  <TagCheckboxBase hideSelectedIcon tooltip={false} on:click include={checked}>
    <Icon class="" {icon} size={13} slot="icon" />
    <Translation {key} slot="name" />
  </TagCheckboxBase>
</div>
