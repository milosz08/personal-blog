import { Link } from 'next-view-transitions';
import { BlogMetadata } from 'nextra-theme-blog';
import React from 'react';
import { formatDate } from '../utils';

type PostCardProps = {
  post: {
    route: string;
    frontMatter: BlogMetadata;
  };
  readMore?: string;
};

const PostCard: React.FC<PostCardProps> = ({ post }): React.ReactElement => {
  const { description, date, title } = post.frontMatter;
  const dateObj = date && new Date(date);

  return (
    <div key={post.route}>
      <h2 className="x:mt-6 x:mb-2 x:text-xl x:font-semibold">
        <Link href={post.route} className="not-prose">
          {title}
        </Link>
      </h2>
      {description && (
        <p className="x:mb-2 x:dark:text-gray-400 x:text-gray-600">
          {description}
          <Link href={post.route} className="x:ml-2">
            Więcej →
          </Link>
        </p>
      )}
      {dateObj && (
        <time
          className="x:text-sm x:dark:text-gray-400 x:text-gray-600"
          dateTime={dateObj.toISOString()}>
          {formatDate(dateObj)}
        </time>
      )}
    </div>
  );
};

export { PostCard };
