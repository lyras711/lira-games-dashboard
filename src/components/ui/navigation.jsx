'use client'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

import { useUserSession } from '@/hooks/use-user-session';
import { signInWithGoogle, signOutWithGoogle } from '@/lib/firebase/auth';
import { createSession, removeSession } from '@/actions/auth-actions';

export function Navigation({ session }) {
  const userSessionId = useUserSession(session);

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid);
    }
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };

  if (!userSessionId) {
    return (
      <NavigationMenu className="w-full flex flex-row items-center justify-between">
        <NavigationMenuList className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <NavigationMenuItem className="p-2 md:p-4 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800/30 cursor-pointer">
            <NavigationMenuLink onClick={handleSignIn}>Sign In</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="p-2 md:p-4 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800/30 cursor-pointer">
            <NavigationMenuLink>Sign Up</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  return (
    <NavigationMenu className="w-full flex flex-row items-center justify-between">
      <NavigationMenuList className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <NavigationMenuItem className="p-2 md:p-4 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800/30 cursor-pointer">
          <NavigationMenuLink>Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="p-2 md:p-4 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800/30 cursor-pointer">
          <NavigationMenuLink>Analyitcs</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="p-2 md:p-4 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800/30 cursor-pointer">
          <NavigationMenuLink>Settings</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="p-2 md:p-4 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800/30 cursor-pointer">
          <NavigationMenuLink>Sign In</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="p-2 md:p-4 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800/30 cursor-pointer">
          <NavigationMenuLink>Sign out</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}