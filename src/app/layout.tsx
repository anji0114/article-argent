import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "記事生成AIエージェント",
  description: "AIがナビゲートしながら記事を作成するアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} font-sans bg-gray-50 min-h-screen`}
      >
        <div className="flex flex-col min-h-screen">
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-green-700">
                      記事生成AIエージェント
                    </h1>
                  </div>
                  <nav className="ml-6 flex space-x-8">
                    <Link
                      href="/"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-green-500 text-sm font-medium text-gray-900"
                    >
                      記事一覧
                    </Link>
                    <Link
                      href="/create"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    >
                      新規作成
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-white border-t border-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                © 2025 記事生成AIエージェント
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
