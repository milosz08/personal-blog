import Image from 'next/image';
import React from 'react';
import heroImage from '@/assets/hero.png';

const Hero: React.FC = (): React.ReactElement => (
  <Image src={heroImage} alt="hero" className="rounded-2xl" />
);

export { Hero };
