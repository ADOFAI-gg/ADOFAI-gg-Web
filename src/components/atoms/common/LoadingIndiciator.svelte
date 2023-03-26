<script lang="ts">
  import { navigating } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import NProgress from 'nprogress';

  afterNavigate(() => {
    const app = document.querySelector('#root');

    app?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });

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
