import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "Li.Ra Games Dashboard",
  description: "Dashboard for Li.Ra Games",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={space_grotesk.className}>
        <main className="flex flex-col items-center p-4 sm:p-8 lg:p-12 xl:p-16">
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
                <NavigationMenuLink>Sign out</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {children}
        </main>
      </body>
    </html>
  );
}
