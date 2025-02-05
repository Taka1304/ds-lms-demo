'use client'

import { PythonProvider } from "react-py";
import type { Packages } from "react-py/dist/types/Packages";

const packages: Packages = {
  official: ["numpy"],
  micropip: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PythonProvider packages={packages} timeout={3000}>
      {children}
    </PythonProvider>
  );
}
