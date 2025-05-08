"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <header className="flex h-16 items-center gap-2 ease-linear bg-primary/20 dark:bg-primary/40">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </header>
  );
}
