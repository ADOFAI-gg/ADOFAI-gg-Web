<script>
  import AuthTitle from '@/components/atoms/auth/AuthTitle.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import Button from '@atoms/interaction/Button.svelte';
  import OAuth2SignOptions from '@molecules/auth/OAuth2SignOptions.svelte';
  import CheckboxWithLinkedLabel from '@molecules/auth/CheckboxWithLinkedLabel.svelte';
  import InputField from '@atoms/interaction/InputField.svelte';
</script>

<AuthTitle>
  <Translation key="SIGN_IN" />
</AuthTitle>

<div class="sign-in-form-container">
  <div class="sign-in-form">
    <InputField placeholder="SIGNIN_IDENTIFIER_PLACEHOLDER" />
    <InputField placeholder="SIGNIN_PASSWORD_PLACEHOLDER" type="password" />
  </div>
  <CheckboxWithLinkedLabel
    labelKey="SIGNIN_STAY_LABEL"
    extraLabelKey="SIGNIN_RECOVERY"
    extraLabelLink="/auth/forgot-password"
  />
</div>

<Button type="authAction">
  <Translation key="SIGN_IN" />
</Button>

<OAuth2SignOptions />

<div class="new-to-adofaigg-container">
  <div class="new-to-adofaigg">
    <Translation key="NEW_TO_ADOFAIGG" />
  </div>
  <a class="signup-link" href="/auth/signup">
    <Translation key="NEW_TO_ADOFAIGG_SIGN_UP" />
  </a>
</div>

<style lang="scss">
  .sign-in-form-container,
  .sign-in-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
  }

  .sign-in-form-container {
    gap: 18px;
  }

  .sign-in-form {
    gap: 8px;
  }

  .new-to-adofaigg-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  .new-to-adofaigg {
    color: rgba(255, 255, 255, 0.6);
  }

  .signup-link {
    text-decoration: underline;
  }
</style>
