import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";

export function MarkdownViewer({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn(className)}>
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} className={cn(className)}>
        {content}
      </Markdown>
    </div>
  );
}
