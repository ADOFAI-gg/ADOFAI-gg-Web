<script lang="ts">
  import DifficultyIcon from '../../atoms/DifficultyIcon.svelte';
  import Translation from '../../utils/Translation.svelte';
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
      <td>
        <DifficultyIcon difficulty={1} size={28} />
      </td>
      <td class="col-border">
        <Translation key="REFERENCE_INDICATION_RATED" />
      </td>
    </tr>

    <tr>
      <td>
        <DifficultyIcon difficulty={0.1} size={28} />
      </td>
      <td class="col-border">
        <Translation key="REFERENCE_INDICATION_TINY" />
      </td>
    </tr>

    <tr>
      <td>
        <DifficultyIcon difficulty={0} size={28} />
      </td>
      <td class="col-border">
        <Translation key="REFERENCE_INDICATION_NOT_RATED" />
      </td>
    </tr>

    <tr>
      <td>
        <DifficultyIcon difficulty={101} size={28} />
      </td>
      <td class="col-border">
        <Translation key="REFERENCE_INDICATION_UNCLEARABLE" />
      </td>
    </tr>

    <tr>
      <td>
        <DifficultyIcon difficulty={-2} size={28} />
      </td>
      <td class="col-border">
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
