import { Space_Grotesk } from "next/font/google";

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/constants'; // added

import "./globals.css";
import { Navigation } from "@/components/ui/navigation";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "Li.Ra Games Dashboard",
  description: "Dashboard for Li.Ra Games",
};


export default function RootLayout({ children }) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return (
    <html lang="en">
      <body className={space_grotesk.className}>
        <main className="min-h-screen flex flex-col items-center p-4 sm:p-8 lg:p-12 xl:p-16">
          <Navigation session={session} />
          {children}
        </main>
      </body>
    </html>
  );
}
