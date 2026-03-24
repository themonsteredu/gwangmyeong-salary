import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "광명식당 급여 계산기",
  description: "광명식당 직원 급여 관리 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-blue-700">
              🍚 광명식당 급여 계산기
            </h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
