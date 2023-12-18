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
    min-height: calc(100vh - var(--nav-height) * 2);
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
    padding: 64px 12px;
    justify-content: center;
  }
</style>
