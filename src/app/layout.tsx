import type { Metadata } from 'next';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import './globals.scss';
import { Gowun_Batang, Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '400', '700', '900'],
});

const batang = Gowun_Batang({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'SongeunBookstore',
  description: 'SongeunBookstore',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head></head>
      <body
        className={`rootContainer ${batang.className} ${notoSansKr.className}`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
