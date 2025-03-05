// app/api/generate-idea/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Claude APIの初期化
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!, // .env.localに設定
});

export async function POST(request: NextRequest) {
  try {
    console.log('アイデア生成APIリクエスト受信');
    
    let requestBody;
    try {
      requestBody = await request.json();
      console.log('リクエストボディ解析:', {
        theme: requestBody.theme,
        caseTitle: requestBody.caseTitle,
        hasOutline: !!requestBody.outline,
        previousIdeasCount: requestBody.previousIdeas?.length || 0
      });
    } catch (e) {
      console.error('リクエストボディの解析に失敗:', e);
      return NextResponse.json(
        { error: 'リクエストボディの解析に失敗しました' },
        { status: 400 }
      );
    }
    
    const { theme, caseTitle, caseContent, outline, previousIdeas = [] } = requestBody;
    
    if (!theme || !caseTitle || !caseContent || !outline) {
      console.warn('必須パラメータ不足:', { 
        theme: !!theme, 
        caseTitle: !!caseTitle, 
        caseContent: !!caseContent, 
        outline: !!outline 
      });
      return NextResponse.json(
        { error: '必要な情報が不足しています' },
        { status: 400 }
      );
    }

    // Claude APIのキーが設定されているか確認
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEYが設定されていません');
      return NextResponse.json(
        { error: 'APIキーが設定されていません。.env.localファイルでANTHROPIC_API_KEYを設定してください。' },
        { status: 500 }
      );
    }

    // 過去のアイデアの情報を整形
    let previousIdeasText = '';
    if (previousIdeas.length > 0) {
      previousIdeasText = `
以下は過去に作成された関連アイデアです。これらを参考にして、新しいアイデアに取り入れられる要素があれば活用してください：

${previousIdeas.map((idea: string, index: number) => 
  `===過去のアイデア ${index + 1}===
${idea}
`).join('\n')}

これらの過去のアイデアから良い部分を取り入れつつ、オリジナリティを持った新しいアイデアを作成してください。`;
    }

    console.log('Claude API呼び出し開始 (アイデア生成)');
    
    try {
      // Claude APIを使ってアイデアを生成
      const response = await anthropic.messages.create({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `あなたはマーケティングの専門家です。以下の情報を元に、具体的なマーケティングアイデアを作成してください。

テーマ: ${theme}

参照ケース:
タイトル: ${caseTitle}
内容:
${caseContent}

アイデアの構成（アウトライン）:
${outline}

${previousIdeasText}

以下のような具体的なマーケティングアイデアを日本語で作成してください：
1. アイデアの概要を簡潔に説明する導入文から始める
2. アウトラインに基づいた内容を展開する
3. 具体的な実施方法、タイムライン、必要なリソースなどを含める
4. 想定される成果や測定方法を具体的に説明する
5. 実装する際の注意点や代替案があれば記載する

実際に実施可能な、具体的かつ実践的なアイデアを提案してください。全体で1000-1500字程度の文章にまとめてください。`
          }
        ]
      });

      console.log('Claude APIレスポンス受信 (アイデア生成):', {
        responseType: typeof response,
        hasContent: !!response.content,
        contentLength: response.content ? response.content.length : 0
      });

      // 応答からアイデアを抽出
      const idea = response.content[0].type === 'text' ? response.content[0].text : '';
      
      console.log('生成されたアイデア (最初の100文字):', idea.substring(0, 100) + '...');
      
      return NextResponse.json({ idea });
    } catch (apiError) {
      console.error('Claude API呼び出しエラー (アイデア生成):', apiError);
      return NextResponse.json(
        { 
          error: 'Claude API呼び出し中にエラーが発生しました', 
          details: apiError instanceof Error ? apiError.message : String(apiError)
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('全体的なエラー (アイデア生成):', error);
    return NextResponse.json(
      { 
        error: 'アイデア生成中にエラーが発生しました',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}