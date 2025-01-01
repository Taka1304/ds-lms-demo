"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";

// TODO: dummy
const allProblems = [
  { id: "1", title: "Two Sum", difficulty: "Easy", submitCount: 100, acceptCount: 80 },
  { id: "2", title: "Reverse Integer", difficulty: "Medium", submitCount: 80, acceptCount: 60 },
  { id: "3", title: "Median of Two Sorted Arrays", difficulty: "Hard", submitCount: 50, acceptCount: 20 },
];

export default function ProblemList() {
  const [filterDifficulty, setFilterDifficulty] = useState("All");

  const filteredProblems = filterDifficulty === "All"
  ? allProblems
  : allProblems.filter((p) => p.difficulty === filterDifficulty);

  const columns: ColumnDef<typeof allProblems[0]>[] = useMemo(() => [
    {
      accessorKey: "title",
      header: "タイトル",
    },
    {
      accessorKey: "difficulty",
      header: "難易度",
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
          <Link href={`/courses/${problem.id}`}>
            <Button size="sm">
              挑戦する
            </Button>
          </Link>
        );
      },
    },
  ],[]);

  return (
    <div className="space-y-6 container mx-auto px-4 py-8 min-h-[calc(100vh-60px)]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">演習問題</h1>
        <Select onValueChange={setFilterDifficulty} defaultValue={filterDifficulty}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">全て</SelectItem>
            <SelectItem value="Easy">簡単</SelectItem>
            <SelectItem value="Medium">普通</SelectItem>
            <SelectItem value="Hard">難しい</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={filteredProblems} />
      {/* TODO: Pagination */}
    </div>
  );
}

