"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkdownViewer } from "@/components/ui/markdown";
import { Separator } from "@/components/ui/separator";
import type { Problem } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { use } from "react";

// TODO: dummy
const problem: Problem = {
  id: "1",
  organizationId: "1",
  title: "Two Sum",
  slug: "two-sum",
  timeLimit: 3,
  memoryLimit: 1024,
  isPublic: true,
  isArchived: false,
  version: 1,
  createdById: "1",
  updatedById: "1",
  createdAt: dayjs().toDate(),
  updatedAt: dayjs().toDate(),
  description: `
整数配列 \`nums\` と整数 \`target\` が与えられたとき、

\`nums\` の中から和が \`target\` になるように選んだ2つの整数のインデックスを返してください。

選んだ2つの整数のインデックスを返してください。
  `,
  difficultyLevel: 1,
  constraints: `
- 入力は全て整数である
- 1 <= nums.length <= 10^4
`,
  submitCount: 100,
  acceptCount: 80,
};

export default function ProblemDetail({ params }: { params: Promise<{ courseId: string }> }) {
  // TODO: 問題情報を取得
  // const { data, error } = useSWR(`/api/problems/${params.courseId}`, fetcher)

  const resolvedParams = use(params);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{problem.title}</h1>
          <Button variant={"outline"}>解説を見る</Button>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 md:col-span-2">
            <p>
              実行時間制限: {problem.timeLimit} sec / メモリ制限: {problem.memoryLimit} MB
            </p>
            <h2 className="text-2xl font-bold mb-6">問題文</h2>
            <MarkdownViewer content={problem.description} />

            <h2 className="text-2xl font-bold mb-6">制約</h2>
            <MarkdownViewer content={problem.constraints} />
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">関連する問題</CardTitle>
                {/* TODO:  */}
              </CardHeader>
            </Card>
          </div>
          <Link href={`/students/courses/${resolvedParams.courseId}/${problem.id}`}>
            <Button className="w-full">挑戦する</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
