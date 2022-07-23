<script lang="ts">
  export let href: string;

  export let target = '';
</script>

<a {href} class="opacity-80 hover:opacity-100 transition-all" {target}>
  › <slot />
</a>
