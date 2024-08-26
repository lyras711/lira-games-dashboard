'use client'
import { useUserSession } from '@/hooks/use-user-session';
import { signInWithGoogle, signOutWithGoogle } from '@/lib/firebase/auth';
import { createSession, removeSession } from '@/actions/auth-actions';
import Image from "next/image";
import { Button } from '@/components/ui/button';

export default function Home() {

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid)
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center ">
        <iframe className="absolute height-[120vh] width-[100vw] z-0 opacity-[0.85]" src='https://my.spline.design/backlightbgeffect-66427a5083de27f8db8ed673ddf6d492/' frameborder='0' width='100%' height='100%'></iframe>
        <div className="z-10 flex min-h-screen flex-col items-center justify-center space-y-8 p-24 pointer-events-none">
          <h1 className="font-bold text-4xl">Play Smart, Create Big, Earn Bigger</h1>
          <Button onClick={handleSignIn} className="text-lg min-w-[200px] pointer-events-auto">Sign In</Button>
        </div>
    </main>
  );
}
5639
4745