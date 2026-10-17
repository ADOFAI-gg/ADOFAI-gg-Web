<script lang="ts">
	import { Button, Container, Translation } from '@adofai-gg/ui'
	import { page } from '$app/state'
</script>

<Container topMargin>
	<div class="mod-error" role="alert">
		<h1><Translation key={page.status === 404 ? 'mod:not-found' : 'mod:page-load-error'} /></h1>
		<p>
			<Translation
				key={page.status === 404
					? 'mod:not-found'
					: page.error?.message === 'mod:list-load-error'
						? 'mod:list-load-error'
						: 'mod:detail-load-error'}
			/>
		</p>
		<Button link href="/mods" variant="outlined"><Translation key="mod:back-to-list" /></Button>
	</div>
</Container>

<style>
	.mod-error {
		padding: 48px 0;
	}
	h1 {
		font-size: 24px;
	}
	p {
		margin: 16px 0 24px;
		color: rgb(255 255 255 / 70%);
	}
</style>
