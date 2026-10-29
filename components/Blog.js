'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Icon from './Icon';
import { samples, projectId, getPosts } from '../lib/content';

const categories = ['All posts', 'Engineering', 'Running', 'Life & thoughts'];

function formatDate(publishedAt) {
  return new Date(publishedAt).toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function Header() {
  return (
    <header className="mx-auto flex h-[110px] max-w-[740px] items-center justify-between border-b border-line max-wide:px-[25px]">
      <Link className="text-[18px] font-semibold tracking-[-0.7px]" href="/">
        sammie
      </Link>
      <nav className="flex items-center gap-[15px] text-[10px] desktop:gap-[25px] desktop:text-[12px]">
        <Link href="/">Writing</Link>
        <Link className="inline-flex items-center gap-[7px]" href="/#about">
          About me <Icon />
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[740px] flex-wrap justify-between gap-[15px] border-t border-line pt-[27px] pb-[34px] text-[9px] text-[#929789] max-wide:px-[25px] desktop:flex-nowrap desktop:gap-0">
      <span>© {new Date().getFullYear()} Abdussamad Yisau</span>
      <a className="inline-flex items-center gap-[7px]" href="#">
        Back to top <Icon name="up" />
      </a>
    </footer>
  );
}

export default function Blog({ reader = false }) {
  const [posts, setPosts] = useState(projectId ? [] : samples);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(projectId));
  const [category, setCategory] = useState('All posts');
  const [query, setQuery] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (reader) {
      setSlug(new URLSearchParams(window.location.search).get('slug') || '');
    }

    if (projectId) {
      getPosts()
        .then(setPosts)
        .catch(() =>
          setError('Could not load articles. Please refresh to try again.'),
        )
        .finally(() => setLoading(false));
    }
  }, [reader]);

  const searchQuery = query.toLowerCase();
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      category === 'All posts' || post.category === category;
    const searchableText = `${post.title} ${post.excerpt || ''}`.toLowerCase();
    const matchesSearch = searchableText.includes(searchQuery);

    return matchesCategory && matchesSearch;
  });
  const featuredPost = filteredPosts[0];
  const selectedPost = posts.find((post) => post.slug === slug);

  return (
    <>
      <Header />
      {reader ? (
        <ArticleReader post={selectedPost} loading={loading} error={error} />
      ) : (
        <main className="mx-auto max-w-[740px] max-wide:px-[25px]">
          <Hero />
          <section className="border-t border-line pt-[27px]">
            <h2 className="m-0 text-[15px] leading-[normal] font-semibold">
              The latest notes{' '}
              <sup className="ml-[6px] align-top text-[11px] font-normal">
                ({posts.length.toString().padStart(2, '0')})
              </sup>
            </h2>
            <div className="my-5 desktop:flex desktop:items-center desktop:justify-between">
              <div className="flex flex-wrap desktop:flex-nowrap desktop:gap-[7px]">
                {categories.map((categoryName) => (
                  <button
                    className={`cursor-pointer rounded border border-transparent px-2.5 py-1.5 text-[11px] hover:border-line ${category === categoryName ? 'bg-ink text-white' : 'bg-transparent text-[#7c8277]'}`}
                    onClick={() => setCategory(categoryName)}
                    key={categoryName}
                  >
                    {categoryName}
                  </button>
                ))}
              </div>
              <label className="mt-[14px] flex items-center gap-2 py-[7px] desktop:mt-0 desktop:py-2">
                <Icon name="search" size={18} className="text-muted" />
                <input
                  className="w-full border-0 bg-transparent text-[11px] text-ink outline-none desktop:w-[125px]"
                  aria-label="Search articles"
                  placeholder="Find a thought…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>
            {!projectId && (
              <p className="mt-0 mb-2 text-[8px] tracking-[0.8px] text-[#94998c]">
                SAMPLE WRITING · A preview of your future posts
              </p>
            )}
            {loading ? (
              <p className="py-[65px] text-muted">
                Loading the latest writing…
              </p>
            ) : error ? (
              <p className="py-[65px] text-muted" role="alert">
                {error}
              </p>
            ) : !featuredPost ? (
              <p className="py-[65px] text-muted">
                No notes here yet.{' '}
                {query ? 'Try another search.' : 'Check back soon.'}
              </p>
            ) : (
              <>
                <PostPreview post={featuredPost} featured />
                {filteredPosts.slice(1).map((post) => (
                  <PostPreview post={post} key={post._id} />
                ))}
              </>
            )}
          </section>
          <About />
        </main>
      )}
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="pt-10 pb-[52px] desktop:pt-[65px]">
      <h1 className="mt-0 mb-6 text-[29px] leading-[1.3] font-normal tracking-[-1.3px] desktop:text-[36px]">
        Sammie Yisau
        <span className="mt-[9px] block text-[15px] font-normal tracking-[-0.25px] text-[#8b8b8b] desktop:text-[17px]">
          Engineer. Runner. Always learning.
        </span>
      </h1>
      <div className="desktop:flex desktop:items-end desktop:justify-between">
        <p className="text-[14px] leading-[1.9] text-[#6b6b6b]">
          I’m Sammie, a software engineer building for the web.
          <br className="hidden desktop:inline" /> Here I write about
          engineering, running, and figuring things out.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mt-[45px] grid grid-cols-1 gap-2 py-[30px]">
      <div>
        <p className="flex items-center gap-2 text-[8px] font-semibold tracking-[0.6px] uppercase">
          A LITTLE ABOUT THE WRITER
        </p>
        <h2 className="my-[15px] text-[18px] leading-[normal] font-medium">
          Hi, I’m Sammie.
        </h2>
        <p className="max-w-[600px] text-[12px] leading-[1.8] text-[#7b8274]">
          I’m a software engineer who enjoys building thoughtful experiences for
          the web. Away from the screen, you’ll probably find me out for a run.
        </p>
        <p className="max-w-[600px] text-[12px] leading-[1.8] text-[#7b8274]">
          This is my small corner of the internet: a place to think out loud,
          share what I learn, and document the journey.
        </p>
      </div>
    </section>
  );
}

function PostMetadata({ post, className = '' }) {
  return (
    <p
      className={`flex items-center gap-2 text-[8px] font-semibold tracking-[0.6px] uppercase ${className}`}
    >
      {post.category}
      <span className="font-normal tracking-[1px] text-[#8b9282]">
        {' '}
        / {post.readTime || 5} MIN READ
      </span>
    </p>
  );
}

function PostPreview({ post, featured = false }) {
  return (
    <Link
      className={`group overflow-hidden border-b border-line py-[25px] ${featured ? 'flex flex-col' : 'block'}`}
      href={'/post/?slug=' + encodeURIComponent(post.slug)}
    >
      <PostMetadata post={post} className="m-0" />
      <h3 className="my-[7px] text-[19px] leading-[1.4] font-medium tracking-[-0.5px] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[5px]">
        {post.title}
      </h3>
      <p
        className={`my-[7px] max-w-[570px] text-[12px] leading-[1.8] ${featured ? 'text-[#7a8074]' : 'text-[#818777]'}`}
      >
        {post.excerpt}
      </p>
      <div className="mt-auto flex items-center justify-between pt-3 text-[10px] text-[#89917e]">
        <span>{formatDate(post.publishedAt)}</span>
        {featured ? (
          <b className="inline-flex items-center gap-[7px] text-[10px] font-medium text-ink">
            Read the story <Icon />
          </b>
        ) : (
          <Icon />
        )}
      </div>
    </Link>
  );
}

function ArticleReader({ post, loading, error }) {
  return (
    <main className="mx-auto max-w-[740px] pt-[45px] pb-20 max-wide:px-[25px]">
      <Link
        className="mb-[50px] inline-flex items-center gap-[7px] text-[12px]"
        href="/"
      >
        <Icon name="back" /> All writing
      </Link>
      {loading ? (
        <p>Loading article…</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : post ? (
        <>
          <PostMetadata post={post} />
          <h1 className="my-[22px] text-[34px] leading-[1.15] font-semibold tracking-[-1.3px] desktop:text-[42px]">
            {post.title}
          </h1>
          <p className="text-[18px] leading-[1.6] text-[#7b8274]">
            {post.excerpt}
          </p>
          <div className="mt-[25px] mb-[35px] flex items-center gap-3 text-[12px]">
            <span className="rounded-full bg-[#dce3d2] p-3 text-[11px]">
              SY
            </span>
            <div>
              Abdussamad Yisau
              <small className="mt-1.5 block text-muted">
                {formatDate(post.publishedAt)}
              </small>
            </div>
          </div>
          <PostBody body={post.body} />
        </>
      ) : (
        <>
          <h1 className="my-[22px] text-[34px] leading-[1.15] font-semibold tracking-[-1.3px] desktop:text-[42px]">
            Article not found.
          </h1>
          <p>It may have been unpublished.</p>
        </>
      )}
    </main>
  );
}

function PostBody({ body }) {
  return (
    <article className="text-[17px] leading-[1.9] [&_a]:underline">
      {typeof body === 'string' ? (
        body
          .split('\n\n')
          .map((paragraph, index) => <p key={index}>{paragraph}</p>)
      ) : (
        <PortableText
          value={body || []}
          components={{
            types: {
              image: ({ value }) => (
                <p>Image: {value.alt || 'Article illustration'}</p>
              ),
            },
          }}
        />
      )}
    </article>
  );
}
