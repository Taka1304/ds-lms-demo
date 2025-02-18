"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useRouter } from "next/navigation";

type SlideCardProps = {
  id: number;
  title: string;
  description: string;
  achievementLevel: number;
  maxAchievementLevel: number;
};

export default function SlideCard({ id, title, description, achievementLevel, maxAchievementLevel }: SlideCardProps) {
  const router = useRouter();
  // 達成度の計算（%）
  const progressValue = (achievementLevel / maxAchievementLevel) * 100;

  return (
    <Card className="w-[280px] shadow-md rounded-xl">
      <div className="relative w-full h-[150px]">
        <Image src={"/courseLogo.webp"} alt={title} layout="fill" objectFit="cover" className="rounded-t-xl" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* プログレスバー */}
        <div className="mt-2">
          <Progress value={progressValue} className="h-2 bg-gray-200" />
          <p className="text-xs text-gray-500 mt-1">
            {achievementLevel} / {maxAchievementLevel} 完了
          </p>
        </div>
        <Button
          className="mt-4 w-full"
          onClick={() => {
            router.push(`/students/courses/${id}`);
          }}
        >
          はじめる
        </Button>
      </CardContent>
    </Card>
  );
}
