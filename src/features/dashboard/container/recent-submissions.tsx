import { RecentSubmissions } from "@/features/dashboard/recent-submissions";
import { client } from "@/lib/hono";
import { cookies } from "next/headers";
import { Suspense } from "react";

export async function RecentSubmissionsContainer() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value || "";
  const res = await client.api.submissions.$get(
    {
      query: {
        limit: "5",
        offset: "0",
        status: "EVALUATED",
      },
    },
    {
      headers: {
        Cookie: `next-auth.session-token=${sessionToken}`,
      },
    },
  );

  if (!res.ok) {
    console.error(res.status, await res.json());
    throw new Error("Failed to fetch recent submissions");
  }

  const data = await res.json();

  return (
    <Suspense fallback={null}>
      <RecentSubmissions recentSubmissions={data} />
    </Suspense>
  );
}
