<script lang="ts">
  import Hint from '@/components/atoms/auth/Hint.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { useForm } from '@/utils/forms';
  import type { TranslationKey } from '@/utils/i18n';

  export let name: string;
  export let labelKey: TranslationKey | undefined = undefined;

  const { errors } = useForm();

  $: error = $errors[name];
</script>

<div class="form-control">
  {#if labelKey}
    <Translation key={labelKey} />
    <div>label(TODO)</div>
  {/if}

  <slot />

  {#if error}
    <Hint variant="error">
      <Translation key="form:error-{error}" />
    </Hint>
  {/if}
</div>

<style lang="scss">
  .form-control {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
</style>
