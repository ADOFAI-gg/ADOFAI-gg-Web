<script lang="ts">
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import Table from '@atoms/table/Table.svelte';
  import { default as Cell } from '@atoms/table/TableCell.svelte';
</script>

<Table style="width: 100%;">
  <colgroup>
    <col width="40" />
  </colgroup>

  <thead>
    <tr>
      <th>
        <Translation key="references:reference-difficulty" />
      </th>

      <th>
        <Translation key="references:reference-description" />
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <Cell>
        <DifficultyIcon difficulty={-999} size={28} />
      </Cell>

      <Cell leftSideBorder>
        <Translation key="references:indication-rated" />
      </Cell>
    </tr>

    <tr>
      <Cell>
        <DifficultyIcon difficulty={0.1} size={28} />
      </Cell>

      <Cell leftSideBorder>
        <Translation key="references:indication-tiny" />
      </Cell>
    </tr>

    <tr>
      <Cell>
        <DifficultyIcon difficulty={0} size={28} />
      </Cell>

      <Cell leftSideBorder>
        <Translation key="references:indication-not-rated" />
      </Cell>
    </tr>

    <tr>
      <Cell>
        <DifficultyIcon difficulty={101} size={28} />
      </Cell>

      <Cell leftSideBorder>
        <Translation key="references:indication-unclearable" />
      </Cell>
    </tr>

    <tr>
      <Cell>
        <DifficultyIcon difficulty={-2} size={28} />
      </Cell>

      <Cell leftSideBorder>
        <Translation key="references:indication-censored" />
      </Cell>
    </tr>
  </tbody>
</Table>
