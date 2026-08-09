import { type Metadata } from 'next';
import Script from 'next/script';
import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog';
import { Head, Search } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import React from 'react';
import ClarityScript from '@/components/clarity-script';
import { buildMetadata } from '@/utils/metadata';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';
import 'katex/dist/katex.min.css';
import 'nextra-theme-blog/style.css';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata();
}

const analyticsReferer = process.env.NEXT_PUBLIC_ANALYTICS_REFERER;
const analyticsWebpageId = process.env.NEXT_PUBLIC_ANALYTICS_WEBPAGE_ID;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

type Props = {
  children: React.ReactNode;
};

async function RootLayout({ children }: Props): Promise<React.ReactElement> {
  return (
    <html lang="pl" suppressHydrationWarning>
      <Head />
      {analyticsReferer && analyticsWebpageId && (
        <Script defer={true} src={analyticsReferer} data-website-id={analyticsWebpageId} />
      )}
      {clarityProjectId && <ClarityScript projectId={clarityProjectId} />}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body>
        <Layout>
          <Navbar pageMap={await getPageMap()}>
            <Search placeholder="Szukaj" loading="Wyszukiwanie..." errorText="Nie znaleziono" />
            <ThemeSwitch />
          </Navbar>
          {children}
          <hr />
          <Footer>
            &copy; {new Date().getFullYear()} by <a href="https://miloszgilga.pl">Miłosz Gilga</a>.
            <a href="/feed.xml" style={{ float: 'right' }}>
              RSS
            </a>
          </Footer>
        </Layout>
      </body>
    </html>
  );
}

export default RootLayout;
