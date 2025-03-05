<script lang="ts">
	import { Combobox, getGlobalContext, type SelectOption, translateKey } from '@adofai-gg/ui'
	import { Debounced } from 'runed'
	import { api, type APIMusic, type MusicIdOrCreate } from '~/lib'
	import FakeOutlinedInput from '~/lib/components/FakeOutlinedInput.svelte'
	import SelectedItem from '~/lib/components/SelectedItem.svelte'
	import { getAvatarUrl } from '~/lib/utils/avatar'

	interface Props {
		value: MusicIdOrCreate | undefined
	}

	const { language } = getGlobalContext()

	let { value = $bindable() }: Props = $props()

	let search = $state('')
	let fetching = $state(false)
	let results = $state<APIMusic[]>([])
	const debouncedSearch = new Debounced(() => search, 300)

	const fetchMusic = async (query: string, abort: AbortSignal) => {
		fetching = true

		try {
			if (!query) {
				results = []
				return
			}

			const res = await fetch(api.forum('music') + '?' + new URLSearchParams({ name: query }), {
				signal: abort
			})
			results = (await res.json()).results
		} catch (e) {
			if (e instanceof DOMException) {
				if (e.name === 'ABORT_ERR') return
				console.error(e)
			}
		} finally {
			fetching = false
		}
	}

	$effect(() => {
		if (!search) {
			debouncedSearch.updateImmediately()
		}
	})

	$effect(() => {
		const ctrl = new AbortController()
		fetchMusic(debouncedSearch.current, ctrl.signal)

		return () => {
			ctrl.abort()
		}
	})

	const fetchedMusicItems = $derived.by(() => {
		const result: SelectOption<number | 'create'>[] = []

		if (debouncedSearch.current) {
			result.push({
				label: translateKey($language, 'level-create:create-item', {
					value: debouncedSearch.current
				}),
				value: 'create',
				color: 'blue',
				icon: 'add'
			})
		}

		result.push(
			...results.map(
				(x) =>
					({
						value: x.id,
						label: x.name,
						subtitle: x.artists.map((x) => x.displayName).join(' & ')
					}) satisfies (typeof result)[number]
			)
		)

		return result
	})
</script>

{#if value}
	<FakeOutlinedInput>
		<SelectedItem
			name={value.data.name}
			onRemove={() => {
				value = undefined
			}}
		/>
	</FakeOutlinedInput>
{:else}
	<Combobox
		customFilter
		bind:inputValue={search}
		multiple={false}
		onSelectedChange={({ next }) => {
			if (next) {
				debouncedSearch.cancel()

				if (next.value === 'create') {
					value = {
						exists: false,
						data: {
							name: debouncedSearch.current,
							artists: []
						}
					}
					return undefined
				} else {
					const found = results.find((x) => x.id === next.value)!
					value = {
						exists: true,
						id: next.value,
						data: {
							name: found.name,
							artists: found.artists.map((x) => ({
								exists: true,
								id: x.id,
								data: {
									name: x.displayName,
									avatarUrl: getAvatarUrl(x.authUserId, x.avatar, 'artist', 24)
								}
							}))
						}
					}
				}
			}
			return next
		}}
		items={fetchedMusicItems}
		loading={fetching}
		placeholder={translateKey($language, 'level-create:music-title-placeholder', {})}
	/>
{/if}
