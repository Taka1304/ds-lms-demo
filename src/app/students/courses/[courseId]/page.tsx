import { Button } from "@/components/ui/button";
// import ProblemCard from "@/features/courses/[courseId]/components/card-content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { client } from "@/lib/hono";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProblemList({ params }: { params: Promise<{ courseId: string }> }) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value || "";
  const { courseId } = await params;
  const res = await client.api.courses[":course_id"].$get(
    { param: { course_id: courseId } },
    {
      headers: {
        Cookie: `next-auth.session-token=${sessionToken}`,
      },
    },
  );

  if (!res.ok) {
    notFound();
  }

  const course = await res.json();
  const allProblems = course.problems;
  const progress = course.UserProgress.filter((p) => p.courseId === courseId).length;
  const totalProblems = allProblems.length;

  return (
    <>
      <header className="flex h-16 items-center gap-2 ease-linear bg-[#5198de] bg-opacity-40">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h2 className="text-3xl font-bold">{course.title}</h2>
        </div>
      </header>

      <div className="space-y-6 container mx-auto px-4 py-8 min-h-[100vh-60px]">
        <h2 className="text-sm font-bold text-black">問題集の進捗状況</h2>
        <div className="flex flex-row items-center space-x-4">
          <p className="text-center min-w-36 text-xl font-bold">
            {progress} / {totalProblems}問
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
        ))}
      </div>
    </>
  );
}
