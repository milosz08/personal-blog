import Link from 'next/link';
import { Metadata } from 'next/types';
import React from 'react';
import { PostCard } from '@/components/post-card';
import { getPosts, getTags } from '@/utils/get-posts';
import { buildMetadata } from '@/utils/metadata';

type Tag = {
  tag: string;
};

type Props = {
  params: Promise<Tag>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const encodedTag = decodeURIComponent(params.tag);
  return buildMetadata({
    title: `Wpisy z tagiem "${encodedTag}"`,
    description: `Lista wszystkich wpisów posiadających wybrany tag "${encodedTag}"`,
    urlSuffix: `/tags/${params.tag}`,
  });
}

export async function generateStaticParams(): Promise<Tag[]> {
  const allTags = await getTags();
  return [...new Set(allTags)].map(tag => ({ tag }));
}

async function Page(props: Props): Promise<React.ReactElement> {
  const { title } = await generateMetadata(props);
  const params = await props.params;
  const posts = await getPosts();

  return (
    <>
      <h1 className="font-bold">{title as string}</h1>
      <Link href="/">Strona główna</Link>
      {posts
        .filter(post => post.frontMatter.tags.includes(decodeURIComponent(params.tag)))
        .map(post => (
          <PostCard key={post.route} post={post} />
        ))}
    </>
  );
}

export default Page;
