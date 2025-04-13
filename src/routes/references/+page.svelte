<script lang="ts">
	import DifficultyIcon from '~/lib/components/DifficultyIcon.svelte'
	import data from './data.json'
	import { Translation } from '@adofai-gg/ui'
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
				<th>
					<Translation key="level:difficulty" />
				</th>
				<th>
					<Translation key="level:reference-standard" params={{ idx: 1 }} />
				</th>
				<th>
					<Translation key="level:reference-standard" params={{ idx: 2 }} />
				</th>
				<th>
					<Translation key="level:reference-standard" params={{ idx: 3 }} />
				</th>
				<th>
					<Translation key="level:reference-base" params={{ idx: 1 }} />
				</th>
				<th>
					<Translation key="level:reference-base" params={{ idx: 2 }} />
				</th>
				<th>
					<Translation key="level:reference-base" params={{ idx: 3 }} />
				</th>
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
	$border: 1px solid rgba(255, 255, 255, 0.2);

	@use '@adofai-gg/ui/dist/stylesheets/system/breakpoints' as *;

	.table-container {
		margin-top: 32px;
		margin-right: auto;
		margin-left: auto;
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
		color: rgba(255, 255, 255, 0.6);
		font-weight: 400;
		font-size: 14px;
		text-align: left;
	}

	tbody tr {
		height: 56px;
	}

	td:not(:first-child) {
		padding: 0 12px;
		border-left: $border;
	}

	.level-id {
		color: rgba(255, 255, 255, 0.4);
		font-size: 14px;
	}

	.level-title {
		font-size: 16px;
	}
</style>
