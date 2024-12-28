import SigninButton from "@/app/auth/signin/signinButton";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-60px)]">
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
            <SigninButton provider="google">Sign in with Google</SigninButton>
            {/* <SigninButton provider="github">Sign in with GitHub</SigninButton> */}
          </div>
        </div>
      </div>
    </div>
  );
}
