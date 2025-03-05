import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Article } from "@/components/view/Article";

// サンプルデータ
const articles = [
  {
    id: 1,
    title: "SEO対策の基本とは？初心者でもわかる10のポイント",
    createdAt: "2025-04-01",
  },
  {
    id: 2,
    title: "コンテンツマーケティングの効果を最大化する方法",
    createdAt: "2025-03-28",
  },
  {
    id: 3,
    title: "Googleアルゴリズムの最新アップデートとその影響",
    createdAt: "2025-03-25",
  },
  {
    id: 4,
    title: "ブログ記事の書き方：読者を惹きつける7つのテクニック",
    createdAt: "2025-03-20",
  },
  {
    id: 5,
    title: "デジタルマーケティングのトレンド2025年版",
    createdAt: "2025-03-15",
  },
];

export default function CasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">ケース一覧</h2>
        <Link href="/case/create">
          <Button className="bg-green-600 hover:bg-green-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            新規記事作成
          </Button>
        </Link>
      </div>

      <div className="grid gap-2">
        {articles.map((article) => (
          <Article
            key={article.id}
            title={article.title}
            type="case"
            href={`/case/${article.id}`}
          />
        ))}
      </div>
    </div>
  );
}
