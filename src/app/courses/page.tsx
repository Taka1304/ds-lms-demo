"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";

// TODO: dummy
const allProblems = [
  { id: "1", title: "Two Sum", difficultyLevel: 1, submitCount: 100, acceptCount: 80 },
  { id: "2", title: "Reverse Integer", difficultyLevel: 2, submitCount: 80, acceptCount: 60 },
  { id: "3", title: "Median of Two Sorted Arrays", difficultyLevel: 3, submitCount: 50, acceptCount: 20 },
];

const difficulties = ["全て", "簡単", "普通", "難しい"];

export default function ProblemList() {
  const [filterDifficulty, setFilterDifficulty] = useState(difficulties[0]);
  const filteredProblems =
    filterDifficulty === difficulties[0] ? allProblems : allProblems.filter((p) => p.difficultyLevel === difficulties.indexOf(filterDifficulty));

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
            <Link href={`/courses/${problem.id}`}>
              <Button size="sm" className="w-full">挑戦する</Button>
            </Link>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="space-y-6 container mx-auto px-4 py-8 min-h-[calc(100vh-60px)]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">演習問題</h1>
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
  );
}
