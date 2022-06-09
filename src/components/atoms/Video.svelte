<script lang="ts">
  export let videoId: string;
</script>

<div class="w-full aspect-video rounded-[16px] overflow-hidden">
  <iframe
    type="text/html"
    width="100%"
    height="100%"
    title="Video"
    src="https://www.youtube.com/embed/{videoId}"
    frameborder="0"
  />
</div>
