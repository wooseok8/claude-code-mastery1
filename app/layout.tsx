import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: "모던 웹 스타터킷 - Next.js + TypeScript + TailwindCSS",
  description: "Next.js 15, TypeScript, TailwindCSS, ShadcnUI로 구성된 프로덕션 레디 스타터킷. 검증된 라이브러리와 재사용 가능한 컴포넌트로 개발 속도를 높이세요.",
  keywords: ["Next.js", "TypeScript", "TailwindCSS", "ShadcnUI", "스타터킷", "React", "웹개발"],
  authors: [{ name: "스타터킷" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://yourdomain.com",
    siteName: "모던 웹 스타터킷",
    title: "모던 웹 스타터킷 - Next.js + TypeScript + TailwindCSS",
    description: "프로덕션 레디 스타터킷으로 빠르게 웹 개발을 시작하세요",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "모던 웹 스타터킷",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "모던 웹 스타터킷 - Next.js + TypeScript + TailwindCSS",
    description: "프로덕션 레디 스타터킷으로 빠르게 웹 개발을 시작하세요",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
