"use client";

import ThemeEditor from "@/components/ui/editor";
import { MarkdownViewer } from "@/components/ui/markdown";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActionBar } from "@/features/problems/components/action-bar";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
import { Code, FileText, SquareSplitHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { PythonProvider } from "react-py";
import type { Packages } from "react-py/dist/types/Packages";
import { ConsoleView } from "../components/console-view";
import { PythonExecutionProvider } from "../components/python-execution-provider";

const packages: Packages = {
  official: ["numpy", "pandas", "matplotlib"],
  micropip: [],
};

const req = client.api.courses.problems[":problem_id"].$get;

type Props = {
  problem: InferResponseType<typeof req, 200>;
};

export default function ProgrammingInterface({ problem }: Props) {
  const [consoleExpanded, setConsoleExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("split");
  const codeRef = useRef<string | null>(null);
  const router = useRouter();

  const handleEditorChange = (value: string | undefined) => {
    codeRef.current = value || problem.defaultCode || "";
  };

  const onSubmitCode = async () => {
    // TODO: トースト表示

    const res = await client.api.courses.problems[":problem_id"].submit.$post({
      param: {
        problem_id: problem.id,
      },
      json: {
        code: codeRef.current || problem.defaultCode || "",
      },
    });

    if (res.status !== 200) {
      console.error("Error submitting code:", res.statusText);
      return;
    }
    const submissionId = (await res.json()).id;
    console.log("Submission ID:", submissionId);
    router.push(`/students/courses/${problem.courseId}/${problem.id}/${submissionId}`);
  };

  return (
    <PythonProvider packages={packages}>
      <PythonExecutionProvider testCases={problem.testCases} timeLimit={problem.timeLimit * 1000}>
        {({ isRunning, isReady, executionHistories, activeHistoryIndex, runCode, setActiveHistoryIndex }) => (
          <div className="flex h-screen flex-col overflow-hidden py-2">
            {/* Main Content Area */}
            <main className="flex flex-1 flex-col overflow-hidden">
              <Tabs
                defaultValue="problem"
                className="flex h-full flex-col"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <div className="flex items-center justify-between border-b bg-muted/40 px-4">
                  <span>
                    <TabsList className="h-10">
                      <TabsTrigger value="problem" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        問題
                      </TabsTrigger>
                      <TabsTrigger value="editor" className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        コード
                      </TabsTrigger>
                      <TabsTrigger value="split" className="flex items-center gap-2">
                        <SquareSplitHorizontal className="h-4 w-4" />
                        分割
                      </TabsTrigger>
                    </TabsList>
                  </span>
                  <ActionBar
                    isRunning={isRunning}
                    isReady={isReady}
                    onRunCode={() => runCode(codeRef.current || problem.defaultCode || "")}
                    recentHistory={executionHistories[0]}
                    onSubmitCode={onSubmitCode}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <TabsContent value="problem" className="flex-1 overflow-auto px-4">
                    {/* TODO: 内容 */}
                    <h2 className="text-2xl font-bold mt-2">問題</h2>
                    <MarkdownViewer content={problem.description} />

                    <h2 className="text-2xl font-bold mt-2">制約</h2>
                    <MarkdownViewer content={problem.constraints} />
                  </TabsContent>
                  <TabsContent value="editor" className="flex-1 overflow-hidden">
                    {/* TODO: themeのカスタマイズ */}
                    <ThemeEditor
                      value={codeRef.current || problem.defaultCode || ""}
                      language="python"
                      onChange={handleEditorChange}
                      className="h-full"
                    />
                  </TabsContent>
                  <TabsContent value="split" className="flex-1">
                    <ResizablePanelGroup direction="horizontal" className="flex-1">
                      <ResizablePanel defaultSize={50} minSize={30}>
                        <div className="overflow-auto h-full px-4">
                          <h2 className="text-2xl font-bold mt-2">問題</h2>
                          <MarkdownViewer content={problem.description} />

                          <h2 className="text-2xl font-bold mt-2">制約</h2>
                          <MarkdownViewer content={problem.constraints} />
                        </div>
                      </ResizablePanel>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize={50} minSize={30}>
                        {/* TODO: themeのカスタマイズ */}
                        <ThemeEditor
                          value={codeRef.current || problem.defaultCode || ""}
                          language="python"
                          onChange={handleEditorChange}
                          className="h-full"
                        />
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </TabsContent>
                </div>
              </Tabs>
            </main>

            {/* Console Section */}
            <ConsoleView
              histories={executionHistories}
              activeHistoryIndex={activeHistoryIndex}
              isExpanded={consoleExpanded}
              onToggleExpand={() => setConsoleExpanded(!consoleExpanded)}
              onSelectHistory={setActiveHistoryIndex}
            />
          </div>
        )}
      </PythonExecutionProvider>
    </PythonProvider>
  );
}
