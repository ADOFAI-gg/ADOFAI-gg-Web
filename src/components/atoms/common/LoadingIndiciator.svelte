<script lang="ts">
  import { navigating } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import NProgress from 'nprogress';

  afterNavigate((data) => {
    const app = document.querySelector('#root');

    if (data.type !== 'enter') {
      app?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  });

  $: {
    if ($navigating) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }
</script>
