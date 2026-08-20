// @ts-check
// Astro + Starlight config for ja.docs.sunriselayer.io.
// Single-language Japanese site. English lives on docs.sunriselayer.io.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';
import mermaid from 'astro-mermaid';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';
import { sidebar } from './src/sidebar.mjs';

export default defineConfig({
	site: 'https://ja.docs.sunriselayer.io',
	trailingSlash: 'never',
	// Astro 7 defaults to Sätteri, which does not run remark/rehype plugins.
	// Opt into unified so remark-math + rehype-katex render $$ formulas.
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
	},
	integrations: [
		mermaid({
			theme: 'neutral',
			autoTheme: true,
		}),
		starlight({
			title: 'Sunrise Docs',
			description: 'Interliquid Networks のベースレイヤー。',
			defaultLocale: 'root',
			locales: {
				root: {
					label: '日本語',
					lang: 'ja',
				},
			},
			favicon: '/favicon.svg',
			logo: {
				light: './src/assets/logo-color.svg',
				dark: './src/assets/logo-white.svg',
				alt: 'Sunrise',
				replacesTitle: true,
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/sunriselayer/sunrise-docs-ja',
				},
				{
					icon: 'discord',
					label: 'Discord',
					href: 'https://discord.com/invite/sunrise',
				},
				{
					icon: 'x.com',
					label: 'X',
					href: 'https://twitter.com/SunriseLayer',
				},
			],
			customCss: ['./src/styles/custom.css'],
			components: {
				Head: './src/components/Head.astro',
				PageTitle: './src/components/PageTitle.astro',
				SocialIcons: './src/components/SocialIcons.astro',
			},
			editLink: {
				baseUrl: 'https://github.com/sunriselayer/sunrise-docs-ja/edit/main/',
			},
			sidebar,
			plugins: [
				starlightLlmsTxt({
					projectName: 'Sunrise',
					description:
						'Sunrise のドキュメント。Proof of Liquidity、手数料抽象化、オフチェーンデータ可用性を備えた Layer 1。',
				}),
			],
		}),
	],
});
