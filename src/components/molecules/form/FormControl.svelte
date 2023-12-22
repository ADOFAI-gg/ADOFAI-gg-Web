<script lang="ts">
  import Hint from '@/components/atoms/form/Hint.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { useForm } from '@/utils/forms';
  import type { TranslationKey } from '@/utils/i18n';

  export let name: string;
  export let labelKey: TranslationKey | undefined = undefined;

  const { errors } = useForm();

  $: error = $errors[name];
</script>

<label class="form-control">
  {#if labelKey}
    <span class="form-label">
      <Translation key={labelKey} />
    </span>
  {/if}

  <slot />

  {#if error}
    <Hint variant="error">
      <Translation key="form:error-{error}" />
    </Hint>
  {/if}
</label>

<style lang="scss">
  .form-control {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .form-label {
    font-weight: 500;
    font-size: 16px;
  }
</style>
