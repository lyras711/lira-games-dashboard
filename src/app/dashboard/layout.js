import { Space_Grotesk } from "next/font/google";

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/constants'; // added

import { Navigation } from "@/components/ui/navigation";


export default function RootLayout({ children }) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return (
    <main className="min-h-screen flex flex-col items-center p-4 sm:p-8 lg:p-12 xl:p-16">
      <Navigation session={session} />
      <div className="flex flex-col items-center justify-center p-4 lg:p-6 space-y-6">
        {children}
      </div>
    </main>
  );
}
