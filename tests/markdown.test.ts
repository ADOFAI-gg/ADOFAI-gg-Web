import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { renderMarkdown } from '../src/lib/server/markdown'

describe('shared description and comment Markdown', () => {
	test('renders headings, emphasis, lists, links, code and GFM', () => {
		const html = renderMarkdown(
			'# Title\n\n**bold** and ~~old~~\n\n- first\n- second\n\n[Download](https://example.com/mod)\n\n```js\nconst value = 1\n```\n\n| A | B |\n| - | - |\n| x | y |'
		)
		for (const expected of [
			'<h1>',
			'<strong>bold</strong>',
			'<del>old</del>',
			'<ul>',
			'<li>first</li>',
			'href="https://example.com/mod"',
			'<pre><code',
			'<table>'
		])
			assert.ok(html.includes(expected))
	})
	test('renders Discord subtext at the start of a line with inline Markdown', () => {
		const html = renderMarkdown(
			'Normal text\n-# If you find a **bug**, [open an issue](https://example.com/issues).\n-# Second note'
		)
		assert.equal((html.match(/class="discord-subtext"/g) ?? []).length, 2)
		assert.ok(html.includes('<strong>bug</strong>'))
		assert.ok(html.includes('href="https://example.com/issues"'))
		assert.ok(!html.includes('-# If'))
	})

	test('keeps subtext markers literal in code or inside ordinary text', () => {
		const html = renderMarkdown(
			'Text -# stays literal\n\n`-# inline code`\n\n```text\n-# fenced code\n```'
		)
		assert.ok(!html.includes('class="discord-subtext"'))
		assert.ok(html.includes('-# fenced code'))
	})

	test('applies existing HTML and URL restrictions inside subtext', () => {
		const html = renderMarkdown('-# <img src=x onerror=alert(1)> [bad](javascript:alert%281%29)')
		assert.ok(html.includes('class="discord-subtext"'))
		assert.ok(!html.includes('<img '))
		assert.ok(!html.includes('href='))
	})

	test('escapes HTML and disallows executable link and image protocols', () => {
		const html = renderMarkdown(
			'<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[bad](javascript:alert%281%29)\n\n![bad](data:text/html,evil)\n\n[encoded](jav&#x61;script:alert%281%29)'
		)
		assert.ok(!html.includes('<script>'))
		assert.ok(!html.includes('<img '))
		assert.ok(!html.includes('href='))
		assert.ok(html.includes('&lt;script&gt;'))
	})
	test('escapes image attributes and leaves Svelte expressions as text', () => {
		const html = renderMarkdown(
			'![a " b](https://example.com/image.png "title")\n\n{window.location = "https://example.com"}'
		)
		assert.ok(html.includes('loading="lazy"'))
		assert.ok(html.includes('alt="a &quot; b"'))
		assert.ok(html.includes('{window.location'))
	})
})
