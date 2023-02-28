<script lang="ts">
  import { navigating } from '$app/stores';
  import NProgress from 'nprogress';

  $: {
    if ($navigating) {
      NProgress.configure({
        parent: '#nprogress-parent'
      });

      NProgress.start();
    } else {
      NProgress.done();
    }
  }
</script>
