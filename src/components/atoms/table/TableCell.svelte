<script lang="ts">
  export let leftSideBorder = false;
  export let border = false;

  const onCopy = (e: ClipboardEvent | KeyboardEvent) => {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText((<HTMLElement>e.currentTarget).innerText);
  };
</script>

<td
  on:copy={(e) => onCopy(e)}
  on:keydown={(e) => e.ctrlKey && e.key === 'c' && onCopy(e)}
  class:col-border={border}
  class:left-border={leftSideBorder}
  {...$$restProps}
>
  <slot />
</td>

<style lang="scss">
  td {
    padding: 8px;
  }

  td.left-border {
    padding: 0 12px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }

  td.col-border {
    padding: 0 12px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }
</style>
