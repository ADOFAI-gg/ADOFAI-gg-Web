import { Marked, Renderer } from 'marked'

const escape = (value: string) =>
	value.replace(
		/[&<>"']/g,
		(char) =>
			({
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;'
			})[char]!
	)

// Marked has already encoded entities in image text and link titles.
const attribute = (value: string) =>
	value.replace(
		/&(?!(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);)|[<>"']/gi,
		(char) =>
			({
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;'
			})[char]!
	)

function safeUrl(value: string, image = false): string | null {
	if (!image && value.startsWith('#')) return value
	try {
		const url = new URL(value)
		return (image ? ['https:', 'http:'] : ['https:', 'http:', 'mailto:']).includes(url.protocol)
			? url.href
			: null
	} catch {
		return null
	}
}

// API descriptions are untrusted Markdown, never Svelte or raw HTML.
const renderer = new Renderer()
renderer.html = escape
renderer.link = (href, title, text) => {
	const url = safeUrl(href)
	if (!url) return text
	return `<a href="${escape(url)}"${title ? ` title="${attribute(title)}"` : ''} target="_blank" rel="noopener noreferrer">${text}</a>`
}
renderer.image = (href, title, text) => {
	const url = safeUrl(href, true)
	if (!url) return escape(text)
	return `<img src="${escape(url)}" alt="${attribute(text)}"${title ? ` title="${attribute(title)}"` : ''} loading="lazy">`
}
const markdown = new Marked({ renderer, gfm: true, breaks: true, async: false })

markdown.use({
	extensions: [
		{
			name: 'discordSubtext',
			level: 'block',
			start(source) {
				const index = source.match(/\n-#[ \t]+/)?.index
				return index === undefined ? undefined : index + 1
			},
			tokenizer(source) {
				const match = /^-#[ \t]+([^\n]*)(?:\n|$)/.exec(source)
				if (!match) return
				return { type: 'discordSubtext', raw: match[0], tokens: this.lexer.inlineTokens(match[1]) }
			},
			renderer(token) {
				return `<p class="discord-subtext">${this.parser.parseInline(token.tokens ?? [])}</p>\n`
			}
		}
	]
})

export function renderMarkdown(source: string): string {
	return markdown.parse(source) as string
}
