import { Toaster } from 'sonner';
import { PropsWithChildren } from 'react';
import { Poppins } from 'next/font/google';
import { NextAuthProvider } from '@/context/NextAuthProvider';
import { GraphQlProvider } from '@/context/GraphQlProvider';

import './globals.css';

const font = Poppins({ weight: ['400', '600'], subsets: ['latin'] });

export const metadata = {
  title: 'Task Flow',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={`${font.className} min-h-screen bg-neutral-100`}>
        <NextAuthProvider>
          <GraphQlProvider>
            <Toaster richColors duration={2000} />
            {children}
          </GraphQlProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
