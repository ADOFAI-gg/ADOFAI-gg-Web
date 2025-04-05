<script lang="ts">
	import DifficultyIcon from '~/lib/components/DifficultyIcon.svelte'
	import data from './data.json'
</script>

{#snippet item(info: { id: number; title: string; url?: string } | undefined)}
	{#if info}
		<div class="level-id">#{info.id || '?'}</div>
		<a class="level-title" href={info.url || `/levels/${info.id}`}>{info.title}</a>
	{/if}
{/snippet}

<div class="table-container">
	<table class="references-table">
		<colgroup>
			<col width="40" />
			<col width="270" />
			<col width="270" />
			<col width="270" />
			<col width="270" />
			<col width="270" />
			<col width="270" />
		</colgroup>

		<thead>
			<tr>
				<th>난도</th>
				<th>기준 레벨 1</th>
				<th>기준 레벨 2</th>
				<th>기준 레벨 3</th>
				<th>하한 레벨 1</th>
				<th>하한 레벨 2</th>
				<th>하한 레벨 3</th>
			</tr>
		</thead>

		<tbody>
			{#each data as row}
				<tr>
					<td>
						<DifficultyIcon difficulty={row.difficulty} size={28} />
					</td>
					<td>{@render item(row.reference1)}</td>
					<td>{@render item(row.reference2)}</td>
					<td>{@render item(row.reference3)}</td>
					<td>{@render item(row.lower1)}</td>
					<td>{@render item(row.lower2)}</td>
					<td>{@render item(row.lower3)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/breakpoints' as *;

	$border: 1px solid rgba(255, 255, 255, 0.2);

	.table-container {
		margin-top: 32px;
		margin-left: auto;
		margin-right: auto;
		padding: 0 24px;
	}

	.references-table {
		width: 1680px;
		table-layout: fixed;
	}

	tr {
		border-bottom: $border;
	}

	thead th {
		padding-bottom: 6px;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.6);
		font-weight: 400;
		text-align: left;
	}

	tbody tr {
		height: 56px;
	}

	td:not(:first-child) {
		border-left: $border;
		padding: 0 12px;
	}

	.level-id {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.4);
	}

	.level-title {
		font-size: 16px;
	}
</style>
