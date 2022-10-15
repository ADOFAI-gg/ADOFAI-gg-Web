<script lang="ts">
  import DifficultyIcon from '../../atoms/DifficultyIcon.svelte';
  import Translation from '../../utils/Translation.svelte';

  const onCopy = (e: ClipboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText((<HTMLElement>e.target).innerText);
  };
</script>

<table class="table-fixed w-full">
  <colgroup>
    <col width="40" />
  </colgroup>

  <thead>
    <tr>
      <th>
        <Translation key="REFERENCE_DIFFICULTY" />
      </th>
      <th>
        <Translation key="REFERENCE_DESCRIPTION" />
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td tabindex="0" on:copy={onCopy}>
        <DifficultyIcon difficulty={-999} size={28} />
      </td>
      <td tabindex="0" on:copy={onCopy} class="col-border">
        <Translation key="REFERENCE_INDICATION_RATED" />
      </td>
    </tr>

    <tr>
      <td tabindex="0" on:copy={onCopy}>
        <DifficultyIcon difficulty={0.1} size={28} />
      </td>
      <td tabindex="0" on:copy={onCopy} class="col-border">
        <Translation key="REFERENCE_INDICATION_TINY" />
      </td>
    </tr>

    <tr>
      <td tabindex="0" on:copy={onCopy}>
        <DifficultyIcon difficulty={0} size={28} />
      </td>
      <td tabindex="0" on:copy={onCopy} class="col-border">
        <Translation key="REFERENCE_INDICATION_NOT_RATED" />
      </td>
    </tr>

    <tr>
      <td tabindex="0" on:copy={onCopy}>
        <DifficultyIcon difficulty={101} size={28} />
      </td>
      <td tabindex="0" on:copy={onCopy} class="col-border">
        <Translation key="REFERENCE_INDICATION_UNCLEARABLE" />
      </td>
    </tr>

    <tr>
      <td tabindex="0" on:copy={onCopy}>
        <DifficultyIcon difficulty={-2} size={28} />
      </td>
      <td tabindex="0" on:copy={onCopy} class="col-border">
        <Translation key="REFERENCE_INDICATION_CENSORED" />
      </td>
    </tr>
  </tbody>
</table>

<style lang="scss">
  table {
    th {
      text-align: left;

      @apply font-regular text-white/60 text-md pb-[8px] whitespace-nowrap;
    }

    tbody {
      tr {
        @apply border-t border-white/20;

        height: 52px;

        vertical-align: middle;

        td {
          @apply py-2;
        }

        td.col-border {
          @apply border-l border-white/20 px-[12px];
        }
      }
    }
  }
</style>
