import { Toaster } from "@/components/ui/toaster";
import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
