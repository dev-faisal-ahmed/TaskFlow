import { Toaster } from 'sonner';

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Poppins } from 'next/font/google';
import './globals.css';

const font = Poppins({ weight: ['400', '600'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Flow',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={`${font.className} min-h-screen bg-neutral-100`}>
        <Toaster richColors duration={2000} />
        {children}
      </body>
    </html>
  );
}
