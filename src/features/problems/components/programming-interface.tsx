"use client";

import { MarkdownViewer } from "@/components/ui/markdown";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActionBar } from "@/features/problems/components/action-bar";
import { client } from "@/lib/hono";
import { Editor } from "@monaco-editor/react";
import type { InferResponseType } from "hono";
import { Code, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { PythonProvider } from "react-py";
import type { Packages } from "react-py/dist/types/Packages";
import { ConsoleView } from "../components/console-view";
import { PythonExecutionProvider } from "../components/python-execution-provider";

const packages: Packages = {
  official: ["numpy"],
  micropip: [],
};

const req = client.api.courses.problems[":problem_id"].$get;

type Props = {
  problem: InferResponseType<typeof req, 200>;
};

export default function ProgrammingInterface({ problem }: Props) {
  const [viewMode, setViewMode] = useState<"tabs" | "split">("tabs");
  const [consoleExpanded, setConsoleExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("problem");
  const codeRef = useRef<string | null>(null);

  const handleEditorChange = (value: string | undefined) => {
    codeRef.current = value || "";
  };

  return (
    <PythonProvider packages={packages}>
      <PythonExecutionProvider testCases={problem.testCases} timeLimit={problem.timeLimit * 1000}>
        {({ isRunning, isReady, executionHistories, activeHistoryIndex, runCode, setActiveHistoryIndex }) => (
          <div className="flex h-screen flex-col overflow-hidden p-4">
            {/* Main Content Area */}
            <main className="flex flex-1 flex-col overflow-hidden">
              <Tabs
                defaultValue="problem"
                className="flex h-full flex-col"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <div className="flex items-center justify-between border-b bg-muted/40 px-4">
                  <TabsList className="h-10">
                    <TabsTrigger value="problem" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      問題
                    </TabsTrigger>
                    <TabsTrigger value="editor" className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Code
                    </TabsTrigger>
                  </TabsList>
                  <ActionBar
                    viewMode={viewMode}
                    isRunning={isRunning}
                    isReady={isReady}
                    onToggleViewMode={() => setViewMode((prev) => (prev === "tabs" ? "split" : "tabs"))}
                    onRunCode={() => runCode(codeRef.current || "")}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  {viewMode === "tabs" ? (
                    <>
                      <TabsContent value="problem" className="flex-1 overflow-auto px-4">
                        <h2 className="text-2xl font-bold mt-2">問題</h2>
                        <MarkdownViewer content={problem.description} />

                        <h2 className="text-2xl font-bold mt-2">制約</h2>
                        <MarkdownViewer content={problem.constraints} />
                      </TabsContent>
                      <TabsContent value="editor" className="flex-1 overflow-hidden">
                        <Editor
                          value={codeRef.current || ""}
                          language="python"
                          theme="vs-dark"
                          onChange={handleEditorChange}
                          className="h-full"
                        />
                      </TabsContent>
                    </>
                  ) : (
                    <ResizablePanelGroup direction="horizontal" className="flex-1">
                      <ResizablePanel defaultSize={50} minSize={30}>
                        <div className="overflow-auto h-full px-4 py-2">
                          <h2 className="text-2xl font-bold mt-2">問題</h2>
                          <MarkdownViewer content={problem.description} />

                          <h2 className="text-2xl font-bold mt-2">制約</h2>
                          <MarkdownViewer content={problem.constraints} />
                        </div>
                      </ResizablePanel>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize={50} minSize={30}>
                        <Editor
                          value={codeRef.current || ""}
                          language="python"
                          theme="vs-dark"
                          onChange={handleEditorChange}
                          className="h-full"
                        />
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  )}
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
