<script lang="ts">
  import AuthTitle from '@/components/atoms/auth/AuthTitle.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { setForm } from '@/utils/forms';
  import Button from '@atoms/interaction/Button.svelte';
  import OAuth2SignOptions from '@molecules/auth/OAuth2SignOptions.svelte';
  import type { PageData } from './$types';
  import { schema } from './_schema';
  import FormControl from '@/components/molecules/form/FormControl.svelte';
  import InputField from '@/components/atoms/interaction/InputField.svelte';

  export let data: PageData;

  const { form, enhance } = setForm(data.form, { validators: schema });
</script>

<AuthTitle>
  <Translation key="sign-up:title" />
</AuthTitle>

<form class="form-fields" method="POST" use:enhance>
  <FormControl name="email" labelKey="sign-up:form-email">
    <InputField
      name="email"
      type="email"
      placeholder="sign-up:form-email-placeholder"
      bind:value={$form.email}
    />
  </FormControl>
  <FormControl name="username" labelKey="sign-up:form-username">
    <InputField
      name="username"
      type="text"
      placeholder="sign-up:form-username-placeholder"
      bind:value={$form.username}
    />
  </FormControl>
  <FormControl name="password" labelKey="sign-up:form-password">
    <InputField
      name="password"
      type="password"
      placeholder="sign-up:form-password-placeholder"
      bind:value={$form.password}
    />
  </FormControl>
  <FormControl name="confirmPassword" labelKey="sign-up:form-password-confirm">
    <InputField
      name="confirmPassword"
      type="password"
      placeholder="sign-up:form-password-confirm-placeholder"
      bind:value={$form.confirmPassword}
    />
  </FormControl>

  <!-- register form -->
  <div class="submit-area">
    <Button type="authActionAccent" htmlType="submit">
      <Translation key="sign-up:strategy-email" />
    </Button>
    <div class="condition-disclaimer">
      <Translation key="sign-up:conditions-disclaimer" allowLinks />
    </div>
  </div>
</form>

<!-- oauth2 register buttons -->
<OAuth2SignOptions
  labelKey="sign-up:more-options"
  providerLinks={{
    discord: '/auth/signup/discord',
    google: '/auth/signup/google'
  }}
/>

<div class="signin-question-container">
  <div class="signin-question-text">
    <Translation key="sign-up:sign-in-question" />
  </div>
  <a class="signin-link" href="/auth/signin">
    <Translation key="sign-up:sign-in-link" />
  </a>
</div>

<style lang="scss">
  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .submit-area {
    display: flex;
    flex-direction: column;
  }

  .condition-disclaimer {
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
  }

  .signin-question-container {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
  }

  .signin-question-text {
    color: rgba(255, 255, 255, 0.6);
  }

  .signin-link {
    text-decoration: underline;
  }
</style>
