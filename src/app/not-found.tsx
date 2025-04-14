import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotFoundPage() {
  return (
    <div className="text-center flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-5xl font-bold pb-6">404 Not Found</h1>
      <p className="text-2xl font-bold pb-12">お探しのページは見つかりませんでした</p>
      <p className="pb-4">
        お探しのページは移動または削除された可能性がございます。
        <br />
        下記ホームリンクから他のページをご覧ください。
        <br />
        サイト内からのリンク切れの場合は、お問い合わせフォームよりご報告いただけますと幸いです。
      </p>

      <div className="flex gap-4 mt-6">
        <Link href="/">
          <Button variant="default">ホームへ</Button>
        </Link>

        <Link href="/contact">
          <Button variant="default">お問い合わせへ</Button>
        </Link>
      </div>
    </div>
  );
}
