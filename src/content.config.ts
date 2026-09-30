// Content collections for Starlight docs and Japanese UI strings.
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

// Starlight only renders banners from page frontmatter, so default `banner`
// on every docs page to show the Cosmos Sunrise shutdown notice site-wide.
const shutdownBanner = {
	content:
		'Cosmos Sunrise は 2026年10月5日 12:00 UTC に終了します（v2.0.0、ブロック高 6,504,000）。保有資産は Sunrise Edge に引き継がれます。終了前に資金を移動する必要はありません。<a href="https://sunriselayer.io/">詳細</a>',
};

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				banner: z.object({ content: z.string() }).default(shutdownBanner),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
