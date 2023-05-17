<script lang="ts">
  import { navigating } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import NProgress from 'nprogress';

  afterNavigate((data) => {
    const app = document.querySelector('#root');

    if (data.type === 'link' || data.type === 'goto') {
      app?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    if ((['link', 'goto'] as (typeof data)['type'][]).includes(data.type)) {
      window.gtag?.('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
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
