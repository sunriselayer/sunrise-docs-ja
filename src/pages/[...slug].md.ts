// Serve GitBook-style per-page Markdown at `{slug}.md` for LLMs and crawlers.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';

function markdownSlug(id: string) {
	if (id === '' || id === 'index') return 'index';
	return id;
}

function stripFrontmatter(raw: string) {
	if (!raw.startsWith('---\n')) return raw;
	const end = raw.indexOf('\n---', 4);
	if (end === -1) return raw;
	return raw.slice(end + 4).replace(/^\s*\n/, '');
}

export async function getStaticPaths() {
	const docs = await getCollection('docs');
	return docs
		.filter((entry) => entry.id !== '404')
		.map((entry) => ({
			params: { slug: markdownSlug(entry.id) },
			props: {
				title: entry.data.title,
				body: entry.body,
				filePath: entry.filePath,
			},
		}));
}

export const GET: APIRoute = async ({ props }) => {
	let body = typeof props.body === 'string' ? props.body : '';
	if (!body.trim() && typeof props.filePath === 'string') {
		const raw = await readFile(props.filePath, 'utf8');
		body = stripFrontmatter(raw);
	}

	const markdown = `# ${props.title}\n\n${body.trim()}\n`;
	return new Response(markdown, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
};
