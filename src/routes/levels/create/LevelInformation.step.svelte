<script lang="ts">
	import {
		Button,
		Combobox,
		FormField,
		getGlobalContext,
		LabeledCheckbox,
		ModalActions,
		toast,
		translateKey,
		Translation,
		type TranslationKey
	} from '@adofai-gg/ui'
	import { Previous } from 'runed'
	import { untrack } from 'svelte'
	import type { Writable } from 'svelte/store'
	import type { PartialLevelCreatePayload } from '~/lib'
	import OutlinedInput from '~/lib/components/createLevel/OutlinedInput.svelte'
	import FormTitle from '~/lib/components/form/FormTitle.svelte'
	import OutlinedPanel from '~/lib/components/OutlinedPanel.svelte'
	import { difficultyOptions } from '~/lib/utils/difficulty'
	import { difficultyIconTemplate } from '~/lib/utils/difficultySnippets.svelte'
	import { clampState } from '~/lib/utils/formUtils.svelte'

	interface Props {
		payload: Writable<PartialLevelCreatePayload>
		onNext: () => Promise<void>
	}

	const { onNext, payload }: Props = $props()

	let errors = $state<Record<string, TranslationKey | undefined>>({})
	let submitted = $state(false)
	let hasErrors = $derived(submitted && Object.keys(errors).length > 0)
	let submitting = $state(false)

	const validate = (p: PartialLevelCreatePayload): boolean => {
		const newErrors: Record<string, TranslationKey> = {}
		let hasErrors = false

		const setErr = (key: string, message: TranslationKey) => {
			hasErrors = true
			newErrors[key] = message
		}

		if (p.tiles === null) setErr('tiles', 'form:required')
		if (p.minBPM === null) setErr('minBPM', 'form:required')
		if (p.maxBPM === null) setErr('maxBPM', 'form:required')
		if (!p.expectedDifficulty) setErr('expectedDifficulty', 'form:required')

		if (submitted) {
			errors = newErrors
		}

		return !hasErrors
	}

	const onSubmit = async () => {
		submitted = true
		const p = $payload
		if (!validate(p)) {
			return
		}

		submitting = true

		try {
			const prom = onNext()
			toast.promise(prom, {
				loading: translateKey($language, 'level-create:submitting', {}),
				success: translateKey($language, 'level-create:submit-success', {}),
				error: (e) => `${(e as Error).message}`
			})

			await prom
		} finally {
			submitting = false
		}
	}

	$effect(() => {
		validate($payload)
	})

	const { language } = getGlobalContext()
	let maxInputTouched = $state(false)

	const prevMinBPM = new Previous(() => $payload.minBPM)

	$effect(() => {
		const min = $payload.minBPM
		if (prevMinBPM.current === min) return
		const shouldReplace = untrack(() => !maxInputTouched)

		if (shouldReplace) $payload.maxBPM = min
	})

	clampState(
		() => $payload.minBPM,
		(v) => ($payload.minBPM = v),
		1,
		100000
	)
	clampState(
		() => $payload.maxBPM,
		(v) => ($payload.maxBPM = v),
		1,
		100000
	)
	clampState(
		() => $payload.tiles,
		(v) => ($payload.tiles = v),
		1,
		10000000
	)
</script>

<form
	class="form"
	onsubmit={(e) => {
		e.preventDefault()
		onSubmit()
	}}
>
	<FormTitle>
		<Translation key="level-create:level-information" />
	</FormTitle>

	<FormField label="level-create:tiles" subtitle="level-create:tiles-subtitle" required>
		<OutlinedInput
			disabled={submitting}
			error={errors.tiles}
			type="number"
			bind:value={$payload.tiles}
			placeholder={translateKey($language, 'level-create:tiles-placeholder', {})}
		/>
	</FormField>

	<FormField
		label="level-create:bpm"
		noLabel
		error={errors.bpm}
		subtitle="level-create:bpm-subtitle"
		required
	>
		<div class="range-row">
			<div>
				<OutlinedInput
					disabled={submitting}
					error={errors.minBPM}
					type="number"
					min={0}
					max={100000}
					step="0.001"
					bind:value={$payload.minBPM}
					placeholder={translateKey($language, 'level-create:min-bpm', {})}
				/>
			</div>
			<div>
				<OutlinedInput
					disabled={submitting}
					onblur={() => {
						maxInputTouched = true
					}}
					error={errors.maxBPM}
					type="number"
					step="0.001"
					min={0}
					max={100000}
					bind:value={$payload.maxBPM}
					placeholder={translateKey($language, 'level-create:max-bpm', {})}
				/>
			</div>
		</div>
	</FormField>

	<FormField
		label="level-create:expected-difficulty"
		subtitle="level-create:expected-difficulty-subtitle"
		error={errors.expectedDifficulty}
		required
		noHintsArea
	>
		<Combobox
			disabled={submitting}
			items={difficultyOptions}
			placeholder={translateKey($language, 'level-create:expected-difficulty-placeholder', {})}
			clearable
			bind:value={$payload.expectedDifficulty}
			iconTemplate={difficultyIconTemplate}
		/>
	</FormField>

	<FormField label="level-create:limits" subtitle="level-create:limits-subtitle" noLabel>
		<OutlinedPanel>
			<div class="checkboxes">
				<LabeledCheckbox disabled={submitting} bind:checked={$payload.limits.neoCosmos}>
					<Translation key="level-create:limits-neocosmos" />
				</LabeledCheckbox>
				<LabeledCheckbox disabled={submitting} bind:checked={$payload.limits.seizure}>
					<Translation key="level-create:limits-seizure" />
				</LabeledCheckbox>
			</div>
		</OutlinedPanel>
	</FormField>

	<ModalActions>
		{#snippet right()}
			<Button size="md" type="submit" disabled={hasErrors || submitting}>
				<Translation key="common:submit" />
			</Button>
		{/snippet}
	</ModalActions>
</form>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.range-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	.checkboxes {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
