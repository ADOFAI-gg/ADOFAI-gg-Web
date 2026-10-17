<script lang="ts">
	import {
		Panel,
		Button,
		PanelTitle,
		Tooltip,
		getGlobalContext,
		translateKey,
		type TranslationKey
	} from '@adofai-gg/ui'
	import { safeModUrl, type APIMod, type APIModVersion } from '~/lib/types/mod'
	let {
		mod,
		versions,
		referenceTime
	}: { mod: APIMod; versions: APIModVersion[]; referenceTime: number } = $props()
	const { language } = getGlobalContext()
	const t = (key: TranslationKey) => translateKey($language, key, {}, false)
	const dates = $derived(
		[mod.uploadedAt, ...versions.map((version) => version.uploadedAt)]
			.flatMap((value) => {
				const date = value ? new Date(value) : null
				return date && Number.isFinite(date.getTime()) ? [date] : []
			})
			.sort((a, b) => a.getTime() - b.getTime())
	)
	const releasedAt = $derived(dates.at(0))
	const updatedAt = $derived(dates.at(-1))
	const license = $derived(mod.license?.trim() || t('mod:license-unregistered'))
	const licenseUrl = $derived(safeModUrl(mod.licenseUrl ?? null))
	const exact = $derived(
		new Intl.DateTimeFormat($language, {
			dateStyle: 'full',
			timeStyle: 'short',
			timeZone: 'Asia/Seoul'
		})
	)
	function relative(date: Date) {
		const seconds = (date.getTime() - referenceTime) / 1000
		const magnitude = Math.abs(seconds)
		if (magnitude < 60) return t('mod:just-now')
		const formatter = new Intl.RelativeTimeFormat($language, { numeric: 'always' })
		const units: [Intl.RelativeTimeFormatUnit, number][] = [
			['year', 31536000],
			['month', 2592000],
			['day', 86400],
			['hour', 3600],
			['minute', 60]
		]
		const [unit, duration] = units.find(([, duration]) => magnitude >= duration)!
		return formatter.format(Math.trunc(seconds / duration), unit)
	}
</script>

<Panel class="mod-release-info" aria-label={t('mod:release-info')}>
	<PanelTitle>{t('mod:release-info')}</PanelTitle>
	<div class="release-rows">
		<div class="release-row">
			{#if licenseUrl && mod.license?.trim()}<a
					href={licenseUrl}
					target="_blank"
					rel="noopener noreferrer">{license}</a
				>{:else}<span>{license}</span>{/if}
			<span class="label">{t('mod:license')}</span>
		</div>
		<div class="release-row">
			{#if updatedAt}{@render dateValue(updatedAt)}{:else}<span>{t('mod:unknown')}</span>{/if}
			<span class="label">{t('mod:updated-label')}</span>
		</div>
		<div class="release-row">
			{#if releasedAt}{@render dateValue(releasedAt)}{:else}<span>{t('mod:unknown')}</span>{/if}
			<span class="label">{t('mod:released-label')}</span>
		</div>
	</div>
</Panel>

{#snippet dateValue(date: Date)}
	<Tooltip>
		{#snippet trigger({ trigger })}
			<Button
				meltElement={trigger}
				variant="ghost-light"
				style="padding:0;font:inherit;line-height:inherit;background:transparent;min-height:0"
				><time datetime={date.toISOString()}>{relative(date)}</time></Button
			>
		{/snippet}
		{#snippet children()}<span class="exact-date">{exact.format(date)}</span>{/snippet}
	</Tooltip>
{/snippet}

<style>
	.release-rows {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 8px;
	}
	.release-row {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 14px;
		line-height: 1.4;
		letter-spacing: -0.154px;
		overflow-wrap: anywhere;
	}
	.label {
		color: rgb(255 255 255 / 60%);
		flex-shrink: 0;
	}
	a {
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	time {
		cursor: help;
	}
	.exact-date {
		font-size: 14px;
		white-space: nowrap;
	}
</style>
