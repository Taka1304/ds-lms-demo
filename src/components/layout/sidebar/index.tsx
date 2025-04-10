"use client";

import { ThemeSelector } from "@/components/layout/sidebar/theme-selector";
import { ThemeSwitcher } from "@/components/layout/sidebar/theme-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav";
import { NavUser } from "./user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="bg-primary/20 dark:bg-primary/40" {...props}>
      <SidebarHeader>
        <Link href="/students/home" className={"p-1"}>
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <ThemeSelector />
        <ThemeSwitcher />
        <SidebarSeparator className="my-2" />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
