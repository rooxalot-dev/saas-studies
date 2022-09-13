import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import LayoutApp from '@components/Layout/LayoutApp';
import LayoutTenant from '@components/Layout/LayoutTenant';
import LayoutPublic from '@components/Layout/LayoutPublic';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  let Layout = LayoutPublic;

  if (pathname.indexOf('/app') === 0) {
    Layout = LayoutApp;
  } else if (pathname.indexOf('/[slug]') === 0) {
    Layout = LayoutTenant;
  } else {
    Layout = LayoutPublic;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
