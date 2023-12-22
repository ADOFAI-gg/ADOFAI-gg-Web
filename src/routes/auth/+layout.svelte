<script lang="ts">
  import AuthCard from '@/components/atoms/auth/AuthCard.svelte';
</script>

<div class="auth-layout-container">
  <AuthCard>
    <slot />
  </AuthCard>
</div>

<style lang="scss">
  .auth-layout-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
    min-height: calc(100vh - var(--nav-height) * 2);
    margin: 0 auto;
    padding: 64px 12px;
  }
</style>
