<script lang="ts" context="module">
  const icons = import.meta.glob('../../../assets/difficultyIcons/*.svg', {
    eager: true,
    as: 'raw'
  });
</script>

<script lang="ts">
  export let difficulty: number;

  export let size = 24;

  $: content = icons[`../../../assets/difficultyIcons/${difficulty}.svg`].replace(
    /(width|height)="\d+"/g,
    `$1="${size}"`
  );
</script>

{@html content}
