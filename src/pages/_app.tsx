import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from "next-auth/react"
import { withTRPC } from '@trpc/next';

import LayoutApp from '@components/Layout/LayoutApp';
import LayoutTenant from '@components/Layout/LayoutTenant';
import LayoutPublic from '@components/Layout/LayoutPublic';
import LayoutEmpty from '@components/Layout/LayoutEmpty';

import { AppRouter } from 'src/server/routers/app';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { pathname } = useRouter();
  let Layout = LayoutPublic;

  if (pathname === '/app') {
    Layout = LayoutEmpty;
  } else if (pathname.indexOf('/app') === 0) {
    Layout = LayoutApp;
  } else if (pathname.indexOf('/[slug]') === 0) {
    Layout = LayoutTenant;
  } else {
    Layout = LayoutPublic;
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';
    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
