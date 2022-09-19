import Head from 'next/head';
import React from 'react';

import Favicon from '@public/favicon.ico';

type SeoProps = {
  title: string;
  description?: string
};

const Seo: React.FC<SeoProps> = ({ title, description }: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      { description && <meta name="description" content={description}></meta> }
      <link rel="icon" href={Favicon.src} />
    </Head>
  );
}

export default Seo;
