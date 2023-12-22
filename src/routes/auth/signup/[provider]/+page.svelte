<script lang="ts">
  import AuthTitle from '@/components/atoms/auth/AuthTitle.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { PageData } from './$types';
  import Button from '@/components/atoms/interaction/Button.svelte';
  import FormControl from '@/components/molecules/form/FormControl.svelte';
  import InputField from '@atoms/interaction/InputField.svelte';
  import { schema } from './_schema';
  import { setForm } from '@/utils/forms';

  export let data: PageData;

  const { form, enhance } = setForm(data.form, {
    validators: schema
  });
</script>

<AuthTitle>
  <Translation key="sign-up:sign-up-with" params={{ provider: data.providerName }} />
</AuthTitle>

<form class="form-fields" use:enhance method="POST">
  <FormControl name="username" labelKey="sign-up:form-username">
    <InputField
      placeholder="sign-up:form-username-placeholder"
      name="username"
      bind:value={$form.username}
    />
  </FormControl>

  <Button htmlType="submit" type="authActionAccent">
    <Translation key="sign-up:title" />
  </Button>
</form>

<style lang="scss">
  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
</style>
