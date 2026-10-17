<script lang="ts">
	import { Icon, getGlobalContext, translateKey, type TranslationKey } from '@adofai-gg/ui'
	import type { Snippet } from 'svelte'
	import type { APIMod } from '~/lib/types/mod'
	import ModImage from './ModImage.svelte'
	const { language } = getGlobalContext()
	const t = (key: TranslationKey) => translateKey($language, key, {}, false)
	let {
		mod,
		href = `/mods/${encodeURIComponent(mod.id)}`,
		title = mod.name,
		metadata,
		actions
	}: {
		mod: APIMod
		href?: string
		title?: string
		metadata?: Snippet
		actions?: Snippet
	} = $props()
</script>

<div class="mod-list-row">
	<a class="mod-list-item" {href}>
		<ModImage {mod} />
		<div class="metadata">
			<div class="title">{title}</div>
			{#if metadata}{@render metadata()}{:else}
				<div class="line">
					<Icon icon="creator" size={16} alt={t('mod:developer')} /><span
						>{mod.cachedUsername ?? t('mod:unknown')}</span
					>
				</div>
				{#if mod.version}<div class="line">
						<Icon icon="doc" size={16} alt={t('mod:version')} /><span>{mod.version}</span>
					</div>{/if}
			{/if}
		</div>
		{#if !actions}<Icon icon="chevronRight" size={18} alt={t('mod:view-details')} />{/if}
	</a>
	{#if actions}<div class="row-actions">{@render actions()}</div>{/if}
</div>

<style>
	.mod-list-row {
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgb(255 255 255 / 10%);
		transition: background-color 0.2s;
	}
	.mod-list-row:hover,
	.mod-list-row:focus-within {
		background: rgb(0 0 0 / 10%);
	}
	.row-actions {
		flex-shrink: 0;
		padding-right: 16px;
	}
	.mod-list-item {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 18px 16px;
		color: white;
		transition: background-color 0.2s;
	}
	.mod-list-row:active {
		background: rgb(0 0 0 / 20%);
	}
	.metadata {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.title {
		font-size: 22px;
		font-weight: 500;
		line-height: 1.2;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.line {
		display: flex;
		align-items: center;
		gap: 4px;
		color: rgb(255 255 255 / 80%);
		font-size: 16px;
		line-height: 1.2;
	}
	.line span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	@media (max-width: 640px) {
		.mod-list-item {
			padding: 16px 0;
		}
		.title {
			font-size: 18px;
		}
		.line {
			font-size: 14px;
		}
	}
</style>
