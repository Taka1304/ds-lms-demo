import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/app/providers";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/lib/env";
import Head from "next/head";
import Script from "next/script";

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
      <Head>
        <Script async src="https://cloud.umami.is/script.js" data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID} />
      </Head>
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
