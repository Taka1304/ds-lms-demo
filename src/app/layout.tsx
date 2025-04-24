import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/app/providers";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const notoSans = localFont({
  src: "./fonts/NotoSansJP-Medium.ttf",
  variable: "--font-noto-sans-jp",
  weight: "400 700",
});

export const metadata: Metadata = {
  title: "Sigza",
  description: "プログラミング学習を支援するアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <main>
              {children}
              <Toaster richColors />
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
