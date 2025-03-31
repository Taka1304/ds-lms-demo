import { Bot, type LucideProps, SquareTerminal, Trophy } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type NavItem = {
  title: string;
  ja?: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  disabled?: boolean;
  badge?: string;
  isActive?: boolean;
  items?: (NavItem & { url: string })[];
};

export const userNavItems: NavItem[] = [
  {
    title: "Learning",
    ja: "プログラミング",
    icon: SquareTerminal,
    isActive: false,
    items: [
      {
        title: "Courses",
        ja: "コース一覧",
        url: "/students/courses",
      },
      {
        title: "Ranking",
        ja: "ランキング",
        url: "/students/ranking",
      },
    ],
  },
  {
    title: "Dashboard",
    icon: Bot,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Competitions",
    ja: "コンペティション",
    disabled: true,
    badge: "Coming Soon",
    icon: Trophy,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
];

export const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    ja: "ダッシュボード",
    icon: Bot,
    isActive: false,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Competitions",
    ja: "コンペティション",
    disabled: true,
    badge: "Coming Soon",
    icon: Trophy,
  },
  {
    title: "Courses",
    ja: "コース一覧",
    icon: SquareTerminal,
    items: [
      {
        title: "Courses",
        url: "/admin/courses",
      },
      {
        title: "Ranking",
        url: "/admin/ranking",
      },
    ],
  },
];
