// components/ideas/IdeaGenerator.tsx
"use client";

import { useState, useEffect } from "react";

interface IdeaGeneratorProps {
  theme: string;
  selectedCase: {
    id: string;
    title: string;
    content: string;
  };
  outline: string;
  previousIdeas: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  onIdeaGenerated: (idea: string) => void;
  onBack: () => void;
}

export default function IdeaGenerator({
  theme,
  selectedCase,
  outline,
  previousIdeas,
  onIdeaGenerated,
  onBack,
}: IdeaGeneratorProps) {
  const [generatedIdea, setGeneratedIdea] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPreviousIdeas, setSelectedPreviousIdeas] = useState<string[]>(
    []
  );
  const [showPreview, setShowPreview] = useState<string | null>(null);

  useEffect(() => {
    // コンポーネントがマウントされたときに自動でアイデアを生成
    generateIdea();
  }, []);

  const togglePreviousIdea = (ideaId: string) => {
    setSelectedPreviousIdeas((prev) =>
      prev.includes(ideaId)
        ? prev.filter((id) => id !== ideaId)
        : [...prev, ideaId]
    );
  };

  const generateIdea = async () => {
    setIsGenerating(true);

    try {
      // 選択された過去のアイデアの内容を取得
      const selectedIdeasContent = previousIdeas
        .filter((idea) => selectedPreviousIdeas.includes(idea.id))
        .map((idea) => idea.content);

      console.log("アイデア生成APIリクエスト送信:", {
        theme,
        caseTitle: selectedCase.title,
        hasOutline: !!outline,
        previousIdeasCount: selectedIdeasContent.length,
      });

      const response = await fetch("/api/generate-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme,
          caseTitle: selectedCase.title,
          caseContent: selectedCase.content,
          outline,
          previousIdeas: selectedIdeasContent,
        }),
      });

      console.log("APIレスポンスステータス:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("APIエラーレスポンス:", errorText);
        throw new Error(
          `アイデア生成に失敗しました (${response.status}): ${errorText}`
        );
      }

      const data = await response.json();

      if (!data || !data.idea) {
        console.error("APIレスポンスにideaフィールドがありません:", data);
        throw new Error("APIレスポンスの形式が不正です");
      }

      setGeneratedIdea(data.idea);
    } catch (error) {
      console.error("Error generating idea:", error);
      setGeneratedIdea(
        `アイデアの生成中にエラーが発生しました。もう一度生成をお試しください。\nエラー詳細: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (generatedIdea && generatedIdea.trim()) {
      onIdeaGenerated(generatedIdea);
    } else {
      alert("アイデアを生成してください");
    }
  };

  // 過去のアイデアのプレビューを表示
  const showIdeaPreview = (ideaId: string) => {
    const idea = previousIdeas.find((idea) => idea.id === ideaId);
    if (idea) {
      setShowPreview(idea.content);
    }
  };

  // プレビューを閉じる
  const closePreview = () => {
    setShowPreview(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">ステップ4: アイデアの生成</h2>
      <p className="mb-4 text-gray-600">
        設定した内容をもとにアイデアを生成しています。参考にしたい過去のアイデアを選択して再生成することもできます。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <h3 className="font-medium text-sm mb-2">生成されたアイデア</h3>
          <div className="border border-gray-300 rounded-md p-4 h-96 overflow-y-auto">
            {isGenerating ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500">アイデア生成中...</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{generatedIdea}</div>
            )}
          </div>
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={generateIdea}
              disabled={isGenerating}
              className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
            >
              {isGenerating ? "生成中..." : "再生成"}
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm mb-2">参考にする過去のアイデア</h3>
          {previousIdeas.length > 0 ? (
            <div className="border border-gray-300 rounded-md p-2 h-96 overflow-y-auto">
              <ul className="space-y-2">
                {previousIdeas.map((idea) => (
                  <li key={idea.id} className="text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`idea-${idea.id}`}
                          checked={selectedPreviousIdeas.includes(idea.id)}
                          onChange={() => togglePreviousIdea(idea.id)}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`idea-${idea.id}`}
                          className="cursor-pointer truncate"
                        >
                          {idea.title}
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => showIdeaPreview(idea.id)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        プレビュー
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="border border-gray-300 rounded-md p-4 h-96 flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                関連する過去のアイデアがありません
              </p>
            </div>
          )}
        </div>
      </div>

      {/* プレビューモーダル */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                過去のアイデアプレビュー
              </h3>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="whitespace-pre-wrap">{showPreview}</div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          戻る
        </button>
        <button
          onClick={handleSubmit}
          disabled={isGenerating || !generatedIdea || !generatedIdea.trim()}
          className={`py-2 px-4 rounded-md ${
            isGenerating || !generatedIdea || !generatedIdea.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          次へ進む
        </button>
      </div>
    </div>
  );
}
