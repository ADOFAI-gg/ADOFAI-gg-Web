<script lang="ts">
	import { encode, LinkButton, Panel, UserTree } from '@adofai-gg/ui';
	import type { PageProps } from './$types';
	import { Localized } from '@nubolab-ffwd/svelte-fluent';
	import { getLevelThumbnail, getTags } from '$lib/utils/level';
	import LevelTitleArea from '$lib/components/level-detail/level-title-area.svelte';
	import LevelVideoPanel from '$lib/components/level-detail/level-video-panel.svelte';
	import TagIcon from '$lib/components/tag-icon.svelte';
	import LevelActions from '$lib/components/level-detail/level-actions.svelte';
	import { checkPermission, MemberPermission, toUIUser } from '$lib/utils/user';

	const { data }: PageProps = $props();

	const level = data.level;

	const thumbnail = $derived(getLevelThumbnail(level));
	const tags = $derived(getTags(level));
	const hasTags = $derived(tags.danger.length + tags.normal.length + tags.warning.length > 0);
</script>

<main class="pb-32">
	<img
		src={thumbnail}
		alt="thumbnail"
		class="-mt-14 h-64 w-full object-cover object-center select-none"
		draggable="false"
	/>

	<div class="mt-16 px-6">
		<div class="mx-auto gg-container">
			<LevelTitleArea {level} />
			<div class="mt-8 grid grid-cols-12 gap-6">
				<!-- MAIN -->
				<div class="lg:col-span-9">
					<LevelVideoPanel {level} />

					<LevelActions {level} class="mt-4" />
				</div>

				<!-- Sidebar -->
				<aside class="flex flex-col gap-4 lg:col-span-3">
					{#if checkPermission(data.me, MemberPermission.LevelRequestReview)}
						<LinkButton size="md" href={encode`/manage/rating/${level.id}`}>
							<Localized id="level-open-rating" />
						</LinkButton>
					{/if}

					{#if level.note}
						<Panel variant="danger">
							{#snippet title()}
								<Localized
									id="level-reject-reason"
									args={{
										quality: level.quality
									}}
								/>
							{/snippet}
							{level.note}
						</Panel>
					{/if}
					{#if hasTags}
						<Panel class="flex">
							{#each tags.danger as tag}
								<TagIcon {tag} class="size-6.5 text-gg-red" />
							{/each}
							{#each tags.warning as tag}
								<TagIcon {tag} class="size-6.5 text-gg-yellow" />
							{/each}
							{#each tags.normal as tag}
								<TagIcon {tag} class="size-6.5" />
							{/each}
						</Panel>
					{/if}

					<Panel>
						{#snippet title()}
							<Localized id="level-meta-artists" />
						{/snippet}
						<UserTree.Root>
							{#each level.music.artists as artist (artist.id)}
								<UserTree.Item user={toUIUser(artist, 'artist')} />
							{/each}
						</UserTree.Root>
					</Panel>
					<Panel>
						{#snippet title()}
							<Localized id="level-meta-creators" />
						{/snippet}
						<UserTree.Root>
							{#if level.creatorAlias}
								<UserTree.Group name={level.creatorAlias} open>
									{#each level.creators as creator (creator.id)}
										<UserTree.Item user={toUIUser(creator, 'artist')} />
									{/each}
								</UserTree.Group>
							{:else}
								{#each level.creators as creator (creator.id)}
									<UserTree.Item user={toUIUser(creator, 'artist')} />
								{/each}
							{/if}
						</UserTree.Root>
					</Panel>
				</aside>
			</div>
		</div>
	</div>
</main>
