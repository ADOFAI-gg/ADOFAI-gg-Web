<script lang="ts">
  import Image from '@atoms/asset/Image.svelte';
  import defaultAvatar from '@/assets/images/defaultAvatar.svg';

  export let url: string | null = null;
  export let size = 24;
</script>

<Image
  fallback={defaultAvatar}
  src={url || defaultAvatar}
  alt="Avatar"
  width={size}
  height={size}
/>
