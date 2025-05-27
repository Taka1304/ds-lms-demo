"use client";

import { adminNavItems, userNavItems } from "@/components/layout/sidebar/const";
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
import { $Enums } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav";
import { NavUser } from "./user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === $Enums.SystemRole.ADMIN;

  return (
    <Sidebar collapsible="icon" className="bg-primary/20 dark:bg-primary/40" {...props}>
      <SidebarHeader>
        <Link href={isAdmin ? "/manage" : "/students"} className={"p-1"}>
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={userNavItems} label={"コンテンツ"} />
        {isAdmin && (
          <>
            <div className="my-2 border-b border-border" />
            <NavMain items={adminNavItems} label={"管理者メニュー"} />
          </>
        )}
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
