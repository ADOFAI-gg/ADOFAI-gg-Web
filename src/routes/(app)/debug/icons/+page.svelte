<script lang="ts">
	import '$lib/icons';
	import { browser } from '$app/environment';
	import { SectionTitle, toast, Tooltip } from '@adofai-gg/ui';
	import Icon, { getIcon, listIcons, type IconifyIcon } from '@iconify/svelte';

	const groupedIcons = $derived.by(() => {
		const groups = {} as Record<string, [string, IconifyIcon][]>;

		for (const icon of listIcons()) {
			const [ns] = icon.split(':');

			groups[ns] ??= [];
			groups[ns].push([icon, getIcon(icon)!]);
		}

		return groups;
	});
</script>

{#if browser}
	<SectionTitle>All Registered Icons</SectionTitle>

	{#each Object.entries(groupedIcons) as [group, icons] (group)}
		<section class="mt-8">
			<SectionTitle>{group}</SectionTitle>
			<div class="mt-1.5 grid grid-cols-6 md:grid-cols-12">
				{#each icons as [name, icon] (name)}
					<Tooltip delayDuration={0} disableHoverableContent>
						{#snippet trigger({ props })}
							<button
								class="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg p-4 text-center hover:bg-black/10 active:bg-black/20"
								{...props}
								onclick={() => {
									navigator.clipboard.writeText(name);
									toast.success('copied!');
								}}
							>
								<Icon {icon} class="size-full" />
							</button>
						{/snippet}
						{#snippet title()}
							{name}
						{/snippet}
						{#snippet children()}
							Click to copy
						{/snippet}
					</Tooltip>
				{/each}
			</div>
		</section>
	{/each}
{/if}
