import { Space_Grotesk } from "next/font/google";

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/constants'; // added

import "./globals.css";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "Li.Ra Games Dashboard",
  description: "Dashboard for Li.Ra Games",
};


export default async function RootLayout({ children }) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return (
    <html lang="en" className="dark">
      <body className={space_grotesk.className}>
        {children}
      </body>
    </html>
  );
}
