'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Search, Users, FileText, CheckCircle, Brain } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { id: 1, name: 'キーワード決定', icon: Search },
  { id: 2, name: '競合分析', icon: FileText },
  { id: 3, name: 'ニーズ分析', icon: Users },
  { id: 4, name: '記事構成の提案', icon: FileText },
  { id: 5, name: '記事執筆', icon: FileText },
  { id: 6, name: 'チェック & 修正', icon: CheckCircle },
  { id: 7, name: '学習', icon: Brain },
];

export default function CreateArticle() {
  const [currentStep, setCurrentStep] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [competitorAnalysis, setCompetitorAnalysis] = useState('');
  const [needsAnalysis, setNeedsAnalysis] = useState('');
  const [articleStructure, setArticleStructure] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState('');
  
  const progress = Math.round((currentStep / steps.length) * 100);
  
  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setIsProcessing(true);
      
      // 実際のアプリではここでAPIを呼び出して処理を行う
      setTimeout(() => {
        setIsProcessing(false);
        
        // 各ステップに応じたサンプルデータを設定
        if (currentStep === 1) {
          setCompetitorAnalysis(`# 競合分析: "${keyword}"

## 上位表示されている記事の特徴

1. **タイトルの傾向**
   - 数字を含むリスト形式（「10の方法」「7つのポイント」など）
   - 疑問形を使用（「〜とは？」「〜する方法は？」）
   - ベネフィットを明示（「〜で成功する」「〜を改善する」）

2. **コンテンツ構造**
   - 明確な見出し階層（H2, H3）を使用
   - 導入部で読者の課題を明確に提示
   - 具体例やケーススタディを含む
   - まとめセクションで要点を再確認

3. **差別化ポイント**
   - 最新の統計データや研究結果を引用
   - 専門家の意見や引用を含む
   - オリジナルの図表やインフォグラフィックを使用
   - 実践的なステップバイステップのガイド

## 改善の余地がある点

1. 多くの記事が一般的な内容にとどまり、具体的な実践方法が不足
2. 業界固有の課題やニッチな問題への対応が少ない
3. 初心者向けと上級者向けの内容が混在し、ターゲットが不明確

## 推奨アプローチ

1. より具体的で実用的な内容を提供
2. 明確なターゲット読者を設定（初心者向け）
3. 最新のトレンドや変更点を取り入れる
4. 独自の視点や経験を加える`);
        } else if (currentStep === 2) {
          setNeedsAnalysis(`# ニーズ分析: "${keyword}"

## ターゲット読者プロフィール

### 主要ターゲット: SEO初心者
- **属性:** 小規模ビジネスオーナー、マーケティング担当者（経験1-2年以内）
- **年齢層:** 25-45歳
- **技術レベル:** 基本的なウェブの知識はあるが、SEOの専門知識は限定的
- **目標:** 自社サイトのアクセス数を増やし、コンバージョン率を向上させたい

### 二次ターゲット: 個人ブロガー
- **属性:** 副業や趣味でブログを運営
- **年齢層:** 20-35歳
- **技術レベル:** WordPressなどのCMSは使えるが、SEOは未経験
- **目標:** ブログの読者数を増やし、収益化の可能性を探りたい

## 読者の課題と痛点

1. **情報過多による混乱**
   - SEOに関する情報が多すぎて何から始めればよいかわからない
   - 専門用語が多く理解しづらい

2. **実践的知識の不足**
   - 理論は理解できても実際の適用方法がわからない
   - 限られた時間とリソースでどこに注力すべきか判断できない

3. **効果測定の難しさ**
   - 施策の効果がすぐに表れないことへの不安
   - 何をもって成功と判断すべきかわからない

## 検索意図の分析

### 情報探索型
- 「SEOとは何か」基本的な理解を求めている
- 初心者向けのステップバイステップガイドを期待

### 問題解決型
- 「自分のサイトのSEOをどう改善するか」具体的な方法を探している
- すぐに実践できるアクションアイテムを求めている

## 推奨コンテンツ方針

1. 専門用語を極力平易な言葉で説明
2. 各ポイントに具体的な実践方法を付加
3. 少ないリソースでも実行可能な優先順位を提示
4. 成功指標と期待できる結果の目安を提供
5. 視覚的な例（スクリーンショットなど）を活用`);
        } else if (currentStep === 3) {
          setArticleStructure(`# 記事構成: "SEO対策の基本とは？初心者でもわかる10のポイント"

## 導入部
- **目的:** 読者の興味を引き、記事の価値を伝える
- **内容:**
  - SEOの重要性と基本的な定義
  - 初心者が感じる一般的な混乱や課題への共感
  - この記事で学べること（10のポイント）の概要
  - 「専門知識がなくても実践できる」という安心感の提供

## 第1セクション: SEOの基礎知識
- **目的:** SEOの基本概念を理解してもらう
- **内容:**
  - 検索エンジンの仕組み（簡潔に）
  - オーガニック検索とは
  - SEOが重要な理由
  - 短期的施策と長期的施策の違い

## 第2セクション: 10の基本ポイント
- **目的:** 実践可能な具体的なSEO対策を提供
- **内容:**
  1. **キーワードリサーチの重要性**
     - 基本的なキーワードリサーチの方法
     - 無料ツールの紹介
  
  2. **質の高いコンテンツの作成**
     - E-A-Tの概念
     - ユーザー意図に合ったコンテンツとは
  
  3. **モバイルフレンドリーなデザイン**
     - モバイルファーストインデックスの説明
     - モバイル対応をチェックする方法
  
  4. **ページ速度の最適化**
     - 速度がSEOに与える影響
     - 簡単に実施できる速度改善策
  
  5. **適切なメタタグの設定**
     - タイトルタグとメタディスクリプションの書き方
     - 良い例と悪い例
  
  6. **内部リンク構造の最適化**
     - 効果的な内部リンクの配置方法
     - サイト構造の重要性
  
  7. **外部リンク（バックリンク）の獲得**
     - 質の高いバックリンクとは
     - 自然なリンク獲得のアプローチ
  
  8. **ソーシャルメディアの活用**
     - SEOとソーシャルメディアの関係
     - 効果的な活用方法
  
  9. **定期的な分析と改善**
     - 基本的な分析指標
     - Google Analytics と Search Console の活用法
  
  10. **最新のアルゴリズム変更への対応**
      - 情報源の確認方法
      - 対応の基本姿勢

## 第3セクション: 実践のためのロードマップ
- **目的:** 読者が具体的に行動を起こせるようにする
- **内容:**
  - 初月、3ヶ月、6ヶ月のアクションプラン
  - 優先順位の付け方
  - 期待できる成果と時間軸

## まとめ
- **目的:** 記事の要点を再確認し、次のステップを促す
- **内容:**
  - 10のポイントの簡潔な復習
  - SEOは継続的な取り組みであることの強調
  - 読者への励ましと次のステップの提案`);
        } else if (currentStep === 4) {
          setGeneratedArticle(`# SEO対策の基本とは？初心者でもわかる10のポイント

## はじめに
検索エンジン最適化（SEO）は、ウェブサイトやブログの可視性を高め、オーガニック検索結果でより上位に表示されるようにするための重要な戦略です。SEOについての情報は膨大で、初心者の方は「何から始めればいいのか」と混乱することも多いでしょう。本記事では、専門知識がなくても実践できる、SEO対策の基本的なポイントを10個ご紹介します。これらを順に取り組むことで、あなたのサイトの検索順位を着実に向上させることができるでしょう。

## SEOの基礎知識

検索エンジン（GoogleやBingなど）は、ウェブ上の情報を「クローラー」と呼ばれるプログラムで収集し、インデックス化しています。ユーザーが検索クエリを入力すると、検索エンジンはそのインデックスから最も関連性の高いページを表示します。

オーガニック検索とは、広告ではなく、検索エンジンのアルゴリズムによって自然に表示される検索結果のことです。SEOはこのオーガニック検索結果での順位を向上させるための施策です。

SEOが重要な理由は明確です。検索ユーザーの約70%は最初のページに表示された結果しかクリックしないというデータがあります。つまり、2ページ目以降に表示されるサイトへのアクセスは極めて限られているのです。

SEO対策には短期的な効果を得られるものと、長期的に取り組むべきものがあります。例えば、メタタグの最適化は比較的短期間で効果が現れることがありますが、質の高いコンテンツの蓄積やバックリンクの獲得は、長期的な取り組みが必要です。

それでは、具体的な10のポイントを見ていきましょう。

## 1. キーワードリサーチの重要性
適切なキーワードを選ぶことは、SEO戦略の基盤となります。ターゲットとする読者が何を検索しているのかを理解し、それに合わせたキーワードを選定しましょう。

キーワードリサーチには、Google キーワードプランナーや Ubersuggest などの無料ツールが活用できます。検索ボリュームと競合性のバランスが取れたキーワードを見つけることが重要です。特に初心者の場合は、競合が激しすぎないロングテールキーワード（より具体的で長いフレーズ）から始めるのがおすすめです。

## 2. 質の高いコンテンツの作成
Googleのアルゴリズムは、ユーザーに価値を提供するコンテンツを高く評価します。E-A-T（専門性、権威性、信頼性）を意識した、情報量が豊富で、わかりやすく、オリジナリティのあるコンテンツを心がけましょう。

ユーザー意図に合ったコンテンツとは、検索者が求めている情報や解決策を的確に提供するものです。例えば「SEOとは」という検索には基本的な説明が、「SEO対策 方法」という検索には具体的な手順が求められています。

## 3. モバイルフレンドリーなデザイン
モバイルデバイスからのアクセスが増加している現在、レスポンシブデザインは必須です。Googleもモバイルファーストインデックスを採用しており、モバイル版のコンテンツを優先的にインデックス化しています。

自分のサイトがモバイルフレンドリーかどうかは、Googleの「モバイルフレンドリーテスト」で簡単に確認できます。テキストサイズ、タップターゲットの間隔、ビューポートの設定などが適切かチェックしましょう。

## 4. ページ速度の最適化
ページの読み込み速度は、ユーザー体験とSEOの両方に影響します。Googleの調査によると、ページの読み込み時間が3秒から5秒に増えるだけで、直帰率は90%も増加するとされています。

速度向上のための簡単な施策としては、画像の圧縮、ブラウザキャッシュの活用、不要なプラグインの削除などがあります。Google PageSpeed Insightsを使って、現在のパフォーマンスと改善点を確認しましょう。

## 5. 適切なメタタグの設定
タイトルタグやメタディスクリプションは、検索結果に表示される重要な要素です。キーワードを含めつつ、クリックを促す魅力的な文言を設定しましょう。

良いタイトルタグの例：
「SEO対策の基本とは？初心者でもわかる10のポイント」

悪いタイトルタグの例：
「SEO - ホームページ」

メタディスクリプションは150〜160文字程度で、記事の内容を簡潔に要約し、読者のメリットを伝えるものが効果的です。

## 6. 内部リンク構造の最適化
サイト内の関連ページへのリンクは、ユーザーの回遊性を高めるだけでなく、クローラーのインデックス効率も向上させます。

効果的な内部リンクの配置方法としては、自然な文脈の中でキーワードを含むアンカーテキストを使用することが重要です。また、サイト構造はユーザーにとって論理的で分かりやすいものにしましょう。理想的には、どのページもホームページから3クリック以内でアクセスできる構造が望ましいとされています。

## 7. 外部リンク（バックリンク）の獲得
他の信頼性の高いサイトからのリンクは、あなたのサイトの権威性を高める重要な要素です。質の高いコンテンツを提供し、自然なバックリンクを獲得しましょう。

質の高いバックリンクとは、関連性のある信頼できるサイトからのリンクです。数よりも質を重視し、スパム的なリンク構築は避けるべきです。自然なリンク獲得のアプローチとしては、共有したくなるような価値の高いコンテンツの作成、業界関係者とのネットワーキング、ゲスト投稿などが効果的です。

## 8. ソーシャルメディアの活用
直接的なランキング要因ではありませんが、ソーシャルメディアでの共有は露出を増やし、間接的にSEOに貢献します。

効果的な活用方法としては、各プラットフォームの特性に合わせたコンテンツの共有、ハッシュタグの適切な使用、エンゲージメントを促す投稿などが挙げられます。また、ソーシャルメディアプロフィールからのリンクは、ブランドの認知度向上にも役立ちます。

## 9. 定期的な分析と改善
Google Analytics や Search Console などのツールを活用して、パフォーマンスを定期的に分析し、改善点を見つけましょう。

基本的な分析指標としては、オーガニック検索トラフィック、直帰率、滞在時間、コンバージョン率などがあります。Search Consoleでは、どのキーワードでサイトが表示されているか、クリック率はどうか、インデックス状況に問題はないかなどを確認できます。

## 10. 最新のアルゴリズム変更への対応
Googleのアルゴリズムは常に進化しています。最新の変更に注目し、必要に応じて戦略を調整することが重要です。

信頼できる情報源としては、Google公式ブログ、Search Engine Journal、Moz Blogなどがあります。アルゴリズム変更への対応の基本姿勢は、「ユーザーファースト」であることです。検索エンジンよりもユーザーのニーズを優先したサイト運営を心がければ、長期的には評価されるでしょう。

## 実践のためのロードマップ

SEO対策を効果的に進めるためのロードマップをご紹介します。

**初月のアクションプラン:**
1. キーワードリサーチを行い、ターゲットキーワードを決定
2. メタタグの最適化
3. モバイルフレンドリーテストと基本的な改善
4. Google Analytics と Search Console の設定

**3ヶ月のアクションプラン:**
1. コンテンツの充実（週1記事のペースで質の高いコンテンツを追加）
2. 内部リンク構造の見直しと最適化
3. ページ速度の改善
4. 基本的なソーシャルメディア活動の開始

**6ヶ月のアクションプラン:**
1. コンテンツの継続的な追加と既存コンテンツの更新
2. バックリンク獲得のための関係構築
3. ユーザー行動の分析と改善
4. より高競争のキーワードへの挑戦

優先順位としては、まずサイトの技術的な問題（モバイル対応、速度など）を解決し、次に質の高いコンテンツの作成に注力し、その後外部要因（バックリンクなど）に取り組むのが効果的です。

SEOの効果は通常3〜6ヶ月程度で現れ始めますが、競争の激しいキーワードでは1年以上かかることもあります。継続的な取り組みが重要です。

## まとめ

SEO対策の基本的なポイントをおさらいしましょう：

1. 適切なキーワードリサーチを行う
2. 質の高いコンテンツを作成する
3. モバイルフレンドリーなデザインにする
4. ページ速度を最適化する
5. 適切なメタタグを設定する
6. 内部リンク構造を最適化する
7. 質の高いバックリンクを獲得する
8. ソーシャルメディアを活用する
9. 定期的に分析と改善を行う
10. 最新のアルゴリズム変更に対応する

SEO対策は一朝一夕で結果が出るものではありませんが、これらの基本的なポイントを押さえることで、長期的に効果を発揮します。継続的な努力と改善を重ねて、オーガニック検索からの流入を増やしていきましょう。

次のステップとしては、より詳細なキーワード戦略の立案や、コンテンツマーケティング計画の策定に取り組むことをおすすめします。SEOの世界は常に変化していますが、ユーザーに価値を提供するという基本原則は変わりません。その原則を忘れずに取り組めば、必ず成果は表れるでしょう。`);
        }
        
        setCurrentStep(currentStep + 1);
      }, 2000);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <p className="text-gray-700">
              記事のターゲットキーワードを入力してください。このキーワードをもとに、競合分析やニーズ分析を行います。
            </p>
            <div>
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                キーワード
              </label>
              <Input
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="例: SEO対策 初心者"
                className="max-w-md"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-gray-700">
              キーワード「{keyword}」の競合分析結果です。上位表示されている記事の特徴や差別化ポイントを分析しました。
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm">{competitorAnalysis}</pre>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-gray-700">
              キーワード「{keyword}」のニーズ分析結果です。ターゲット読者の属性や課題、検索意図を分析しました。
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm">{needsAnalysis}</pre>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <p className="text-gray-700">
              競合分析とニーズ分析をもとに、記事の構成を提案します。各セクションの目的と内容を確認してください。
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm">{articleStructure}</pre>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <p className="text-gray-700">
              提案された構成に基づいて、AIが記事を執筆しました。内容を確認してください。
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm">{generatedArticle}</pre>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <p className="text-gray-700">
              生成された記事を確認し、必要に応じて修正してください。修正内容はAIの学習データとして記録されます。
            </p>
            <Textarea
              value={generatedArticle}
              onChange={(e) => setGeneratedArticle(e.target.value)}
              className="min-h-[500px] font-mono"
            />
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-green-800 mb-2">記事の作成が完了しました！</h3>
              <p className="text-green-700">
                記事は正常に保存され、修正内容はAIの学習データとして記録されました。
                次回の記事生成ではこの学習データを活用し、より質の高い記事を生成します。
              </p>
              <div className="mt-6">
                <Link href="/">
                  <Button className="bg-green-600 hover:bg-green-700">
                    記事一覧に戻る
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          記事一覧に戻る
        </Link>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">新規記事作成</h2>
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
            ></div>
          </div>
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id === currentStep
                    ? 'text-green-600'
                    : step.id < currentStep
                    ? 'text-gray-500'
                    : 'text-gray-300'
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full mb-2 ${
                    step.id === currentStep
                      ? 'bg-green-100 border-2 border-green-500'
                      : step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <span className="text-xs hidden sm:block">{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button
          onClick={handlePrevStep}
          variant="outline"
          disabled={currentStep === 1 || isProcessing}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          前のステップ
        </Button>
        
        {currentStep < steps.length ? (
          <Button
            onClick={handleNextStep}
            className="bg-green-600 hover:bg-green-700"
            disabled={currentStep === 1 && !keyword || isProcessing}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                処理中...
              </>
            ) : (
              <>
                次のステップ
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        ) : null}
      </div>
    </div>
  );
}