<script lang="ts">
  import Image from './Image.svelte';

  export let icon: string;
  export let size = 24;
</script>

<Image src={icon} alt="icon" width={size} height={size} />
