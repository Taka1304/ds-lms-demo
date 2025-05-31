import { RecentSubmissions } from "@/features/dashboard/recent-submissions";
import { client } from "@/lib/hono";
import { AlertCircle } from "lucide-react";
import { cookies } from "next/headers";
import { Suspense } from "react";

export async function RecentSubmissionsContainer() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const headers: Record<string, string> = {};
  if (allCookies.length > 0) {
    headers.Cookie = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
  }
  const res = await client.api.submissions.$get(
    {
      query: {
        limit: "5",
        offset: "0",
        status: "EVALUATED",
      },
    },
    {
      headers,
    },
  );

  if (!res.ok) {
    console.error(res.status, await res.json());
    if (res.status === 401) {
      console.error(`Unauthorized: ${headers.Cookie}`);
    }
    return (
      <div className="flex items-center justify-center">
        <AlertCircle />
        エラーが発生しました
      </div>
    );
  }

  const data = await res.json();

  return (
    <Suspense fallback={null}>
      <RecentSubmissions recentSubmissions={data} />
    </Suspense>
  );
}
