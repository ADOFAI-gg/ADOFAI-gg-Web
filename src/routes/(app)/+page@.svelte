<script lang="ts">
	import { Logo, SearchInput, SectionTitle, SectionTitleLink } from '@adofai-gg/ui';
	import { Localized } from '@nubolab-ffwd/svelte-fluent';
	import Icon from '@iconify/svelte';
	import type { PageProps } from './$types';
	import { LevelListItem } from '$lib/components';

	const { data }: PageProps = $props();

	const { legendaryLevels } = data;
</script>

<div class="flex grow flex-col justify-center px-4">
	<main class="mx-auto gg-container py-16">
		<Logo width="100%" class="mx-auto max-w-[564px]" />

		<div class="mx-auto mt-9.5 max-w-3xl">
			<Localized id="level-search-placeholder">
				{#snippet children({ text })}
					<SearchInput containerClass="flex-row" placeholder={text} />
				{/snippet}
			</Localized>

			<div class="mt-3 flex flex-wrap justify-center gap-4.5">
				<a
					href="/docs/censorship-guidelines"
					class="flex items-center gap-0.5 opacity-40 transition hover:opacity-100 focus:opacity-100"
				>
					<Icon icon="gg:document" class="size-4.5" />
					<Localized id="main-link-quality-guideline" />
				</a>
			</div>
		</div>

		<div class="mt-16 grid gap-6">
			<section>
				<SectionTitle>
					<Localized id="main-section-recent-legendary-levels" />

					{#snippet link()}
						<SectionTitleLink
							href={`/levels?q=&f=[{"key"%3A"quality"%2C"value"%3A["LEGENDARY"]}]`}
							icon="gg:chevron-right"
						>
							<Localized id="show-more" />
						</SectionTitleLink>
					{/snippet}
				</SectionTitle>

				<div class="mt-1.5">
					{#each legendaryLevels as level (level.id)}
						<LevelListItem {level} />
					{/each}
				</div>
			</section>
		</div>
	</main>
</div>
