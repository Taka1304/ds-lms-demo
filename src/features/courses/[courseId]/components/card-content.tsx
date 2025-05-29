import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
import Image from "next/image";
import Link from "next/link";

const req = client.api.courses[":course_id"].$get;

export type Props = {
  courseId: string;
  problem: InferResponseType<typeof req, 200>["problems"][number];
};

export default function ProblemCard({ courseId, problem }: Props) {
  return (
    <Card className="flex flex-row justify-around space-x-5">
      <Image
        className="p-6 min-w-min"
        src={"/students/courses/AskingAQuestion.svg"}
        width={91}
        height={101}
        alt="sample"
      />
      <CardHeader className="w-full justify-around">
        <CardTitle>{problem.title}</CardTitle>
        <CardDescription className="flex flex-row items-center space-x-10">
          <span>{problem.description}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 w-1/3 flex flex-col justify-center">
        <div className="relative">
          <Button asChild size="sm" className="w-full rounded-sm h-14 font-bold text-lg drop-shadow">
            <Link href={`/students/courses/${courseId}/${problem.id}`}>詳細を見る</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
