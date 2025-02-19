import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

type SlideCardProps = {
  id: number;
  title: string;
  description: string;
  achievementLevel: number;
  maxAchievementLevel: number;
};

// カードコンポーネント
export default function SlideCard({ id, title, description, achievementLevel, maxAchievementLevel }: SlideCardProps) {
  const progressValue = (achievementLevel / maxAchievementLevel) * 100;

  return (
    <Card className="w-full max-w-[255px] shadow-md rounded-[36px] mb-11">
      <div className="relative w-full h-[184px]">
        <Image src={"/courseLogo.webp"} alt={title} layout="fill" objectFit="cover" className="rounded-t-[36px]" />
      </div>

      <CardHeader className="pl-3 pb-2 pt-2">
        <CardTitle className="text-lg font-semibold leading-tight">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-500 leading-normal">{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        {/* プログレスバー */}
        <div className="w-full flex items-center justify-between">
          <Progress value={progressValue} className="h-2 bg-gray-200 w-full" />
          <p className="min-w-[50px] max-w-[70px] text-[9px] text-right text-gray-500 ml-2">
            {achievementLevel} / {maxAchievementLevel} 完了
          </p>
        </div>

        {/* ボタン */}
        <div className="w-full flex justify-center mt-2">
          <Link href={`/students/courses/${id}`}>
            <Button className="w-[93px] h-[40px]">はじめる</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
