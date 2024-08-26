'use client'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

import { useUserSession } from '@/hooks/use-user-session';
import { signInWithGoogle, signOutWithGoogle } from '@/lib/firebase/auth';
import { createSession, removeSession } from '@/actions/auth-actions';
import { usePathname } from 'next/navigation'

export function Navigation({ session }) {
  const userSessionId = useUserSession(session);
  const activeLink = usePathname().split('/')[1];

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid)
    }
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };
  console.log(userSessionId)
  return (
    <NavigationMenu className="fixed top-0 left-0 min-w-[100%] w-full flex flex-row items-center justify-center lg:p-2 border-b border-border bg-background">
      <NavigationMenuList className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <NavigationMenuItem className={`p-2 md:p-4 rounded-sm hover:bg-neutral-800/60 dark:hover:bg-neutral-800/30 cursor-pointer ${activeLink === 'dashboard' && 'bg-neutral-800/60'}`}>
          <NavigationMenuLink href="/dashboard" >Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        {/* <NavigationMenuItem className={`p-2 md:p-4 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800/30 cursor-pointer ${activeLink === 'analytics' && 'bg-neutral-800/60'}`}>
          <NavigationMenuLink>Analyitcs</NavigationMenuLink>
        </NavigationMenuItem> */}
        <NavigationMenuItem className={`p-2 md:p-4 rounded-sm hover:bg-neutral-800/60 dark:hover:bg-neutral-800/30 cursor-pointer ${activeLink === 'settings' && 'bg-neutral-800/60'}`}>
          <NavigationMenuLink href="/settings">Settings</NavigationMenuLink>
        </NavigationMenuItem>
        {!userSessionId && (
          <NavigationMenuItem className={`p-2 md:p-4 rounded-sm hover:bg-neutral-800/60 dark:hover:bg-neutral-800/30 cursor-pointer ${activeLink === 'signin' && 'bg-neutral-800/60'}`}>
            <NavigationMenuLink onClick={handleSignIn}>Sign In</NavigationMenuLink>
          </NavigationMenuItem>
        )}
        {userSessionId && (
          <NavigationMenuItem className={`p-2 md:p-4 rounded-sm hover:bg-neutral-800/60 dark:hover:bg-neutral-800/30 cursor-pointer ${activeLink === 'signout' && 'bg-neutral-800/60'}`}>
            <NavigationMenuLink onClick={handleSignOut}>Sign out</NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}