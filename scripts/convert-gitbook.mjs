#!/usr/bin/env node
// Convert published GitBook markdown (SUMMARY.md) into Starlight docs.
// Usage: node convert-gitbook.mjs <sourceRoot> <destDocsDir> <sidebarOutFile>
import fs from 'node:fs';
import path from 'node:path';

const HINT_MAP = {
	info: 'note',
	warning: 'caution',
	tip: 'tip',
	danger: 'danger',
	success: 'tip',
};

const ASSET_ALIASES = {
	'vRISE.svg': 'vRISE.svg',
	'vRISE.png': 'vRISE.svg',
	'vRISE (1).png': 'vRISE.svg',
	'vRISE (1).svg': 'vRISE.svg',
	'RISE.png': 'RISE.png',
	'RISE (1).png': 'RISE.png',
	'USDrise.png': 'USDrise.png',
	'USDrise (1).png': 'USDrise.png',
	'color.svg': 'logo-color.svg',
	'Sunrise Cover.png': 'logo-color.svg',
	'Sunrise_Cover.png': 'logo-color.svg',
};

const FILE_ID_ALIASES = {
	TUKUPlQeRvD8HnKUHgpf: 'RISE.png',
	Div3EhI0oboVX6ho0wct: 'vRISE.svg',
	'4ghdAWYSxegI6ZvSHca7': 'USDrise.png',
};

const [sourceRoot, destDocsDir, sidebarOutFile] = process.argv.slice(2);
if (!sourceRoot || !destDocsDir || !sidebarOutFile) {
	console.error(
		'Usage: node convert-gitbook.mjs <sourceRoot> <destDocsDir> <sidebarOutFile>'
	);
	process.exit(1);
}

const summaryPath = path.join(sourceRoot, 'SUMMARY.md');
const summary = fs.readFileSync(summaryPath, 'utf8');

function yamlQuote(value) {
	const needsQuote =
		/[:#{}[\],&*?|<>=!%@`]/.test(value) ||
		value.includes("'") ||
		value.includes('"') ||
		value.startsWith('-') ||
		value.trim() !== value;
	if (!needsQuote) return value;
	return JSON.stringify(value);
}

function stripGitBookFrontmatter(raw) {
	if (!raw.startsWith('---\n')) return raw;
	const end = raw.indexOf('\n---', 4);
	if (end === -1) return raw;
	return raw.slice(end + 4).replace(/^\s*\n/, '');
}

function extractTitle(body) {
	const match = body.match(/^#\s+(.+?)\s*$/m);
	if (!match) return { title: 'Untitled', body };
	const title = match[1].trim();
	const next = body.replace(match[0], '').replace(/^\s*\n/, '');
	return { title, body: next };
}

function firstDescription(body, fallback) {
	const lines = body.split('\n');
	const parts = [];
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed) {
			if (parts.length) break;
			continue;
		}
		if (
			trimmed.startsWith('#') ||
			trimmed.startsWith('```') ||
			trimmed.startsWith('|') ||
			trimmed.startsWith(':::') ||
			trimmed.startsWith('>') ||
			trimmed.startsWith('- ') ||
			trimmed.startsWith('* ') ||
			trimmed.startsWith('{%')
		) {
			if (parts.length) break;
			continue;
		}
		parts.push(trimmed.replace(/\*\*/g, '').replace(/`/g, ''));
		if (parts.join(' ').length > 80) break;
	}
	const text = parts.join(' ').replace(/\s+/g, ' ').trim();
	if (!text) return fallback;
	return text.length > 180 ? `${text.slice(0, 177)}...` : text;
}

function convertHints(markdown) {
	return markdown.replace(
		/\{%\s*hint\s+style=["'](\w+)["']\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/g,
		(_all, style, inner) => {
			const kind = HINT_MAP[style] || 'note';
			const content = inner.replace(/^\n+|\n+$/g, '');
			return `\n:::${kind}\n${content}\n:::\n`;
		}
	);
}

function escapeCurrencyTickers(markdown) {
	const parts = markdown.split(/(```[\s\S]*?```|\$\$[\s\S]*?\$\$)/);
	return parts
		.map((part, index) => {
			if (index % 2 === 1) return part;
			return part.replace(/(?<!\$)\$(?![$\d])([A-Z]{2,}\b)/g, '\\$$$1');
		})
		.join('');
}

function destSlugFromSummaryPath(summaryFile) {
	let rel = summaryFile.replace(/\\/g, '/');
	if (rel === 'README.md') return '';
	if (rel.endsWith('/README.md')) rel = rel.slice(0, -'/README.md'.length);
	else if (rel.endsWith('.md')) rel = rel.slice(0, -3);
	return rel.replace(/\/+$/, '');
}

function resolveMarkdownHref(sourceFile, href) {
	const [withoutHash, hashPart] = href.split('#');
	const hash = hashPart ? `#${hashPart}` : '';
	let target = withoutHash.trim();
	if (!target || target.startsWith('mailto:') || target.startsWith('#')) {
		return href;
	}
	if (/^https?:\/\//i.test(target)) return href;

	if (target.startsWith('/files/')) {
		const id = target.slice('/files/'.length).split('/')[0];
		const mapped = FILE_ID_ALIASES[id];
		return mapped ? `/images/${mapped}${hash}` : href;
	}

	if (target.startsWith('/')) {
		target = target.replace(/\.md$/i, '');
		if (target.endsWith('/README')) target = target.slice(0, -'/README'.length);
		if (target === '/README' || target === '/') return `/${hash === '#' ? '' : hash}`;
		return `${target.replace(/\/+$/, '')}${hash}`;
	}

	const sourceDir = path.posix.dirname(sourceFile.replace(/\\/g, '/'));
	const joined = path.posix.normalize(path.posix.join(sourceDir, target));
	let slug = joined;
	if (slug.endsWith('/README.md')) slug = slug.slice(0, -'/README.md'.length);
	else if (slug.endsWith('README.md')) slug = slug.slice(0, -'README.md'.length);
	else if (slug.endsWith('.md')) slug = slug.slice(0, -3);
	slug = slug.replace(/\/+$/, '');
	if (slug === '.' || slug === '' || slug === 'README') {
		return hash ? `/${hash}` : '/';
	}
	return `/${slug}${hash}`;
}

function mapAssetDest(cleaned) {
	const fileName = decodeURIComponent(
		cleaned.split('/').pop()?.replace(/\\/g, '') || ''
	);
	if (ASSET_ALIASES[fileName]) {
		return `/images/${ASSET_ALIASES[fileName]}`;
	}
	if (cleaned.startsWith('/files/')) {
		const id = cleaned.slice('/files/'.length).split('/')[0];
		if (FILE_ID_ALIASES[id]) {
			return `/images/${FILE_ID_ALIASES[id]}`;
		}
	}
	return null;
}

function convertImagesAndLinks(markdown, sourceFile) {
	// GitBook uses both ![alt](path) and ![alt](<path with spaces>).
	let out = markdown.replace(
		/!\[([^\]]*)\]\(\s*(?:<([^>]+)>|([^)\s]+))\s*\)/g,
		(_all, alt, angleDest, plainDest) => {
			const cleaned = (angleDest || plainDest).trim();
			const mapped = mapAssetDest(cleaned);
			if (mapped) return `![${alt}](${mapped})`;
			return `![${alt}](${cleaned})`;
		}
	);

	out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_all, text, dest) => {
		const trimmed = dest.trim();
		if (trimmed.startsWith('/images/')) return `[${text}](${trimmed})`;
		if (
			/^https?:\/\//i.test(trimmed) ||
			trimmed.startsWith('mailto:') ||
			trimmed.startsWith('#')
		) {
			return `[${text}](${trimmed})`;
		}
		return `[${text}](${resolveMarkdownHref(sourceFile, trimmed)})`;
	});

	return out;
}

function parseSummary(text) {
	const groups = [];
	let current = null;
	const stack = [];

	for (const rawLine of text.split('\n')) {
		const line = rawLine.replace(/\t/g, '    ');
		const heading = line.match(/^##\s+(.+?)\s*$/);
		if (heading) {
			current = { label: heading[1].trim(), items: [] };
			groups.push(current);
			stack.length = 0;
			continue;
		}
		const item = line.match(/^(\s*)\*\s+\[([^\]]+)\]\(([^)]+)\)\s*$/);
		if (!item || !current) continue;
		const indent = item[1].length;
		const label = item[2].trim();
		const href = item[3].trim();
		const node = { label, href, items: [] };
		while (stack.length && stack[stack.length - 1].indent >= indent) {
			stack.pop();
		}
		if (stack.length === 0) {
			current.items.push(node);
		} else {
			stack[stack.length - 1].node.items.push(node);
		}
		stack.push({ indent, node });
	}
	return groups;
}

function sidebarItemsFromNodes(nodes) {
	return nodes.map((node) => {
		if (/^https?:\/\//i.test(node.href)) {
			return {
				label: node.label,
				link: node.href,
				attrs: { target: '_blank', rel: 'noopener' },
			};
		}
		const slug = destSlugFromSummaryPath(node.href);
		if (node.items.length) {
			return {
				label: node.label,
				link: `/${slug}`,
				items: sidebarItemsFromNodes(node.items),
			};
		}
		return { label: node.label, slug: slug || 'index' };
	});
}

function collectFiles(nodes, acc = []) {
	for (const node of nodes) {
		if (!/^https?:\/\//i.test(node.href)) acc.push(node.href);
		if (node.items.length) collectFiles(node.items, acc);
	}
	return acc;
}

const groups = parseSummary(summary);
const files = [];
for (const group of groups) collectFiles(group.items, files);

fs.mkdirSync(destDocsDir, { recursive: true });

for (const rel of files) {
	const srcPath = path.join(sourceRoot, rel);
	if (!fs.existsSync(srcPath)) {
		console.warn(`Missing source file: ${rel}`);
		continue;
	}
	let outRel;
	if (rel.endsWith('/README.md')) {
		outRel = `${rel.slice(0, -'/README.md'.length)}/index.md`;
	} else if (rel === 'README.md') {
		outRel = 'index.md';
	} else {
		outRel = rel;
	}

	let raw = fs.readFileSync(srcPath, 'utf8');
	raw = stripGitBookFrontmatter(raw);
	const extracted = extractTitle(raw);
	let body = convertHints(extracted.body);
	body = convertImagesAndLinks(body, rel);
	body = body.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n');
	body = body.replace(/```Bash\b/g, '```bash');
	body = body.replace(/```service\b/g, '```ini');
	const description = firstDescription(body, extracted.title);
	body = escapeCurrencyTickers(body);
	const frontmatter = `---\ntitle: ${yamlQuote(extracted.title)}\ndescription: ${yamlQuote(description)}\n---\n\n`;
	const destPath = path.join(destDocsDir, outRel);
	fs.mkdirSync(path.dirname(destPath), { recursive: true });
	fs.writeFileSync(destPath, `${frontmatter}${body.trim()}\n`);
	console.log(`wrote ${outRel}`);
}

console.log(`converted ${files.length} pages`);
