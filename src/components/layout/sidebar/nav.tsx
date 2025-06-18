"use client";

import type { NavItem } from "@/components/layout/sidebar/const";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function NavMain({ items, label }: { items: NavItem[]; label: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.defaultOpen} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.ja || item.title} disabled={item.disabled}>
                  {item.icon && (
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                    </Link>
                  )}
                  <div className="relative overflow-hidden flex-1">
                    <div className="flex flex-row transition-transform duration-300 ease-in-out hover:-translate-x-full">
                      <span className="truncate min-w-full">{item.title}</span>
                      <span className="truncate min-w-full text-primary">{item.ja || item.title}</span>
                    </div>
                  </div>
                  {item.badge && <Badge>{item.badge}</Badge>}
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <div className="relative overflow-hidden flex-1">
                            <div className="flex flex-row transition-transform duration-300 ease-in-out hover:-translate-x-full">
                              <span className="truncate min-w-full">{subItem.title}</span>
                              <span className="truncate min-w-full text-primary">{subItem.ja || subItem.title}</span>
                            </div>
                          </div>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
