<script lang="ts">
  import AuthTitle from '@/components/atoms/auth/AuthTitle.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import Hint from '@atoms/auth/Hint.svelte';
  import Button from '@atoms/interaction/Button.svelte';
  import CheckboxWithLinkedLabel from '@molecules/auth/CheckboxWithLinkedLabel.svelte';
  import OAuth2SignOptions from '@molecules/auth/OAuth2SignOptions.svelte';
  import { tick } from 'svelte';

  let legalAgreements = new Array(2).fill(false);
  let signupFailed = false;
  let allConditionsHint: Hint;

  const hasAgreed = () => legalAgreements.every((agreement) => agreement);

  const validation = () => {
    if (!hasAgreed()) {
      signupFailed = true;
      tick().then(() => allConditionsHint?.animate());
      return true;
    }

    signupFailed = false;
    return false;
  };

  const emailSignup = () => {
    if (validation()) return;

    window.location.href = '/auth/signup/email';
  };

  const googleSignup = () => {
    if (validation()) return;

    // TODO implement after social login is implemented in backend

    throw new Error('Not implemented');
  };

  const discordSignup = () => {
    if (validation()) return;

    // TODO implement after social login is implemented in backend

    throw new Error('Not implemented');
  };
</script>

<AuthTitle>
  <Translation key="SIGN_UP" />
</AuthTitle>

<!-- register form -->
<div class="sign-up-form">
  <div class="legal-agreement-terms-group">
    <h1>
      <Translation key="SIGNUP_TERMS" />
    </h1>
    <div class="legal-agreement-container">
      <CheckboxWithLinkedLabel
        labelKey="SIGNUP_AGREE_TERMS"
        extraLabelKey="SIGNUP_READ_TERMS"
        extraLabelLink="../docs/terms"
        bind:checked={legalAgreements[0]}
        on:valueChanged={hasAgreed}
      />
      <CheckboxWithLinkedLabel
        labelKey="SIGNUP_AGREE_PRIVACY"
        extraLabelKey="SIGNUP_READ_PRIVACY"
        extraLabelLink="../docs/privacy"
        bind:checked={legalAgreements[1]}
        on:valueChanged={hasAgreed}
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
</div>

<!-- oauth2 register buttons -->
<OAuth2SignOptions on:googleSignup={googleSignup} on:discordSignup={discordSignup} />

<style lang="scss">
  .sign-up-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    align-self: stretch;
  }

  .legal-agreement-terms-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;

    > h1 {
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
