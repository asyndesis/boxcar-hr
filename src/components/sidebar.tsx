"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home, Settings, Users2, Package2, PanelLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export const SIDEBAR_LINKS = [
  {
    href: "/dashboard",
    icon: Home,
    title: "Dashboard",
  },
  {
    href: "/users",
    icon: Users2,
    title: "Users",
  },
  {
    href: "#",
    icon: Settings,
    title: "Settings",
    classes: "mt-auto",
  },
];

export const SidebarDesktop = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex ">
      <nav className="flex flex-grow flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {SIDEBAR_LINKS.map(({ title, href, icon: Icon, classes }) => (
          <Tooltip key={title}>
            <TooltipTrigger asChild>
              <Link
                href={href}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  classes,
                  { "bg-accent text-accent-foreground ": pathname === href },
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{title}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
};

export const SidebarMobile = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {SIDEBAR_LINKS.map(({ title, href, icon: Icon, classes }) => (
            <Link
              key={title}
              href={href}
              className={cn(
                "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                classes,
                { "text-foreground": pathname === href },
              )}
            >
              <Icon className="h-5 w-5" />
              {title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

// bg-accent text-accent-foreground
