<script lang="ts">
  import { Asset } from '@/utils/assets';
  import Image from '@atoms/asset/Image.svelte';

  export let difficulty: number;

  export let size = 24;

  $: url = Asset.difficultyIcon(difficulty);
</script>

<Image src={url} width={size} alt="{difficulty} Difficulty Icon" height={size} />
