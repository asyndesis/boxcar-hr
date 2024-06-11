import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SignOutButton } from "@clerk/nextjs";
import Breadcrumbs from "@/components/breadcrumbs";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { SidebarDesktop, SidebarMobile } from "@/components/sidebar";
import { currentUser } from "@clerk/nextjs/server";

export default async function MainLayout(props: { children: React.ReactNode }) {
  const user = await currentUser();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarDesktop />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarMobile />
          <Breadcrumbs />
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src={user?.imageUrl ?? ""}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOutButton>Sign out</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggleButton />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {props.children}
        </main>
      </div>
    </div>
  );
}
