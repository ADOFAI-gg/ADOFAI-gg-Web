<script lang="ts">
	import { Translation, type User } from '@adofai-gg/ui'
	import InfoDetails from './info-details.svelte'
	import InfoMainSection from './info-main-section.svelte'

	interface Props {
		user: User
	}

	const { user }: Props = $props()
</script>

<div class="no-levels">
	<Translation key="manage:no-levels" />
</div>

<InfoMainSection />

<InfoDetails {user} />

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.no-levels {
		text-align: center;
		width: 0;
		flex-grow: 1;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.4;
		user-select: none;
	}
</style>
