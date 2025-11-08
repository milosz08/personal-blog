import { getPosts } from '@/utils/get-posts';

const CONFIG = {
  title: 'Miłosz Gilga - blog',
  siteUrl: 'https://blog.miloszgilga.pl',
  description: 'Ostatnie wpisy na blogu',
  lang: 'pl-PL',
};

export async function GET(): Promise<Response> {
  const allPosts = await getPosts();

  const posts = allPosts
    .map(
      post => `
      <item>
        <title>${post.title}</title>
        <description>${post.frontMatter.description}</description>
        <link>${CONFIG.siteUrl}${post.route}</link>
        <pubDate>${new Date(post.frontMatter.date).toUTCString()}</pubDate>
      </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
            <channel>
                <title>${CONFIG.title}</title>
                <link>${CONFIG.siteUrl}</link>
                <description>${CONFIG.description}</description>
                <language>${CONFIG.lang}</language>
                ${posts}
            </channel>
        </rss>`;

  const minifiedXml = xml.replace(/\n\s*/g, '').trim();
  return new Response(minifiedXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
