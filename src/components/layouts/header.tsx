"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-green-700">
                記事生成AIエージェント
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <HeaderLink
                href="/"
                text="アイデア一覧"
                isActive={pathname === "/" || pathname.startsWith("/idea")}
              />
              <HeaderLink
                href="/case"
                text="ケース一覧"
                isActive={pathname.startsWith("/case")}
              />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

const HeaderLink = ({
  href,
  text,
  isActive,
}: {
  href: string;
  text: string;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 border-b-2 ${
        isActive ? "border-green-500" : "border-transparent"
      } text-sm font-medium text-gray-900`}
    >
      {text}
    </Link>
  );
};
