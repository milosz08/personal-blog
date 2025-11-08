import { type Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/hero';
import { PostCard } from '@/components/post-card';
import HomeTemplate from '@/templates/home.mdx';
import { getPosts, getTags } from '@/utils/get-posts';
import { buildMetadata } from '@/utils/metadata';

type Tags = {
  [key: string]: number;
};

const metadata = buildMetadata();

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  return metadata;
}

async function Page() {
  const tags = await getTags();
  const posts = await getPosts();

  const allTags: Tags = Object.create(null);
  for (const tag of tags) {
    allTags[tag] ??= 0;
    allTags[tag] += 1;
  }

  return (
    <div data-pagefind-ignore="all">
      <Hero />
      <h1>{metadata.title?.toString()}</h1>
      <HomeTemplate />
      <hr />
      <div className="flex flex-wrap gap-2">
        {Object.entries(allTags).map(([tag, count]) => (
          <Link key={tag} href={`/tags/${tag}`} className="nextra-tag">
            {tag} ({count})
          </Link>
        ))}
      </div>
      {posts.map(post => (
        <PostCard key={post.route} post={post} />
      ))}
    </div>
  );
}

export default Page;
