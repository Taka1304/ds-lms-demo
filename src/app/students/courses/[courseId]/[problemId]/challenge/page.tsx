"use client";

import { Button } from "@/components/ui/button";
import { MarkdownViewer } from "@/components/ui/markdown";
import { Separator } from "@/components/ui/separator";
import Editor from "@monaco-editor/react";
import type { Problem } from "@prisma/client";
import dayjs from "dayjs";
import { useRef } from "react";

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

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  // NOTE: 不要なレンダリング防止のためuseStateを使わない
  const codeRef = useRef<string | null>(null);

  const handleEditorChange = (value: string | undefined) => {
    codeRef.current = value || "";
  };

  const handleSubmit = async () => {
    const _code = codeRef.current;
    // TODO:
    // const _res = await fetch("/api/problems/submit", {
    //   method: "POST",
    //   body: JSON.stringify({ code }),
    // });
  };

  return (
    <div className="flex flex-col container mx-auto px-4 py-8 min-h-[calc(100vh-60px)]">
      <h1 className="text-3xl font-bold">{problem.title}</h1>
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

          <h2 className="text-2xl font-bold mb-6">提出</h2>
          <div className="w-full h-96">
            <Editor language="python" theme="vs-dark" onChange={handleEditorChange} />
          </div>

          <Button className="mt-4" onClick={handleSubmit}>
            提出
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
