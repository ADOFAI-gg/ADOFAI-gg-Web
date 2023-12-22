<script lang="ts">
  import AuthTitle from '@/components/atoms/auth/AuthTitle.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import Button from '@atoms/interaction/Button.svelte';
  import OAuth2SignOptions from '@molecules/auth/OAuth2SignOptions.svelte';
  import CheckboxWithLinkedLabel from '@molecules/auth/CheckboxWithLinkedLabel.svelte';
  import InputField from '@atoms/interaction/InputField.svelte';
  import type { PageData } from './$types';
  import { schema } from './_schema';
  import FormControl from '@/components/molecules/form/FormControl.svelte';
  import { setForm } from '@/utils/forms';

  export let data: PageData;

  const { form, enhance } = setForm(data.form, {
    validators: schema
  });
</script>

<AuthTitle>
  <Translation key="sign-in:title" />
</AuthTitle>

<form class="form-container" method="POST" use:enhance>
  <div class="form-group">
    <div class="input-fields">
      <FormControl name="username">
        <InputField
          placeholder="sign-in:form-id-placeholder"
          name="username"
          bind:value={$form.username}
        />
      </FormControl>
      <FormControl name="password">
        <InputField
          name="password"
          placeholder="sign-in:form-password-placeholder"
          type="password"
          bind:value={$form.password}
        />
      </FormControl>
    </div>
    <div class="session-remember-area">
      <CheckboxWithLinkedLabel
        name="remember"
        bind:checked={$form.remember}
        labelKey="sign-in:keep-logged-in"
        extraLabelKey="sign-in:forgot-password"
        extraLabelLink="/auth/forgot-password"
      />
    </div>
  </div>

  <Button type="authAction" htmlType="submit">
    <Translation key="sign-in:title" />
  </Button>

  <OAuth2SignOptions />

  <div class="new-to-adofaigg-container">
    <div class="new-to-adofaigg">
      <Translation key="sign-in:new-to-adofai-gg" />
    </div>
    <a class="signup-link" href="/auth/signup">
      <Translation key="sign-in:sign-up-link" />
    </a>
  </div>
</form>

<style lang="scss">
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .input-fields {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .session-remember-area {
    margin-top: 18px;
  }

  .new-to-adofaigg-container {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
  }

  .new-to-adofaigg {
    color: rgba(255, 255, 255, 0.6);
  }

  .signup-link {
    text-decoration: underline;
  }
</style>
