"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton tooltip="テーマを切り替える">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>テーマ切替</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isCollapsed ? "center" : "end"} side={isCollapsed ? "right" : "bottom"}>
            <DropdownMenuItem onClick={() => setTheme("light")}>ライト</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>ダーク</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>システム</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
