<script lang="ts" context="module">
  const icons = import.meta.glob('../../../assets/difficultyIcons/*.svg', {
    eager: true
  });
</script>

<script lang="ts">
  import Image from '@atoms/asset/Image.svelte';

  export let difficulty: number;

  export let size = 24;

  $: url = (
    icons[`../../../assets/difficultyIcons/${difficulty}.svg`] as { default: string } | undefined
  )?.default;
</script>

<Image src={url} width={size} alt="{difficulty} Difficulty Icon" height={size} />
