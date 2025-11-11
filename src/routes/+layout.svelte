<script lang="ts">
	import '$lib/icons';
	import '../app.css';
	import {
		createBundles,
		Footer,
		libLanguageNames,
		Nav,
		negotiateLanguages,
		Scaffolding,
		setGlobalContext,
		Toaster,
		type GlobalContext
	} from '@adofai-gg/ui';
	import { createSvelteFluent, initFluentContext, Localized } from '@nubolab-ffwd/svelte-fluent';
	import favicon from '$lib/assets/favicon.png';
	import type { LayoutProps } from './$types';
	import { availableLanguages, translationResources } from '$lib/localization';

	let { children, data }: LayoutProps = $props();

	const globalContext = $state<GlobalContext>({
		languageNames: libLanguageNames,
		currentLanguage: data.initialLang ?? data.acceptedLanguages[0] ?? 'ko',
		availableLanguages
	});

	setGlobalContext(globalContext);

	const requestedLanguages = $derived.by(() => {
		if (
			globalContext.currentLanguage &&
			availableLanguages.includes(globalContext.currentLanguage)
		) {
			return [globalContext.currentLanguage];
		}
		return data.acceptedLanguages;
	});

	initFluentContext(() =>
		createSvelteFluent(
			createBundles(
				translationResources,
				negotiateLanguages(requestedLanguages, availableLanguages, { defaultLocale: 'ko' })
			)
		)
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />

<Scaffolding>
	{#snippet nav()}
		<Localized id="nav-links">
			{#snippet children({ attrs })}
				<Nav.Root
					links={[
						{
							title: attrs.levels,
							href: '/levels'
						},
						{
							title: attrs.references,
							href: '/references'
						}
					]}
				/>
			{/snippet}
		</Localized>
	{/snippet}
	{#snippet content()}
		{@render children()}
	{/snippet}
	{#snippet footer()}
		<Footer />
	{/snippet}
</Scaffolding>
