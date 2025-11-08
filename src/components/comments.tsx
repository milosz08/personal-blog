'use client';

import { useTheme } from 'nextra-theme-blog';
import React, { useMemo } from 'react';
import { useIsMounted } from 'usehooks-ts';
import Giscus from '@giscus/react';

const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

const Comments: React.FC = (): React.ReactElement | null => {
  const { resolvedTheme } = useTheme();
  const commentsTheme = useMemo(
    () => (resolvedTheme === 'dark' ? 'transparent_dark' : 'light'),
    [resolvedTheme]
  );
  const isMounted = useIsMounted();

  if (!isMounted || !repoId || !categoryId) {
    return null;
  }

  return (
    <Giscus
      repo="milosz08/personal-blog"
      repoId={repoId}
      category="Comments"
      categoryId={categoryId}
      mapping="title"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={commentsTheme}
      lang="pl"
      loading="lazy"
    />
  );
};

export default Comments;
