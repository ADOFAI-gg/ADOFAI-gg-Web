<script lang="ts">
  export let to: string;
</script>

<a
  href={to}
  class="md:text-xl text-lg opacity-80 hover:opacity-100 transition-opacity flex-grow text-center"
>
  <slot />
</a>
