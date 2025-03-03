'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// サンプルデータ
const articleData = {
  id: 1,
  title: 'SEO対策の基本とは？初心者でもわかる10のポイント',
  content: `# SEO対策の基本とは？初心者でもわかる10のポイント

## はじめに
検索エンジン最適化（SEO）は、ウェブサイトやブログの可視性を高め、オーガニック検索結果でより上位に表示されるようにするための重要な戦略です。本記事では、SEO初心者の方でも理解できる基本的なポイントを10個ご紹介します。

## 1. キーワードリサーチの重要性
適切なキーワードを選ぶことは、SEO戦略の基盤となります。ターゲットとする読者が何を検索しているのかを理解し、それに合わせたキーワードを選定しましょう。

## 2. 質の高いコンテンツの作成
Googleのアルゴリズムは、ユーザーに価値を提供するコンテンツを高く評価します。情報量が豊富で、わかりやすく、オリジナリティのあるコンテンツを心がけましょう。

## 3. モバイルフレンドリーなデザイン
モバイルデバイスからのアクセスが増加している現在、レスポンシブデザインは必須です。Googleもモバイルファーストインデックスを採用しています。

## 4. ページ速度の最適化
ページの読み込み速度は、ユーザー体験とSEOの両方に影響します。画像の最適化やキャッシュの活用など、速度向上のための施策を行いましょう。

## 5. 適切なメタタグの設定
タイトルタグやメタディスクリプションは、検索結果に表示される重要な要素です。キーワードを含めつつ、クリックを促す魅力的な文言を設定しましょう。

## 6. 内部リンク構造の最適化
サイト内の関連ページへのリンクは、ユーザーの回遊性を高めるだけでなく、クローラーのインデックス効率も向上させます。

## 7. 外部リンク（バックリンク）の獲得
他の信頼性の高いサイトからのリンクは、あなたのサイトの権威性を高める重要な要素です。質の高いコンテンツを提供し、自然なバックリンクを獲得しましょう。

## 8. ソーシャルメディアの活用
直接的なランキング要因ではありませんが、ソーシャルメディアでの共有は露出を増やし、間接的にSEOに貢献します。

## 9. 定期的な分析と改善
Google Analytics や Search Console などのツールを活用して、パフォーマンスを定期的に分析し、改善点を見つけましょう。

## 10. 最新のアルゴリズム変更への対応
Googleのアルゴリズムは常に進化しています。最新の変更に注目し、必要に応じて戦略を調整することが重要です。

## まとめ
SEO対策は一朝一夕で結果が出るものではありませんが、これらの基本的なポイントを押さえることで、長期的に効果を発揮します。継続的な努力と改善を重ねて、オーガニック検索からの流入を増やしていきましょう。`,
  createdAt: '2025-04-01',
  modificationHistory: [
    { date: '2025-04-02', section: 'はじめに', original: '検索エンジン最適化（SEO）は...', modified: '検索エンジン最適化（SEO）は、ウェブサイトの可視性を高め...' },
    { date: '2025-04-03', section: '2. 質の高いコンテンツの作成', original: 'Googleのアルゴリズムは...', modified: 'Googleのアルゴリズムは、ユーザーに価値を提供する...' }
  ]
};

export default function ArticleDetail() {
  const params = useParams();
  const articleId = params.id;
  
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(articleData.content);
  const [modificationHistory, setModificationHistory] = useState(articleData.modificationHistory);

  const handleSave = () => {
    // 実際のアプリでは、ここでAPIを呼び出して保存処理を行う
    // また、修正履歴も記録する
    setIsEditing(false);
    
    // 修正履歴のサンプル更新（実際のアプリではAIが差分を検出）
    const newModification = {
      date: new Date().toISOString().split('T')[0],
      section: '全体',
      original: articleData.content,
      modified: content
    };
    
    setModificationHistory([...modificationHistory, newModification]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          記事一覧に戻る
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{articleData.title}</h2>
        <div>
          {isEditing ? (
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Edit className="mr-2 h-4 w-4" />
              編集
            </Button>
          )}
        </div>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          {isEditing ? (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[500px] font-mono"
            />
          ) : (
            <div className="prose max-w-none">
              {content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index} className="text-2xl font-bold mb-4">{paragraph.substring(2)}</h1>;
                } else if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{paragraph.substring(3)}</h2>;
                } else {
                  return <p key={index} className="mb-4">{paragraph}</p>;
                }
              })}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <Tabs defaultValue="history">
          <TabsList className="mb-4">
            <TabsTrigger value="history">修正履歴</TabsTrigger>
            <TabsTrigger value="metadata">メタデータ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">修正履歴</CardTitle>
              </CardHeader>
              <CardContent>
                {modificationHistory.length > 0 ? (
                  <div className="space-y-4">
                    {modificationHistory.map((mod, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{mod.section}</span>
                          <span className="text-sm text-gray-500">{mod.date}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-red-50 p-3 rounded text-sm">
                            <p className="text-red-800 font-medium mb-1">修正前</p>
                            <p className="text-gray-700">{mod.original.substring(0, 100)}...</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded text-sm">
                            <p className="text-green-800 font-medium mb-1">修正後</p>
                            <p className="text-gray-700">{mod.modified.substring(0, 100)}...</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">修正履歴はありません</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metadata">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">メタデータ</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">記事ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{articleId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">作成日</dt>
                    <dd className="mt-1 text-sm text-gray-900">{articleData.createdAt}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">文字数</dt>
                    <dd className="mt-1 text-sm text-gray-900">{content.length}文字</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">最終更新</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {modificationHistory.length > 0 
                        ? modificationHistory[modificationHistory.length - 1].date 
                        : articleData.createdAt}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}