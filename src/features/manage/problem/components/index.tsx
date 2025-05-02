"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MarkdownViewer } from "@/components/ui/markdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { formSchema } from "../types/schema";

const difficultyLevels = [
  { value: 1, label: "簡単" },
  { value: 2, label: "普通" },
  { value: 3, label: "難しい" },
];

export default function ProblemCreator({ courseId }: { courseId: string }) {
  const toast = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      problemStatement: "",
      defaultCode: "",
      difficultyLevel: 1,
      constraints: "",
      testCases: [
        { input: "", expectedOutput: "", isSample: true, isHidden: false },
        { input: "", expectedOutput: "", isSample: false, isHidden: true },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "testCases",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.toast({
      title: "問題を作成中...",
      description: "しばらくお待ちください",
    });
    // ここで問題をAPIに送信する処理を実装
    const res = await client.api.courses.problems.$post({
      json: {
        title: values.title,
        description: values.problemStatement,
        constraints: values.constraints,
        slug: "",
        defaultCode: values.defaultCode,
        difficultyLevel: values.difficultyLevel,
        timeLimit: 3,
        memoryLimit: 1024,
        isPublic: false, // この時点では公開しない
        isArchived: false,
        courseId: courseId,
        testCases: values.testCases.map((testCase) => ({
          input: testCase.input,
          output: testCase.expectedOutput,
          isSample: testCase.isSample,
          isHidden: testCase.isHidden,
        })),
      },
    });

    if (res.ok) {
      toast.toast({
        title: "問題を作成しました",
        description: "問題の詳細ページに移動します",
      });

      // 1秒後にリダイレクト
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await res.json();
      router.push(`/manage/courses/${courseId}/${data.id}/debug`);
    }

    toast.toast({
      variant: "destructive",
      title: "問題の作成に失敗しました",
      description: "もう一度お試しください",
    });
  }

  const watchProblemStatement = form.watch("problemStatement");
  const watchConstraints = form.watch("constraints");

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">プログラミング問題作成</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8">
            <div className="flex items-start justify-between gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-9/12">
                    <FormLabel>問題タイトル</FormLabel>
                    <FormControl>
                      <Input placeholder="例: 二分探索の実装" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficultyLevel"
                render={({ field }) => (
                  <FormItem className="w-2/12">
                    <FormLabel>難易度</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level.value} value={String(level.value)}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">問題文と制約</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 編集エリア */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="problemStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>問題文</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="# 問題文をMarkdownで記述してください"
                            className="min-h-[200px] font-mono"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Markdownを使用して問題文を記述できます</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="constraints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>制約</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="$$
- 1 ≤ N ≤ 10^5
- 1 ≤ A_i ≤ 10^9
$$"
                            className="min-h-[150px] font-mono"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>問題の制約条件を記述してください</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* プレビューエリア */}
                <div>
                  <h3 className="text-lg font-medium mb-2">プレビュー</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose max-w-none dark:prose-invert">
                        <h2 className="text-2xl">問題文</h2>
                        <MarkdownViewer content={watchProblemStatement} className="p-4" />

                        {watchConstraints && (
                          <>
                            <h2 className="text-2xl">制約</h2>
                            <MarkdownViewer content={watchConstraints} className="p-4" />
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">テストケース</h2>

              <div className="space-y-6">
                {fields.map((field, index) => (
                  <Card key={field.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">テストケース {index + 1}</h3>
                        {fields.length > 2 && (
                          <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4">
                        <FormField
                          control={form.control}
                          name={`testCases.${index}.input`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>入力</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="5
1 2 3 4 5"
                                  className="font-mono"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`testCases.${index}.expectedOutput`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>期待する出力</FormLabel>
                              <FormControl>
                                <Textarea placeholder="15" className="font-mono" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex space-x-6">
                          <FormField
                            control={form.control}
                            name={`testCases.${index}.isSample`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>サンプルケース</FormLabel>
                                  <FormDescription>評価前の挑戦中で表示されます．最低1つ必要です</FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`testCases.${index}.isHidden`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>隠しケース</FormLabel>
                                  <FormDescription>入力や期待する出力をユーザーに表示しない</FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => append({ input: "", expectedOutput: "", isSample: false, isHidden: true })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  テストケースを追加
                </Button>
              </div>
            </div>

            <Separator />

            {/* TODO: defaultCode Editor */}

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                問題を作成
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
