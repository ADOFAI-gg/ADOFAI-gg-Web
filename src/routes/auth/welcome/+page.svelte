<script lang="ts">
  import AuthTitle from '@/components/atoms/auth/AuthTitle.svelte';
  import Button from '@/components/atoms/interaction/Button.svelte';
  import Translation from '@/components/utils/Translation.svelte';
</script>

<AuthTitle>
  <Translation key="common-auth:welcome" />
</AuthTitle>

<Button type="authActionAccent">
  <Translation key="common-auth:return" />
</Button>
