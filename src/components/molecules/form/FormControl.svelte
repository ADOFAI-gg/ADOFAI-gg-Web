<script lang="ts" context="module">
  const dataExp = /^([a-z]+)=([^,]+)$/g;
</script>

<script lang="ts">
  import Hint from '@/components/atoms/form/Hint.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { useForm } from '@/utils/forms';
  import type { TranslationKey } from '@/utils/i18n';
  import type { FluentVariable } from '@fluent/bundle';

  export let name: string;
  export let labelKey: TranslationKey | undefined = undefined;

  const { errors } = useForm();

  $: error = $errors[name] as string | undefined;
  $: errorData = (() => {
    if (!error) return null;
    const [key, rawData] = `${error}`.split('|');
    let data: Record<string, FluentVariable> = {};

    if (rawData) {
      for (const item of rawData.matchAll(dataExp)) {
        const [, key, value] = item;
        try {
          data[`${key}`] = JSON.parse(`${value}`);
        } catch {
          data[`${key}`] = `${value}`;
        }
      }
    }

    return { key, data };
  })();
</script>

<label class="form-control">
  {#if labelKey}
    <span class="form-label">
      <Translation key={labelKey} />
    </span>
  {/if}

  <slot />

  {#if errorData}
    <Hint variant="error">
      <Translation key="form:error-{errorData.key}" params={errorData.data} />
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
