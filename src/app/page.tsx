import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText } from 'lucide-react';

// サンプルデータ
const articles = [
  { id: 1, title: 'SEO対策の基本とは？初心者でもわかる10のポイント', createdAt: '2025-04-01' },
  { id: 2, title: 'コンテンツマーケティングの効果を最大化する方法', createdAt: '2025-03-28' },
  { id: 3, title: 'Googleアルゴリズムの最新アップデートとその影響', createdAt: '2025-03-25' },
  { id: 4, title: 'ブログ記事の書き方：読者を惹きつける7つのテクニック', createdAt: '2025-03-20' },
  { id: 5, title: 'デジタルマーケティングのトレンド2025年版', createdAt: '2025-03-15' },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">記事一覧</h2>
        <Link href="/create">
          <Button className="bg-green-600 hover:bg-green-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            新規記事作成
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-start">
                  <FileText className="h-5 w-5 mr-2 text-green-600 mt-1 flex-shrink-0" />
                  <span>{article.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">作成日: {article.createdAt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}