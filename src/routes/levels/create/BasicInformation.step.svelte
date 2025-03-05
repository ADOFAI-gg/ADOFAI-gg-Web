<script lang="ts">
	import {
		Button,
		FormField,
		getGlobalContext,
		ModalActions,
		translateKey,
		Translation,
		type TranslationKey
	} from '@adofai-gg/ui'
	import { Debounced } from 'runed'
	import type { Writable } from 'svelte/store'
	import { type PartialLevelCreatePayload } from '~/lib'
	import MemberList from '~/lib/components/createLevel/MemberList.svelte'
	import MusicSelector from '~/lib/components/createLevel/MusicSelector.svelte'
	import OutlinedInput from '~/lib/components/createLevel/OutlinedInput.svelte'
	import FormTitle from '~/lib/components/form/FormTitle.svelte'

	interface Props {
		payload: Writable<PartialLevelCreatePayload>
	}

	let { payload }: Props = $props()
	const { language } = getGlobalContext()

	let errors = $state<Record<string, TranslationKey | undefined>>({})
	let submitted = $state(false)
	let hasErrors = $derived(submitted && Object.keys(errors).length > 0)

	const validate = (p: PartialLevelCreatePayload): boolean => {
		const newErrors: Record<string, TranslationKey> = {}
		let hasErrors = false

		if (!p.music) {
			newErrors.music = 'form:required'
			hasErrors = true
		}

		if (!p.creators.length) {
			newErrors.creators = 'form:required'
			hasErrors = true
		}

		if (submitted) {
			errors = newErrors
		}

		return hasErrors
	}

	const onSubmit = () => {
		submitted = true
		const p = $payload
		if (!validate(p)) {
			return
		}
	}

	$effect(() => {
		validate($payload)
	})
</script>

<form
	class="form"
	onsubmit={(e) => {
		e.preventDefault()
		onSubmit()
	}}
>
	<FormTitle>
		<Translation key="level-create:basic-information" />
	</FormTitle>

	<FormField
		noLabel={!!$payload.music}
		label="level-create:music-title"
		subtitle="level-create:music-title-subtitle"
		required
		noHintsArea
		error={errors.music}
	>
		<MusicSelector bind:value={$payload.music} />
	</FormField>

	{#if $payload.music}
		<FormField
			error={errors.music}
			noLabel={!!$payload.music}
			label="level-create:artists"
			required
			noHintsArea
		>
			<MemberList
				isCreator={false}
				value={$payload.music.data.artists}
				canEdit={!$payload.music.exists}
			/>
		</FormField>
	{/if}

	<FormField label="level-create:appending-title" subtitle="level-create:appending-title-subtitle">
		<OutlinedInput
			placeholder={translateKey($language, 'level-create:appending-title-placeholder', {})}
			bind:value={$payload.appendingTitle}
		/>
	</FormField>

	<FormField
		noLabel
		label="level-create:creators"
		error={errors.creators}
		noHintsArea
		subtitle="level-create:creators-subtitle"
		required
	>
		<MemberList isCreator={false} bind:value={$payload.creators} canEdit />
	</FormField>

	<FormField label="level-create:creator-alias" subtitle="level-create:creator-alias-subtitle">
		<OutlinedInput
			placeholder={translateKey($language, 'level-create:creator-alias-placeholder', {})}
			bind:value={$payload.creatorAlias}
		/>
	</FormField>

	<ModalActions>
		{#snippet right()}
			<Button size="md" type="submit" disabled={hasErrors}>
				<Translation key="common:next" />
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
</style>
