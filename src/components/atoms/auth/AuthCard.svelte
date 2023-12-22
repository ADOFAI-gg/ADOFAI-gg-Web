<script>
  import Translation from '@/components/utils/Translation.svelte';
</script>

<div class="auth-card">
  <slot />
</div>

<div class="legal-docs-container">
  <a href="../docs/legal" target="_blank">
    <Translation key="common-auth:legal-notice" />
  </a>
  <div class="separator" />
  <a href="../docs/terms" target="_blank">
    <Translation key="common-auth:terms" />
  </a>
  <div class="separator" />
  <a href="../docs/privacy" target="_blank">
    <Translation key="common-auth:privacy-policy" />
  </a>
</div>

<style lang="scss">
  .auth-card {
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    width: 100%;
    padding: 64px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.2);
  }

  .legal-docs-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    text-decoration: none;

    .separator {
      width: 2px;
      height: 2px;
      margin-right: 6px;
      margin-left: 6px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
    }

    a {
      color: rgba(255, 255, 255, 0.6);
    }
  }
</style>
