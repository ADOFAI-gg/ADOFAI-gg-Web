<script lang="ts">
	import type { APIMember, MemberIdOrCreate } from '~/lib/types'
	import OutlinedPanel from '../OutlinedPanel.svelte'
	import SelectedItem from '../SelectedItem.svelte'
	import {
		Avatar,
		Button,
		Translation,
		PopoverSelect,
		getGlobalContext,
		type SelectOption,
		translateKey,
		Icon
	} from '@adofai-gg/ui'
	import { Debounced } from 'runed'
	import { api, ky } from '~/lib'
	import { getAvatarUrl } from '~/lib/utils/avatar'
	import type { ListResponse } from '~/types'

	interface Props {
		value: MemberIdOrCreate[]
		canEdit: boolean
		isCreator: boolean
		registeredOnly?: boolean
	}

	let { value = $bindable(), canEdit, registeredOnly, isCreator }: Props = $props()

	const { language } = getGlobalContext()

	let search = $state('')
	let fetching = $state(false)
	let results = $state<APIMember[]>([])
	let open = $state(false)

	const debouncedSearch = new Debounced(() => search, 300)

	$effect(() => {
		if (!open) search = ''
	})

	const fetchMusic = async (query: string, abort: AbortSignal) => {
		fetching = true

		try {
			if (!query) {
				results = []
				return
			}

			const res = await ky.get(api.forum('members'), {
				signal: abort,
				searchParams: new URLSearchParams({
					displayName: query,
					registered: registeredOnly ? 'true' : 'false',
					sort: 'DISPLAY_NAME_LENGTH_ASC'
				})
			})
			results = (await res.json<ListResponse<APIMember>>()).results
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

	const items = $derived.by(() => {
		const result: SelectOption<string | 'create', APIMember>[] = []

		if (debouncedSearch.current && !registeredOnly) {
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
						label: x.displayName,
						value: x.id.toString(),
						customData: x
					}) satisfies (typeof result)[number]
			)
		)

		return result
	})
</script>

<div class="member-list">
	{#if value.length > 0}
		<OutlinedPanel>
			<div class="list">
				{#each value as member}
					<SelectedItem
						name={member.data.name}
						onRemove={canEdit && !member.data.locked
							? () => {
									value = value.filter((x) => x !== member)
								}
							: undefined}
					>
						{#snippet icon()}
							<Avatar size={24} src={member.data.avatarUrl} />
						{/snippet}
					</SelectedItem>
				{/each}
			</div>
		</OutlinedPanel>
	{/if}

	<div>
		<PopoverSelect
			bind:open
			onSelect={(x) => {
				if (x === 'create') {
					if (value.some((y) => !y.exists && y.data.name === debouncedSearch.current)) {
						return
					}

					const existing = items.find(
						(x) =>
							x.customData?.authUserId === null &&
							x.customData.displayName === debouncedSearch.current
					)

					if (existing) {
						value = [
							...value,
							{
								exists: true,
								data: {
									avatarUrl: getAvatarUrl(null, null, isCreator ? 'creator' : 'artist', 24),
									name: existing.customData!.displayName,
									locked: false
								},
								id: parseInt(existing.value)
							}
						]
						return
					}

					value = [
						...value,
						{
							exists: false,
							data: {
								name: debouncedSearch.current,
								avatarUrl: getAvatarUrl(null, null, isCreator ? 'creator' : 'artist', 24),
								locked: false
							}
						}
					]
				} else {
					const v = parseInt(x)
					if (value.some((y) => y.exists && y.id === v)) {
						return
					}

					const member = results.find((y) => y.id === v)!

					value = [
						...value,
						{
							exists: true,
							id: parseInt(x),
							data: {
								name: member.displayName,
								avatarUrl: getAvatarUrl(
									member.authUserId,
									member.avatar,
									isCreator ? 'creator' : 'artist'
								),
								locked: false
							}
						}
					]
				}
			}}
			select
			items={[
				{
					options: items
				}
			]}
			bind:inputValue={search}
			loading={fetching}
		>
			{#snippet trigger(el)}
				<Button type="button" disabled={!canEdit} size="md" meltElement={el}>
					<Translation key="level-create:add" />
				</Button>
			{/snippet}

			{#snippet iconTemplate(item)}
				{#if item.customData}
					<Avatar
						size={18}
						src={getAvatarUrl(
							item.customData.authUserId,
							item.customData.avatar,
							isCreator ? 'creator' : 'artist',
							24
						)}
					/>
				{:else if item.value === 'create'}
					<Icon size={16} icon="add" alt="add" />
				{/if}
			{/snippet}

			{#snippet subtitleTemplate(item)}
				{#if item.customData && item.customData.username !== item.customData.displayName}
					{item.customData.username}
				{/if}
			{/snippet}
		</PopoverSelect>
	</div>
</div>

<style lang="scss">
	.member-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
