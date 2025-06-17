import { Bot, type LucideProps, SquareTerminal, Trophy } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type NavItem = {
  title: string;
  ja?: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  disabled?: boolean;
  badge?: string;
  defaultOpen?: boolean;
  url: string;
  items?: NavItem[];
};

export const userNavItems: NavItem[] = [
  {
    title: "Learning",
    ja: "プログラミングを学ぶ",
    url: "/students/courses",
    icon: SquareTerminal,
    defaultOpen: false,
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
    ja: "ダッシュボード",
    url: "/students",
    disabled: false,
    icon: Bot,
    items: [
      {
        title: "Top",
        ja: "トップ",
        url: "/students",
      },
    ],
  },
  {
    title: "Competitions",
    ja: "コンペティション",
    url: "/students/competitions",
    disabled: true,
    badge: "Coming Soon",
    icon: Trophy,
    items: [],
  },
];

export const adminNavItems: NavItem[] = [
  {
    title: "Courses",
    ja: "コース管理",
    icon: SquareTerminal,
    url: "/manage/courses",
    items: [
      {
        title: "Courses",
        ja: "コース一覧",
        url: "/manage/courses",
      },
    ],
  },
  {
    title: "Dashboard",
    ja: "ダッシュボード",
    icon: Bot,
    url: "/manage/dashboard",
    defaultOpen: false,
    items: [
      {
        title: "Top",
        ja: "トップ",
        url: "/manage/dashboard",
      },
    ],
  },
  {
    title: "Competitions",
    ja: "コンペティション管理",
    url: "/manage/competitions",
    disabled: true,
    badge: "Coming Soon",
    icon: Trophy,
  },
];
