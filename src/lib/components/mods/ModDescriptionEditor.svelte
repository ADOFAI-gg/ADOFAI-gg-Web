<script lang="ts">
	import { tick } from 'svelte'
	import { renderMarkdown } from '~/lib/utils/markdown'
	import { getGlobalContext, translateKey, type TranslationKey } from '@adofai-gg/ui'
	let {
		value = $bindable(''),
		id = 'mod-description',
		disabled = false
	}: { value?: string; id?: string; disabled?: boolean } = $props()
	const { language } = getGlobalContext()
	const t = (key: TranslationKey) => translateKey($language, key, {}, false)
	let input = $state<HTMLTextAreaElement>()
	let preview = $state(false)
	const tools = [
		{ label: 'Heading 1', text: 'H1', before: '# ', after: '', block: true },
		{ label: 'Heading 2', text: 'H2', before: '## ', after: '', block: true },
		{ label: 'Heading 3', text: 'H3', before: '### ', after: '', block: true },
		{ label: 'Bold', text: 'B', before: '**', after: '**' },
		{ label: 'Italic', text: 'I', before: '*', after: '*' },
		{ label: 'Strikethrough', text: 'S', before: '~~', after: '~~' },
		{ label: 'Inline code', text: '</>', before: '`', after: '`' },
		{ label: 'Quote', text: '❝', before: '> ', after: '', block: true },
		{ label: 'Bullet list', text: '• List', before: '- ', after: '', block: true },
		{ label: 'Numbered list', text: '1. List', before: '1. ', after: '', block: true },
		{ label: 'Code block', text: 'Code', before: '```\n', after: '\n```', block: true },
		{ label: 'Link', text: 'Link', before: '[', after: '](https://)' },
		{ label: 'Image', text: 'Image', before: '![', after: '](https://)' }
	]
	async function format(tool: (typeof tools)[number]) {
		if (!input) return
		const start = input.selectionStart
		const end = input.selectionEnd
		const prefix = tool.block && start > 0 && value[start - 1] !== '\n' ? '\n' : ''
		const next =
			value.slice(0, start) +
			prefix +
			tool.before +
			value.slice(start, end) +
			tool.after +
			value.slice(end)
		if (next.length > 5000) return
		value = next
		await tick()
		input?.focus()
		input?.setSelectionRange(
			start + prefix.length + tool.before.length,
			end + prefix.length + tool.before.length
		)
	}
</script>

<div class="description-editor">
	<div class="toolbar" aria-label={t('mod:manage-formatting')}>
		{#each tools as tool}
			<button
				type="button"
				title={tool.label}
				aria-label={tool.label}
				disabled={disabled || preview}
				onmousedown={(event) => event.preventDefault()}
				onclick={() => format(tool)}>{tool.text}</button
			>
		{/each}
		<button
			type="button"
			class="preview-toggle"
			aria-pressed={preview}
			onclick={() => (preview = !preview)}>{t('mod:manage-preview')}</button
		>
	</div>
	{#if preview}
		<div class="preview" aria-live="polite">{@html renderMarkdown(value)}</div>
	{:else}
		<textarea
			bind:this={input}
			{id}
			bind:value
			{disabled}
			maxlength="5000"
			aria-label={t('mod:manage-description')}
			spellcheck="false"
		></textarea>
	{/if}
</div>
<div class="editor-caption">
	<span>Markdown</span><span>{value.length.toLocaleString()} / 5,000</span>
</div>

<style>
	.description-editor {
		display: flex;
		flex-direction: column;
		min-height: 560px;
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 7px;
		overflow: hidden;
		background: #12152c;
	}
	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		padding: 8px;
		border-bottom: 1px solid rgb(255 255 255 / 15%);
		background: rgb(255 255 255 / 4%);
	}
	.toolbar button {
		padding: 4px 8px;
		border: 0;
		border-radius: 4px;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 12px;
		cursor: pointer;
	}
	.toolbar button:hover,
	.toolbar button[aria-pressed='true'] {
		background: rgb(255 255 255 / 12%);
	}
	.toolbar button:disabled {
		opacity: 0.4;
		cursor: default;
	}
	.preview-toggle {
		margin-left: auto;
	}
	textarea,
	.preview {
		box-sizing: border-box;
		width: 100%;
		flex: 1;
		min-height: 500px;
		padding: 24px 16px;
		color: inherit;
		font: inherit;
		font-size: 14px;
		line-height: 1.7;
		background: transparent;
		border: 0;
		overflow-wrap: anywhere;
	}
	textarea {
		resize: vertical;
		outline-offset: -2px;
	}
	.preview :global(img) {
		max-width: 100%;
	}
	.preview :global(pre) {
		white-space: pre-wrap;
	}
	.editor-caption {
		display: flex;
		justify-content: space-between;
		color: rgb(255 255 255 / 50%);
		font-size: 12px;
	}
	@media (max-width: 640px) {
		.description-editor {
			min-height: 380px;
		}
		textarea,
		.preview {
			min-height: 320px;
		}
	}
</style>
