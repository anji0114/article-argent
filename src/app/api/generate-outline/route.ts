// app/api/generate-outline/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Claude APIの初期化
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!, // .env.localに設定
});

export async function POST(request: NextRequest) {
  try {
    const { theme, caseTitle, caseContent } = await request.json();
    
    if (!theme || !caseTitle || !caseContent) {
      return NextResponse.json(
        { error: 'テーマ、ケースタイトル、ケース内容が必要です' },
        { status: 400 }
      );
    }

    // Claude APIを使ってアウトラインを生成
    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `あなたはマーケティングの専門家です。以下の情報を元に、マーケティングアイデアの構成を作成してください。

テーマ: ${theme}

参照ケース:
タイトル: ${caseTitle}
内容:
${caseContent}

以下の構成で、アイデアの構成を作成してください：
1. 想定されるマーケティング課題（このアイデアが解決する問題点）
2. ターゲットオーディエンス（想定される顧客層）
3. 主要な解決策・アプローチ
4. 実施方法の概要
5. 期待される効果・KPI

必ず日本語で、箇条書きまたは見出し形式で簡潔に作成し、各セクションを明確に区切ってください。合計で400-600字程度に収めてください。`
        }
      ]
    });

    // 応答からアウトラインを抽出
    const outline = response.content[0].type === 'text' ? response.content[0].text : '';
    
    return NextResponse.json({ outline });
  } catch (error) {
    console.error('Error generating outline:', error);
    return NextResponse.json(
      { error: 'アウトライン生成中にエラーが発生しました' },
      { status: 500 }
    );
  }
}