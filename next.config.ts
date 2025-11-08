import nextra from 'nextra';

const withNextra = nextra({
  defaultShowCopyCode: true,
  readingTime: true,
  latex: true,
  search: {
    codeblocks: false,
  },
});

export default withNextra({
  reactStrictMode: true,
  cleanDistDir: true,
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './src/mdx-components.tsx',
    },
  },
});
