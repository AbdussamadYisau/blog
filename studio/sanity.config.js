import { defineConfig, defineType, defineField } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Sammie — Writing Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool()],
  schema: {
    types: [
      defineType({
        name: 'post',
        title: 'Posts',
        type: 'document',
        fields: [
          defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'excerpt',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required().max(240),
          }),
          defineField({
            name: 'category',
            type: 'string',
            options: { list: ['Engineering', 'Running', 'Life & thoughts'] },
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'publishedAt',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'readTime',
            title: 'Reading time (minutes)',
            type: 'number',
            initialValue: 5,
            validation: (rule) => rule.min(1),
          }),
          defineField({
            name: 'coverImage',
            type: 'image',
            options: { hotspot: true },
            fields: [
              { name: 'alt', type: 'string', title: 'Alternative text' },
            ],
          }),
          defineField({
            name: 'body',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule.required(),
          }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'category', media: 'coverImage' },
        },
      }),
    ],
  },
});
