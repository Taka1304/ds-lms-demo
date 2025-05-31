import { Header } from "@/components/layout/header";
import CardCarousel from "@/features/courses/components/CoursesCarousel";
import { client } from "@/lib/hono";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function CoursesPage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const headers: Record<string, string> = {};
  if (allCookies.length > 0) {
    headers.Cookie = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
  }
  const res = await client.api.courses.$get(
    {},
    {
      headers,
    },
  );
  if (!res.ok) {
    if (res.status < 500) return notFound();
    throw new Error("Failed to fetch courses");
  }

  const courses = await res.json();
  return (
    <>
      <Header title="コース一覧" />
      <div className="space-y-6 container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold pl-6">Related Courses</h1>
        <CardCarousel courses={courses} />
      </div>
    </>
  );
}
