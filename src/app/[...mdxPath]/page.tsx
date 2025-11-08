import { type Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { $NextraMetadata, Heading } from 'nextra';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import React from 'react';
import Comments from '@/components/comments';
import { Hero } from '@/components/hero';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';
import { buildMetadata } from '@/utils/metadata';

export const generateStaticParams = generateStaticParamsFor('mdxPath');
export const dynamic = 'force-static';
export const revalidate = false;

type Props = {
  params: Promise<{
    mdxPath: string[];
  }>;
};

type BlogWrapperProps = {
  toc: Heading[];
  metadata: $NextraMetadata;
  sourceCode: string;
  children: React.ReactNode;
};

type ComponentsWithWrapper = ReturnType<typeof getMDXComponents> & {
  wrapper: React.FC<BlogWrapperProps>;
};

const Wrapper = (getMDXComponents() as ComponentsWithWrapper).wrapper;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return buildMetadata({
    title: `${metadata.title} | Miłosz Gilga`,
    ...(metadata.description ? { description: metadata.description } : {}),
    urlSuffix: `/${params.mdxPath.join('/')}`,
    type: 'article',
    creator: '@xenomorph80_',
  });
}

async function Page(props: Props): Promise<React.ReactElement> {
  const params = await props.params;
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(params.mdxPath);

  return (
    <>
      <Link href="/">← Wszystkie wpisy</Link>
      <Hero />
      <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
        <MDXContent {...props} params={params} />
      </Wrapper>
      <hr />
      <Comments />
    </>
  );
}

export default Page;
