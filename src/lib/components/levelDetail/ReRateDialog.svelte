<script lang="ts">
	import {
		FormField,
		Icon,
		ModalTitle,
		Translation,
		InputControl,
		translateKey,
		getGlobalContext,
		ModalActions,
		Button,
		type TranslationKey,
		toast
	} from '@adofai-gg/ui'
	import LevelListItem from '../levelList/LevelListItem.svelte'
	import type { APILevel } from '~/lib/types'
	import OutlinedInput from '../createLevel/OutlinedInput.svelte'

	interface Props {
		level: APILevel
		close: () => void
	}

	const { level, close }: Props = $props()

	const { language } = getGlobalContext()

	let reason = $state('')
	let difficulty = $state('up')

	let submitting = $state(false)
	let errors = $state({} as Record<string, TranslationKey>)

	const validateForm = () => {
		errors = {}
		let hasErrors = false

		if (!reason) {
			hasErrors = true
			errors.reason = 'form:required'
		}
		if (!difficulty) {
			hasErrors = true
			throw new Error('difficulty is required')
		}

		if (hasErrors) return false
		return true
	}

	const onsubmit = (e: SubmitEvent) => {
		e.preventDefault()

		submitting = true

		try {
			let validated = validateForm()

			if (!validated) return
			console.log('submitting', difficulty, reason)
			close()
		} catch (error) {
			const err = error as Error

			toast.error(err.message)

			throw error
		} finally {
			submitting = false
		}
	}
</script>

<ModalTitle>
	<Translation key="level:request-re-rate" />
	{#snippet subtitle()}
		<Translation key="level:request-re-rate-description" />
	{/snippet}
</ModalTitle>

<div class="level">
	<LevelListItem noDownload noLink noDivider {level} />
</div>

<form class="form" {onsubmit}>
	<FormField label="level:request-re-rate-difficulty" noLabel>
		<div class="radio-button-group">
			<label class="radio-button button button-style-outlined">
				<input
					name="difficulty"
					type="radio"
					value="up"
					bind:group={difficulty}
					disabled={submitting}
				/>
				<div class="icon">
					<Icon alt="Up" icon="upArrow" size={24} />
				</div>
				<Translation key="level:request-re-rate-difficulty-up" />
			</label>
			<label class="radio-button button button-style-outlined">
				<input
					name="difficulty"
					type="radio"
					value="down"
					bind:group={difficulty}
					disabled={submitting}
				/>
				<div class="icon">
					<Icon alt="Down" icon="downArrow" size={24} />
				</div>
				<Translation key="level:request-re-rate-difficulty-down" />
			</label>
			<label class="radio-button button button-style-outlined">
				<input
					name="difficulty"
					type="radio"
					value="unknown"
					bind:group={difficulty}
					disabled={submitting}
				/>
				<div class="icon">
					<Icon alt="Unknown" icon="question" size={24} />
				</div>
				<Translation key="level:request-re-rate-difficulty-unknown" />
			</label>
		</div>
	</FormField>

	<FormField label="level:request-re-rate-reason">
		<OutlinedInput
			bind:value={reason}
			placeholder={translateKey($language, 'level:request-re-rate-reason-placeholder')}
			error={errors.reason}
			oninput={() => validateForm()}
			disabled={submitting}
		/>
	</FormField>

	<ModalActions>
		{#snippet left()}
			<Button
				onclick={close}
				transparent
				type="button"
				variant="ghost-light"
				size="sm"
				disabled={submitting}
			>
				<Translation key="common:back" />
			</Button>
		{/snippet}

		{#snippet right()}
			<Button type="submit" variant="primary" size="sm" disabled={submitting}>
				<Translation key="level:request-re-rate-submit" />
			</Button>
		{/snippet}
	</ModalActions>
</form>

<style lang="scss">
	.level {
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 24px;

		:global(.form-field-content) {
			gap: 8px !important;
		}
	}

	.radio-button-group {
		display: flex;
		gap: 16px;
	}

	.radio-button {
		width: 0;
		flex-grow: 1;
		flex-shrink: 0;
		padding: 8px;
		display: flex;
		justify-content: center;
		gap: 8px;
		align-items: center;
		font-weight: 700;
		font-size: 14px;
		user-select: none;

		input {
			display: none;
		}

		&:has(input:checked) {
			background-color: white;
			color: black;
		}
	}
</style>
