import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Problem } from "@/features/courses/[courseId]/types/problems";
import Image from "next/image";
import Link from "next/link";

interface Props {
  problem: Problem;
  courseId: string;
}

export default function ProblemCard({ problem, courseId }: Props) {
  return (
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
          <span>{problem.description}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 w-1/3 flex flex-col justify-center">
        <div className="relative">
          <Button asChild size="sm" className="w-full rounded-sm h-14 font-bold text-lg bg-[#5BBBE1] drop-shadow">
            <Link href={`/students/courses/${courseId}/${problem.id}`}>挑戦する</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
