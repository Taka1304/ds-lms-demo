import ProfilePage from "@/features/profile";
import { authOptions } from "@/lib/auth";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function ProfilePageWrapper() {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  if (!userId) return notFound();

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const headers: Record<string, string> = {};
  if (allCookies.length > 0) {
    headers.Cookie = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
  }

  const req = client.api.users[":user_id"].$get;
  const res = await req(
    {
      param: { user_id: userId },
    },
    {
      headers,
    },
  );

  if (!res.ok) {
    if (res.status < 500) return notFound();
    throw new Error("Failed to fetch user");
  }

  const data: InferResponseType<typeof req, 200> = await res.json();

  return <ProfilePage userId={userId} data={data} />;
}
