import type { Metadata } from 'next';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import './globals.scss';

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
    <html lang="ko">
      <body className="rootContainer">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
