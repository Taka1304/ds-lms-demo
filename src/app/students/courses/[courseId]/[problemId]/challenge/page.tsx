"use client";

import { Button } from "@/components/ui/button";
import { MarkdownViewer } from "@/components/ui/markdown";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Editor from "@monaco-editor/react";
import type { Problem } from "@prisma/client";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp, Code, FileText, Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePython } from "react-py";

// TODO: dummy
const problem: Problem = {
  id: "1",
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

const testCases = [
  {
    input: ["2 7 11", "9"],
    output: ["0 1"],
  },
  {
    input: ["3 2 4", "6"],
    output: ["1 2"],
  },
  {
    input: ["3 4 3", "6"],
    output: ["0 2"],
  },
];

type Result = "AC" | "WA" | "TLE" | "RE";

type HistoryEntry = {
  code: string; // テスト実行時のコードを保存
  results: {
    input: string;
    output: string;
    result: Result;
    expect: string;
  }[];
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { runPython, sendInput, isReady, isRunning, isAwaitingInput, stderr, stdout } = usePython();
  const [viewMode, setViewMode] = useState<"tabs" | "split">("tabs");
  const [consoleExpanded, setConsoleExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("problem");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const codeRef = useRef<string | null>(null);

  const handleEditorChange = (value: string | undefined) => {
    codeRef.current = value || "";
  };

  const [currentTestIndex, setCurrentTestIndex] = useState<number | null>(null);

  useEffect(() => {
    if (currentTestIndex !== null && isAwaitingInput) {
      sendInput(testCases[currentTestIndex].input.join("\n"));
    }
  }, [isAwaitingInput, currentTestIndex, sendInput]);

  const handleRunTest = async () => {
    const code = codeRef.current;
    if (!code) return;

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      // 現在のテストケースのインデックスをセット
      setCurrentTestIndex(i);

      // `runPython()` を実行
      await runPython(code);

      const testCaseResult = {
        input: testCase.input.join("\n"),
        output: stdout || stderr,
        result: stderr ? "RE" : stdout === testCase.output.join("\n") ? "AC" : ("WA" as Result),
        expect: testCase.output.join("\n"),
      };

      // 楽観的更新 (即座に反映)
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];

        // 既存の `newHistoryEntry` が `history` にある場合は更新
        const existingEntryIndex = updatedHistory.findIndex((h) => h.code === code);
        if (existingEntryIndex !== -1) {
          updatedHistory[existingEntryIndex].results.push(testCaseResult);
        } else {
          updatedHistory.unshift({ code, results: [testCaseResult] });
        }

        return updatedHistory;
      });
    }

    setCurrentTestIndex(null);
  };

  const handleSubmit = async () => {
    const _code = codeRef.current;
    // TODO:
    // const _res = await fetch("/api/problems/submit", {
    //   method: "POST",
    //   body: JSON.stringify({ code }),
    // });
  };

  useEffect(() => {
    navigator.serviceWorker
      .register("/react-py-sw.js")
      .then((registration) => console.log("Service Worker registration successful with scope: ", registration.scope))
      .catch((err) => console.log("Service Worker registration failed: ", err));
  }, []);

  return (
    <div className="flex flex-col container mx-auto px-4 py-4 h-[100vh]">
      <main className="flex flex-1 flex-col overflow-hidden">
        <Tabs defaultValue="problem" className="flex h-full flex-col" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between border-b bg-muted/40 px-4">
            <TabsList className="h-10">
              <TabsTrigger value="problem" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                問題文
              </TabsTrigger>
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Editor
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "tabs" ? "split" : "tabs")}>
                {viewMode === "tabs" ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                <span className="">{viewMode === "tabs" ? "Split" : "Tab"}</span>
              </Button>
              <Button variant="default" size="sm">
                <Code className="h-4 w-4" />
                Run Test
              </Button>
            </div>
          </div>
          {viewMode === "tabs" ? (
            <>
              <TabsContent value="problem" className="flex-1 overflow-auto p-4">
                <h2 className="text-2xl font-bold mb-6">問題文</h2>
                <MarkdownViewer content={problem.description} />

                <h2 className="text-2xl font-bold mb-6">制約</h2>
                <MarkdownViewer content={problem.constraints} />
              </TabsContent>
              <TabsContent value="editor" className="flex-1 overflow-hidden">
                <div className="h-full bg-muted/20">
                  <Editor language="python" theme="vs-dark" onChange={handleEditorChange} />
                </div>
              </TabsContent>
            </>
          ) : (
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="overflow-auto h-full p-4">
                  <h2 className="text-2xl font-bold mb-6">問題文</h2>
                  <MarkdownViewer content={problem.description} />

                  <h2 className="text-2xl font-bold mb-6">制約</h2>
                  <MarkdownViewer content={problem.constraints} />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="overflow-hidden h-full">
                  <Editor language="python" theme="vs-dark" onChange={handleEditorChange} />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </Tabs>
      </main>

      {/* Console Section */}
      <div className={cn("border-t bg-muted/30 transition-all duration-300", consoleExpanded ? "h-[30vh]" : "h-10")}>
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-1">
          <h2 className="text-sm font-medium">出力結果</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setConsoleExpanded(!consoleExpanded)}
            className="h-7 w-7 p-0"
          >
            {consoleExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
        {consoleExpanded && (
          <div className="h-[calc(100%-28px)] overflow-auto p-4">
            <div className="space-y-2">{/* TODO: Testcases */}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
