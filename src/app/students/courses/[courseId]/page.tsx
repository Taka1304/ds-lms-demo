"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { use } from "react";

// TODO: dummy
const allProblems = [
  { id: "1", title: "Two Sum", difficultyLevel: 1, submitCount: 100, acceptCount: 80 },
  { id: "2", title: "Reverse Integer", difficultyLevel: 2, submitCount: 80, acceptCount: 60 },
  { id: "3", title: "Median of Two Sorted Arrays", difficultyLevel: 3, submitCount: 50, acceptCount: 20 },
];

const difficulties = ["全て", "簡単", "普通", "難しい"];

export default function ProblemList({ params }: { params: Promise<{ courseId: string }> }) {
  const [filterDifficulty, setFilterDifficulty] = useState(difficulties[0]);
  const filteredProblems =
    filterDifficulty === difficulties[0]
      ? allProblems
      : allProblems.filter((p) => p.difficultyLevel === difficulties.indexOf(filterDifficulty));
  const resolvedParams = use(params);

  const columns: ColumnDef<(typeof allProblems)[0]>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "タイトル",
      },
      {
        accessorKey: "difficultyLevel",
        header: "難易度",
        cell: ({ row }) => {
          const problem = row.original;
          return difficulties[problem.difficultyLevel];
        },
      },
      {
        accessorKey: "acceptance",
        header: "正答率",
        cell: ({ row }) => {
          const problem = row.original;
          return `${((problem.acceptCount / problem.submitCount) * 100).toFixed(2)}%`;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const problem = row.original;
          return (
            <Link href={`/students/courses/${resolvedParams.courseId}/${problem.id}`}>
              <Button size="sm" className="w-full">
                挑戦する
              </Button>
            </Link>
          );
        },
      },
    ],
    [resolvedParams.courseId],
  );

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h2 className="text-md">演習問題</h2>
        </div>
      </header>
      <div className="space-y-6 container mx-auto px-4 py-8 min-h-[calc(100vh-60px)]">
        <div className="flex justify-between items-center">
          <Select onValueChange={setFilterDifficulty} defaultValue={filterDifficulty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DataTable columns={columns} data={filteredProblems} />
        {/* TODO: Pagination */}
      </div>
    </>
  );
}
