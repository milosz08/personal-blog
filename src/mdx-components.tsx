import { useMDXComponents as getBlogMDXComponents } from 'nextra-theme-blog';
import type { UseMDXComponents } from 'nextra/mdx-components';

const blogComponents = getBlogMDXComponents({
  h1: ({ children }) => <h1 className="font-bold">{children}</h1>,
  DateFormatter: ({ date }) =>
    date.toLocaleDateString('pl', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
});

export const useMDXComponents: UseMDXComponents<typeof blogComponents> = <T,>(components?: T) => ({
  ...blogComponents,
  ...components,
});
