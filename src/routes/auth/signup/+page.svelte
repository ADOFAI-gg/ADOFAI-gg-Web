<script lang="ts">
  import AuthTitle from '@/components/atoms/auth/AuthTitle.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import Hint from '@atoms/auth/Hint.svelte';
  import Button from '@atoms/interaction/Button.svelte';
  import CheckboxWithLinkedLabel from '@molecules/auth/CheckboxWithLinkedLabel.svelte';
  import OAuth2SignOptions from '@molecules/auth/OAuth2SignOptions.svelte';
  import { tick } from 'svelte';

  let agreeTos = false;
  let agreePrivacy = false;
  $: legalAgreements = [agreeTos, agreePrivacy];

  let signupFailed = false;
  let allConditionsHint: Hint;

  $: signupFailed && validate(false, legalAgreements);

  const hasAgreed = (agreements = legalAgreements) => agreements.every((agreement) => agreement);

  const validate = (animate = true, agreements = legalAgreements) => {
    if (!hasAgreed(agreements)) {
      if (!animate) return false;

      signupFailed = true;
      tick().then(() => allConditionsHint?.animate());
      return false;
    }

    signupFailed = false;
    return true;
  };

  const emailSignup = () => {
    if (!validate()) return;

    window.location.href = '/auth/signup/email';
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
  <Translation key="SIGN_UP" />
</AuthTitle>

<!-- register form -->
<div class="legal-agreement-terms-group">
  <h3>
    <Translation key="SIGNUP_TERMS" />
  </h3>
  <div class="legal-agreement-container">
    <CheckboxWithLinkedLabel
      labelKey="SIGNUP_AGREE_TERMS"
      extraLabelKey="SIGNUP_READ_TERMS"
      extraLabelLink="../docs/terms"
      bind:checked={agreeTos}
    />
    <CheckboxWithLinkedLabel
      labelKey="SIGNUP_AGREE_PRIVACY"
      extraLabelKey="SIGNUP_READ_PRIVACY"
      extraLabelLink="../docs/privacy"
      bind:checked={agreePrivacy}
    />
  </div>
  {#if signupFailed && !hasAgreed()}
    <Hint warn={true} bind:this={allConditionsHint}>
      <Translation key="SIGNUP_ERROR_AGREE_CONDITIONS" />
    </Hint>
  {/if}
</div>
<Button type="authActionAccent" on:click={emailSignup}>
  <Translation key="SIGNUP_WITH_EMAIL" />
</Button>

<!-- oauth2 register buttons -->
<OAuth2SignOptions
  labelKey="SIGNUP_MORE_OPTIONS"
  on:googleSignup={googleSignup}
  on:discordSignup={discordSignup}
/>

<style lang="scss">
  .legal-agreement-terms-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;

    > h3 {
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 1.2;
    }
  }

  .legal-agreement-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
  }
</style>
