import type { Metadata } from 'next';

type Props = {
  title?: string;
  description?: string;
  urlSuffix?: string;
  creator?: string;
  type?: string;
};

const selfRefer = process.env.NEXT_PUBLIC_SELF_REFER;
const images = [`${selfRefer}/og-banner.png`];

const buildMetadata = ({
  title,
  description,
  urlSuffix = '',
  type,
  creator,
}: Props = {}): Metadata => {
  const defTitle = 'Miłosz Gilga - blog';
  const defDescription =
    'Blog poświęcony analizom, testom i poradnikom, w których skupiam się na zagadnieniach przetwarzania obrazów, ' +
    'DSP, DevOps (z uwzględnieniem aspektu bezpieczeństwa) oraz programowania.';

  return {
    title: title || defTitle,
    description: description || defDescription,
    openGraph: {
      title: title || defTitle,
      description: description || defDescription,
      locale: 'pl',
      images,
      url: selfRefer + urlSuffix,
      ...(type ? { type } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: title || defTitle,
      description: description || defDescription,
      images,
      ...(creator ? { creator } : {}),
    },
  };
};

export { buildMetadata };
