import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const serif = Noto_Serif_KR({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const sans = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "황금돈사부 | 인생사주리포트",
  description:
    "만세력 검증 데이터와 실제 상담 노하우를 결합한 인생사주리포트. 사주 원국부터 10년 대운까지, 근거 있는 풀이만 담았습니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
