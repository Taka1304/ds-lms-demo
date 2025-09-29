"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-5xl font-bold pb-6">500 Internal Server Error</h1>
      <p className="text-2xl font-bold pb-12">予期せぬエラーが発生しました</p>
      <p className="pb-4">
        サーバーでエラーが発生しました。お手数ですが、時間をおいて再度お試しください。
        <br />
        解決しない場合は、以下のリンクからトップページに戻るか、お問い合わせください。
      </p>

      <div className="flex gap-4 mt-6">
        <Button onClick={() => reset()} variant="default">
          再試行
        </Button>

        <Link href="/contact">
          <Button variant="default">お問い合わせへ</Button>
        </Link>
      </div>
    </div>
  );
}
