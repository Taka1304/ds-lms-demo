import SigninButton from "@/app/auth/signin/signinButton";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession();
  const params = await searchParams;
  // ログイン済みの場合はリダイレクト
  if (session?.user) {
    if (typeof params.callbackUrl === "string") {
      redirect(params.callbackUrl);
    } else if (typeof params.callbackUrl === "object") {
      redirect(params.callbackUrl[0]);
    }
    redirect("/students");
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/red-ink-on-yellow-and-blue.jpg"
          alt="Signin page image"
          fill
          sizes="50vw"
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mt-6 text-2xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <div className="flex flex-col space-y-4">
            <SigninButton provider="google">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Sign in with Google
            </SigninButton>
            <SigninButton provider="azure-ad-b2c">
              <svg width="16" height="16" aria-hidden="true">
                <rect x="0" y="0" width="6" height="6" fill="#F25022" />
                <rect x="0" y="8" width="6" height="6" fill="#00A4EF" />
                <rect x="8" y="0" width="6" height="6" fill="#7FBA00" />
                <rect x="8" y="8" width="6" height="6" fill="#FFB900" />
              </svg>
              Sign in with Microsoft
            </SigninButton>
            {/* TODO: Add Other Provider */}
            {/* <SigninButton provider="github">Sign in with GitHub</SigninButton> */}
          </div>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking continue, you agree to our <Link href="/terms-of-service">Terms of Service</Link> and{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
