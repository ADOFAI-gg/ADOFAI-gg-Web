<script lang="ts">
  export let href: string;
</script>

<a {href} class="hover:font-bold hover:text-lg transition-all">
  › <slot />
</a>
