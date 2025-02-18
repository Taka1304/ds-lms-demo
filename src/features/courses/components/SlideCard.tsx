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
    <Card className="w-[255px] h-[316px] shadow-md rounded-xl mb-11">
      <div className="relative w-full h-[184px]">
        <Image src={"/courseLogo.webp"} alt={title} layout="fill" objectFit="cover" className="rounded-t-xl" />
      </div>
      <div className="flex flex-col gap-1">
        <CardHeader className="pl-3 pb-2 pt-2">
          <div className="h-[19px]">
            <CardTitle className="text-lg font-semibold leading-tight">{title}</CardTitle>
          </div>
          <div className="h-[15px] pl-3">
            <CardDescription className="text-sm text-gray-500 leading-normal">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {/* プログレスバー */}
          <div className="w-full flex center justify-between">
            <Progress value={progressValue} className="h-2 bg-gray-200 w-full" />
            <p className="w-[70px] text-[9px] text-right text-gray-500 ml-2">
              {achievementLevel} / {maxAchievementLevel} 完了
            </p>
          </div>

          {/* ボタン */}
          <div className="w-full flex justify-center">
            <Button
              className="w-[93px] h-[40px]"
              onClick={() => {
                router.push(`/students/courses/${id}`);
              }}
            >
              はじめる
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
