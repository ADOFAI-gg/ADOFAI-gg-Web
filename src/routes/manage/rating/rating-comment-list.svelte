<script lang="ts">
	import { Comment, InputControl, CommentList, type User, Button, Translation } from '@adofai-gg/ui'

	interface Props {
		user: User
	}

	const { user }: Props = $props()
</script>

<Comment author={user}>
	<InputControl placeholder="manage:add-note" />

	{#snippet actions()}
		<div class="add-actions">
			<Button size="sm">
				<Translation key="common:post-comment" />
			</Button>
			<Button size="sm" variant="ghost-dark">
				<Translation key="common:cancel" />
			</Button>
		</div>
	{/snippet}
</Comment>

<CommentList>
	<Comment author={{ avatarURL: null, displayName: 'ppapman', isAdmin: true }}>wow</Comment>
	<Comment author={{ avatarURL: null, displayName: 'HYONSU', isAdmin: true }}>wow</Comment>
	<Comment author={{ avatarURL: null, displayName: 'paring', isAdmin: true }}>wow</Comment>
	<Comment author={{ avatarURL: null, displayName: '샌즈', isAdmin: false }}>wow</Comment>
</CommentList>

<style lang="scss">
	.add-actions {
		display: flex;
		margin-top: 4px;
	}
</style>
