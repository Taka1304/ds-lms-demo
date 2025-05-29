"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { User } from "lucide-react";
import type { Session } from "next-auth";

type UserGreetingProps = {
  user?: Session["user"];
};

const getGreeting = () => {
  const hour = dayjs().hour();
  if (hour >= 5 && hour < 12) {
    return "おはようございます";
  }
  if (hour >= 12 && hour < 18) {
    return "こんにちは";
  }
  return "こんばんは";
};

export function UserGreeting({ user }: UserGreetingProps) {
  const greeting = getGreeting();
  const userName = user?.displayName || user?.name || "ユーザー";

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-12 w-12">
        {user?.image ? (
          <>
            <AvatarImage src={user.image} alt={userName} />
            <AvatarFallback>{userName.slice(0, 1)}</AvatarFallback>
          </>
        ) : (
          <User className="h-12 w-12 text-muted-foreground" />
        )}
      </Avatar>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {greeting}、{userName}さん
        </h2>
        <p className="text-muted-foreground">今日も学習を続けましょう！</p>
      </div>
    </div>
  );
}
