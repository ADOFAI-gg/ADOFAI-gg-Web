<script lang="ts" context="module">
  const icons = import.meta.glob('../../../assets/difficultyIcons/*.svg', {
    eager: true
  });
</script>

<script lang="ts">
  export let difficulty: number;

  export let size = 24;

  export let censored = false;

  $: url = (
    icons[`../../../assets/difficultyIcons/${censored ? -2 : difficulty}.svg`] as
      | { default: string }
      | undefined
  )?.default;
</script>

<img src={url} width={size} height={size} alt="lv.{censored ? -2 : difficulty}" draggable="false" />
