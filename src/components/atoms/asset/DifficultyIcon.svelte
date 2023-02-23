<script lang="ts" context="module">
  const icons = import.meta.glob('../../../assets/difficultyIcons/*.svg', {
    eager: true
  });
</script>

<script lang="ts">
  export let difficulty: number;

  export let size = 24;

  $: url = (
    icons[`../../../assets/difficultyIcons/${difficulty}.svg`] as { default: string } | undefined
  )?.default;
</script>

<img src={url} width={size} height={size} alt="lv.{difficulty}" draggable="false" />
