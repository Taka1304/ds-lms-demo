"use client";

import ThemeEditor from "@/components/ui/editor";
import { MarkdownViewer } from "@/components/ui/markdown";
import NavGuardDialog from "@/components/ui/nav-guard-dialog";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActionBar } from "@/features/problems/components/action-bar";
import { useStartTimeTracker } from "@/hooks/use-start-time-tracker";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
import { Code, FileText, SquareSplitHorizontal } from "lucide-react";
import { useNavigationGuard } from "next-navigation-guard";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { PythonProvider } from "react-py";
import type { Packages } from "react-py/dist/types/Packages";
import { toast } from "sonner";
import { ConsoleView } from "../components/console-view";
import { PythonExecutionProvider } from "../components/python-execution-provider";

const packages: Packages = {
  official: ["numpy", "pandas"],
  micropip: [],
};

const req = client.api.courses.problems[":problem_id"].$get;

type Props = {
  problem: InferResponseType<typeof req, 200>;
  mode?: "debug" | "challenge";
};

export default function ProgrammingInterface({ problem, mode = "challenge" }: Props) {
  const [consoleExpanded, setConsoleExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("split");
  const codeRef = useRef<string | null>(problem.defaultCode || null);
  const runCodeRef = useRef<(() => void) | null>(null);

  const [enabled, setEnabled] = useState(false);
  const navGuard = useNavigationGuard({ enabled });
  const router = useRouter();
  const { getStartedAt, clearStartedAt } = useStartTimeTracker(problem.id, mode);

  const handleEditorChange = (value: string | undefined) => {
    codeRef.current = value || "";
    if (!enabled) setEnabled(true);
  };

  const onSubmitCode = async () => {
    const toastId = toast.loading("提出しています...");
    const startedAt = getStartedAt();

    const res = await client.api.courses.problems[":problem_id"].submit.$post({
      param: {
        problem_id: problem.id,
      },
      json: {
        code: codeRef.current || "",
        startedAt: startedAt,
      },
    });

    if (res.status !== 200) {
      toast.error("提出に失敗しました", { id: toastId });
      console.error("Error submitting code:", res.statusText);
      return;
    }

    const submissionId = (await res.json()).id;
    clearStartedAt();
    setEnabled(false);
    toast.success("提出しました! 評価ページに遷移します", { id: toastId });
    // 1秒後に評価ページへ遷移
    setTimeout(() => {
      router.push(`/students/courses/${problem.courseId}/${problem.id}/${submissionId}`);
    }, 1000);
  };

  const handlecopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault(); //デフォルトのコピー無効
    const copyText = window.getSelection()?.toString() || ""; //コピー内容取得
    const addHintText = "この問題に対して、正解を出さずにヒントのみを提示してください。";
    console.log(e);
    e.clipboardData.setData("text/plain", copyText + addHintText);
  };

  return (
    <>
      <PythonProvider packages={packages}>
        <PythonExecutionProvider testCases={problem.testCases} timeLimit={problem.timeLimit * 1000}>
          {({ isRunning, isReady, executionHistories, activeHistoryIndex, runCode, setActiveHistoryIndex }) => {
            runCodeRef.current = () => {
              if (isReady && !isRunning) {
                runCode(codeRef.current || "");
              }
            };
            return (
              <div className="flex h-screen flex-col overflow-hidden py-2">
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
                        mode={mode}
                        isRunning={isRunning}
                        isReady={isReady}
                        onRunCode={() => runCode(codeRef.current || "")}
                        recentHistory={executionHistories[0]}
                        onSubmitCode={onSubmitCode}
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      {/* 問題タブ */}
                      <TabsContent onCopy={handlecopy} value="problem" className="flex-1 overflow-auto px-4">
                        <h2 className="text-2xl font-bold mt-2">問題</h2>
                        <MarkdownViewer content={problem.description} className="p-4" />
                        <h2 className="text-2xl font-bold mt-2">制約</h2>
                        <MarkdownViewer content={problem.constraints} className="p-4" />
                      </TabsContent>

                      {/* エディタタブ */}
                      <TabsContent value="editor" className="flex-1 overflow-hidden">
                        <ThemeEditor
                          value={codeRef.current || ""}
                          language="python"
                          className="h-full"
                          onChange={handleEditorChange}
                          onMount={(editor, monaco) => {
                            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () =>
                              runCodeRef.current?.(),
                            );
                          }}
                        />
                      </TabsContent>

                      {/* 分割ビュー */}
                      <TabsContent value="split" className="flex-1">
                        <ResizablePanelGroup direction="horizontal" className="flex-1">
                          <ResizablePanel defaultSize={50} minSize={30}>
                            <div onCopy={handlecopy} className="overflow-auto h-full px-4">
                              <h2 className="text-2xl font-bold mt-2">問題</h2>
                              <MarkdownViewer content={problem.description} className="p-4" />
                              <h2 className="text-2xl font-bold mt-2">制約</h2>
                              <MarkdownViewer content={problem.constraints} className="p-4" />
                            </div>
                          </ResizablePanel>
                          <ResizableHandle withHandle />
                          <ResizablePanel defaultSize={50} minSize={30}>
                            <ThemeEditor
                              value={codeRef.current || ""}
                              language="python"
                              className="h-full"
                              onChange={handleEditorChange}
                              onMount={(editor, monaco) => {
                                editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () =>
                                  runCodeRef.current?.(),
                                );
                              }}
                            />
                          </ResizablePanel>
                        </ResizablePanelGroup>
                      </TabsContent>
                    </div>
                  </Tabs>
                </main>

                <ConsoleView
                  histories={executionHistories}
                  activeHistoryIndex={activeHistoryIndex}
                  isExpanded={consoleExpanded}
                  onToggleExpand={() => setConsoleExpanded(!consoleExpanded)}
                  onSelectHistory={setActiveHistoryIndex}
                />
              </div>
            );
          }}
        </PythonExecutionProvider>
      </PythonProvider>
      <NavGuardDialog open={enabled && navGuard.active} onCancel={navGuard.reject} onAccept={navGuard.accept} />
    </>
  );
}
