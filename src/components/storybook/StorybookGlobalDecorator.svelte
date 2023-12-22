<script>
  import IconProvider from '../utils/IconProvider.svelte';
  import '../../stylesheets/storybook-main.scss';
</script>

<div class="storybook-container">
  <IconProvider />
  <slot />
</div>
