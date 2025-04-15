"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Check, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

type Problem = {
  id: string;
  title: string;
  learner: number; // 学習者数
  accuracy: number; // 正答率
  average: number; // 平均点
  problemId: string; // 問題のID(cuid)
  completed: boolean; // 問題を解いたかどうか
};

function getProblems(): Problem[] {
  /*TODO:
    - この関数の引数にcourseIdを実装
    - サーバーサイドからコースの問題データをフェッチしallProblemsに格納
   */

  // ダミーデータ
  const allProblems: Problem[] = [];
  for (let i = 0; i < 10; i++) {
    allProblems.push({
      id: i.toString(),
      title: `${i}`,
      learner: 1000,
      accuracy: Math.min(90, 100), // 最大値 100
      average: Math.min(80, 100), // 最大値 100
      problemId: "uuid",
      completed: i % 2 === 0,
    });
  }
  return allProblems;
}

function getProgressValues(problems: Problem[]): {
  progress: number;
  completedProblems: number;
  totalProblems: number;
} {
  const totalProblems = problems.length;
  const completedProblems = problems.filter((problem) => problem.completed).length;
  const progress = (completedProblems / totalProblems) * 100;
  return { progress, completedProblems, totalProblems };
}

export default function ProblemList({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);

  const allProblems = getProblems();
  const { progress, completedProblems, totalProblems } = getProgressValues(allProblems);

  return (
    <>
      <header className="flex h-16 items-center gap-2 ease-linear bg-[#5198de] bg-opacity-40">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {/* TODO:日本語化 */}
          <h2 className="text-3xl font-bold">DATA ANALISYS</h2>
        </div>
      </header>

      <div className="space-y-6 container mx-auto px-4 py-8 min-h-[100vh-60px]">
        <h2 className="text-sm font-bold text-black">問題集の進捗状況</h2>
        <div className="flex flex-row items-center space-x-4">
          <p className="text-center min-w-36 text-xl font-bold">
            {completedProblems} / {totalProblems}問
          </p>
          <Image src={"/students/courses/AskingAQuestion2.png"} alt="AskingAQuestion2" width={96} height={102} />
          <Progress value={progress} />
          <Image src={"/students/courses/BeingVip.png"} alt="BeingVip" width={105} height={102} />
        </div>
        {allProblems.map((problem) => (
          <Card key={problem.id} className="flex flex-row space-around space-x-5">
            <Image
              className="p-6 min-w-min"
              src={"/students/courses/AskingAQuestion.png"}
              width={91}
              height={101}
              alt="sample"
            />
            <CardHeader className="w-full justify-around">
              <CardTitle>問題: {problem.title}</CardTitle>
              <CardDescription className="flex flex-row items-around space-x-10">
                <span>受験者数: {problem.learner}人</span>
                <span>正解率: {problem.accuracy}%</span>
                <span>平均スコア: {problem.average} 点</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 w-1/3 flex flex-col justify-center">
              {/* TODO: ヒントボタンの挙動実装 */}
              <Button className="bg-white border border-[#FF0000] rounded-none text-[#FF0000] w-full mb-3 text-xs min-h-5 max-h-7 hover:bg-gray-100 hover:font-bold">
                <TriangleAlert size={16} />
                <span>ヒント</span>
              </Button>
              <div className="relative">
                <Button asChild size="sm" className="w-full rounded-sm h-14 font-bold text-lg bg-[#5BBBE1] drop-shadow">
                  <Link href={`/students/courses/${courseId}/${problem.problemId}`}>挑戦する</Link>
                </Button>
                {problem.completed ? (
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 hover:bg-green-200">
                    <Check size={36} />
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
