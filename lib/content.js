export const samples = [
  {
    _id: '1',
    slug: 'the-small-things',
    title: 'The small things are the big things.',
    category: 'Engineering',
    excerpt:
      'A few thoughts on the details that make software feel considered, useful, and a little more human.',
    publishedAt: '2026-10-20',
    readTime: 5,
    cover: 'grid',
    body: 'Good interfaces make room for people. They explain what is happening, remember the work you have already done, and help you take the next step.\n\nThis is a sample article to show how your writing will look. Replace it with your first published post in Sanity.\n\nStart with the details\n\nA useful error message. A loading state that holds its shape. A button label that says exactly what happens next. Small decisions add up to an experience people trust.',
  },
  {
    _id: '2',
    slug: 'learning-to-run-slow',
    title: 'Learning to run slow.',
    category: 'Running',
    excerpt: 'On patience, easy miles, and learning to enjoy the process.',
    publishedAt: '2026-10-16',
    readTime: 4,
    cover: 'track',
    body: 'Some runs are about showing up. No personal best, no big finish. Just a steady rhythm and a little time outside.\n\nThis is a sample article. Your own stories will appear here once Sanity is connected.',
  },
  {
    _id: '3',
    slug: 'building-less',
    title: 'A case for building less.',
    category: 'Engineering',
    excerpt: 'The best feature might be the one you decide to leave out.',
    publishedAt: '2026-10-10',
    readTime: 6,
    cover: 'blocks',
    body: 'Every feature has a cost beyond the code. It asks for attention, introduces decisions, and becomes something to maintain.\n\nThis is a sample article. Use Sanity Studio to draft, edit, and publish your own posts.',
  },
  {
    _id: '4',
    slug: 'make-room',
    title: 'Make room for the in-between.',
    category: 'Life & thoughts',
    excerpt:
      'A notebook, an unhurried morning, and the ideas that arrive when you stop looking.',
    publishedAt: '2026-10-04',
    readTime: 3,
    cover: 'sun',
    body: 'There is something useful about leaving a little space in the day. Ideas need somewhere to land.\n\nThis is a sample article, included to demonstrate your blog layout.',
  },
];

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const postsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
    | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      publishedAt,
      readTime,
      body,
      "imageUrl": coverImage.asset->url
    }
`;

export async function getPosts() {
  const { createClient } = await import('@sanity/client');
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2026-10-29',
    useCdn: true,
    perspective: 'published',
  });

  return client.fetch(postsQuery);
}
