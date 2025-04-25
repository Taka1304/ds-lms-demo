"use client";

import { Editor, type EditorProps } from "@monaco-editor/react";
import { useTheme } from "next-themes";

/**
 * @description テーマを反映したエディタコンポーネント
 */
const ThemeEditor = ({ ...props }: EditorProps) => {
  const theme = useTheme();
  return <Editor theme={theme.resolvedTheme === "dark" ? "vs-dark" : "light"} {...props} />;
};

export default ThemeEditor;
