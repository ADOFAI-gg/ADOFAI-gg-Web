<script>
  import Translation from '@/components/utils/Translation.svelte';
</script>

<div class="auth-card">
  <slot />
</div>

<div class="legal-docs-container">
  <a href="../docs/legal" target="_blank">
    <Translation key="FOOTER_LEGAL_NOTICE" />
  </a>
  <div class="separator" />
  <a href="../docs/terms" target="_blank">
    <Translation key="FOOTER_LEGAL_TERMS" />
  </a>
  <div class="separator" />
  <a href="../docs/privacy" target="_blank">
    <Translation key="FOOTER_LEGAL_PRIVACY_POLICY" />
  </a>
</div>

<style lang="scss">
  .auth-card {
    padding: 64px;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
  }

  .legal-docs-container {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    text-decoration: none;

    .separator {
      margin-left: 6px;
      margin-right: 6px;
      background-color: rgba(255, 255, 255, 0.2);
      width: 2px;
      height: 2px;
      border-radius: 50%;
    }

    a {
      color: rgba(255, 255, 255, 0.6);
    }
  }
</style>
