<script lang="ts">
  import AuthTitle from '@/components/atoms/auth/AuthTitle.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import Hint from '@/components/atoms/form/Hint.svelte';
  import Button from '@atoms/interaction/Button.svelte';
  import CheckboxWithLinkedLabel from '@molecules/auth/CheckboxWithLinkedLabel.svelte';
  import OAuth2SignOptions from '@molecules/auth/OAuth2SignOptions.svelte';
  import { goto } from '$app/navigation';

  let agreeTos = false;
  let agreePrivacy = false;

  $: legalAgreements = [agreeTos, agreePrivacy];
  let signupFailed = false;
  let validationResultViaCheckboxUpdate = false;

  const validate = (updateSignupFailed = true) => {
    const result = legalAgreements.every((agreement) => agreement);

    if (updateSignupFailed) signupFailed = !result;
    return result;
  };

  const onCheckboxUpdate = () => {
    validationResultViaCheckboxUpdate = validate(false);
  };

  const emailSignup = () => {
    if (!validate()) return;

    return goto('/auth/signup/email');
  };

  const googleSignup = () => {
    if (!validate()) return;

    // TODO implement after social login is implemented in backend

    throw new Error('Not implemented');
  };

  const discordSignup = () => {
    if (!validate()) return;

    // TODO implement after social login is implemented in backend

    throw new Error('Not implemented');
  };
</script>

<AuthTitle>
  <Translation key="sign-up:title" />
</AuthTitle>

<!-- register form -->
<div class="legal-agreement-terms-group">
  <h3>
    <Translation key="sign-up:section-terms" />
  </h3>
  <div class="legal-agreement-container">
    <CheckboxWithLinkedLabel
      labelKey="sign-up:terms-agreement"
      extraLabelKey="sign-up:terms-link"
      extraLabelLink="../docs/terms"
      bind:checked={agreeTos}
      onChange={onCheckboxUpdate}
    />
    <CheckboxWithLinkedLabel
      labelKey="sign-up:privacy-agreement"
      extraLabelKey="sign-up:privacy-link"
      extraLabelLink="../docs/privacy"
      bind:checked={agreePrivacy}
      onChange={onCheckboxUpdate}
    />
  </div>
  {#if signupFailed && !validationResultViaCheckboxUpdate}
    <Hint variant="error">
      <Translation key="sign-up:error-agreement-required" />
    </Hint>
  {/if}
</div>
<Button type="authActionAccent" on:click={emailSignup}>
  <Translation key="sign-up:strategy-email" />
</Button>

<!-- oauth2 register buttons -->
<OAuth2SignOptions
  labelKey="sign-up:more-options"
  on:googleSignup={googleSignup}
  on:discordSignup={discordSignup}
/>

<style lang="scss">
  .legal-agreement-terms-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    align-self: stretch;
    justify-content: center;

    > h3 {
      font-weight: 700;
      font-style: normal;
      font-size: 16px;
      line-height: 1.2;
    }
  }

  .legal-agreement-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    align-self: stretch;
  }
</style>
