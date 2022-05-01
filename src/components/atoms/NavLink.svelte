<script lang="ts">
  export let to: string;
</script>

<a href={to} class="text-xl opacity-80 hover:opacity-100 transition-opacity">
  <slot />
</a>
