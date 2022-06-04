<script lang="ts">
  export let tags: number[];
  export let title: string;
</script>

<div>
  <div class="text-lg leading-[10px]">{title}</div>
  <div class="border-t mt-[12px] mb-[10px] border-opacity-20 border-white" />
  <div class="flex flex-col gap-[10px]">
    {tags}
  </div>
</div>
