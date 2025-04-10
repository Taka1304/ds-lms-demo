"use client";

import { Check, Palette } from "lucide-react";
import { useEffect, useState } from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const themes = [
  {
    name: "zinc",
    label: "Zinc",
    activeColor: "bg-zinc-500",
  },
  {
    name: "red",
    label: "Red",
    activeColor: "bg-red-500",
  },
  {
    name: "rose",
    label: "Rose",
    activeColor: "bg-rose-500",
  },
  {
    name: "orange",
    label: "Orange",
    activeColor: "bg-orange-500",
  },
  {
    name: "green",
    label: "Green",
    activeColor: "bg-green-500",
  },
  {
    name: "blue",
    label: "Blue",
    activeColor: "bg-blue-500",
  },
  {
    name: "yellow",
    label: "Yellow",
    activeColor: "bg-yellow-500",
  },
  {
    name: "violet",
    label: "Violet",
    activeColor: "bg-violet-500",
  },
];

export function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const [activeTheme, setActiveTheme] = useState("zinc");
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // クライアントサイドでのみ実行されるようにする
  useEffect(() => {
    setMounted(true);
    // ローカルストレージからテーマを取得
    const savedTheme = localStorage.getItem("color-theme");
    if (savedTheme) {
      setActiveTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  // テーマを変更する関数
  const changeColorTheme = (theme: string) => {
    setActiveTheme(theme);
    localStorage.setItem("color-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  if (!mounted) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton tooltip="カラーテーマを選択">
              <Palette className="h-[1.2rem] w-[1.2rem]" />
              <span>カラーテーマ</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={isCollapsed ? "center" : "end"}
            side={isCollapsed ? "right" : "bottom"}
            className="w-56"
          >
            <div className="grid grid-cols-3 gap-2 p-2">
              {themes.map((theme) => (
                <button
                  type="button"
                  key={theme.name}
                  className={cn(
                    "flex h-8 w-full items-center justify-between rounded-md px-2 text-sm font-medium",
                    theme.activeColor,
                    activeTheme === theme.name ? "border-2 border-white dark:border-gray-800" : "hover:opacity-90",
                  )}
                  onClick={() => changeColorTheme(theme.name)}
                >
                  {activeTheme === theme.name && <Check className="h-4 w-4 text-white" />}
                </button>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
