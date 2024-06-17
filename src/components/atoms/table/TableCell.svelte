<script lang="ts">
  export let leftSideBorder = false;
  export let border = false;

  let focus = false;
  let target: HTMLTableCellElement;

  // const focusHandle: Readable<HTMLDivElement | null> = getContext('focusHandle');

  // const onCopy = (e: ClipboardEvent | KeyboardEvent) => {
  //   const sel = window.getSelection();
  //   if (sel && !sel.isCollapsed) return;
  //   console.log(e);
  //   e.preventDefault();
  //   e.stopPropagation();
  //   navigator.clipboard.writeText((<HTMLElement>e.currentTarget).innerText);
  // };

  // const onFocus = () => {
  //   focus = true;

  //   if ($focusHandle) {
  //     const handle = $focusHandle;

  //     const root = document.getElementById('root') as HTMLDivElement;

  //     handle.classList.add('active');

  //     const rect = target.getBoundingClientRect();

  //     handle.style.width = rect.width + 'px';
  //     handle.style.height = rect.height + 'px';

  //     handle.style.left = rect.left + root.scrollLeft + 'px';
  //     handle.style.top = rect.top + root.scrollTop + 'px';
  //   }
  // };

  // const onBlur = () => {
  //   focus = false;

  //   if ($focusHandle) {
  //     const handle = $focusHandle;

  //     handle.classList.remove('active');
  //   }
  // };

  // const onKeyDown = (e: KeyboardEvent) => {
  //   if (e.ctrlKey && e.key === 'c') onCopy(e);
  //   else if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
  //     switch (e.key) {
  //       case 'ArrowLeft': {
  //         const toFocus = target.previousElementSibling as HTMLElement;

  //         if (!toFocus || !(toFocus instanceof HTMLTableCellElement)) break;

  //         e.preventDefault();

  //         toFocus.focus();

  //         break;
  //       }
  //       case 'ArrowRight': {
  //         const toFocus = target.nextElementSibling as HTMLElement;

  //         if (!toFocus || !(toFocus instanceof HTMLTableCellElement)) break;

  //         e.preventDefault();

  //         toFocus.focus();

  //         break;
  //       }
  //       case 'ArrowUp': {
  //         const targetRow = target.parentElement?.previousElementSibling;

  //         if (!targetRow || !(targetRow instanceof HTMLTableRowElement)) break;
  //         const targetCellIndex = target.cellIndex;

  //         for (let i = 0; i < targetRow.children.length; i++) {
  //           const element = targetRow.children.item(i);

  //           if (!(element instanceof HTMLTableCellElement)) continue;

  //           if (element.cellIndex === targetCellIndex) {
  //             e.preventDefault();
  //             element.focus();
  //             break;
  //           }
  //         }

  //         break;
  //       }
  //       case 'ArrowDown': {
  //         const targetRow = target.parentElement?.nextElementSibling;

  //         if (!targetRow || !(targetRow instanceof HTMLTableRowElement)) break;
  //         const targetCellIndex = target.cellIndex;

  //         for (let i = 0; i < targetRow.children.length; i++) {
  //           const element = targetRow.children.item(i);

  //           if (!(element instanceof HTMLTableCellElement)) continue;

  //           if (element.cellIndex === targetCellIndex) {
  //             e.preventDefault();
  //             element.focus();
  //             break;
  //           }
  //         }

  //         break;
  //       }
  //     }
  //   }
  // };
</script>

<td
  bind:this={target}
  class:focus
  class:col-border={border}
  class:left-border={leftSideBorder}
  {...$$restProps}
>
  <slot />
</td>

<style lang="scss">
  td {
    padding-right: 8px;
    padding-left: 8px;

    &:focus {
      outline: none;
    }
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
