// components/ideas/IdeaOutlineEditor.tsx
"use client";

import { useState, useEffect } from "react";

interface IdeaOutlineEditorProps {
  theme: string;
  selectedCase: {
    id: string;
    title: string;
    content: string;
  };
  onOutlineCreated: (outline: string) => void;
  onBack: () => void;
}

export default function IdeaOutlineEditor({
  theme,
  selectedCase,
  onOutlineCreated,
  onBack,
}: IdeaOutlineEditorProps) {
  const [outline, setOutline] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // コンポーネントがマウントされたときに自動でアウトラインを生成
    generateOutline();
  }, []);

  const generateOutline = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-outline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme,
          caseTitle: selectedCase.title,
          caseContent: selectedCase.content,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("APIエラーレスポンス:", errorText);
        throw new Error(
          `アウトライン生成に失敗しました (${response.status}): ${errorText}`
        );
      }

      const data = await response.json();

      if (!data.outline) {
        throw new Error("APIレスポンスにoutlineフィールドがありません");
      }

      setOutline(data.outline);
    } catch (error) {
      console.error("Error generating outline:", error);
      setOutline(
        "アウトラインの生成中にエラーが発生しました。手動で入力するか、もう一度生成をお試しください。\nエラー詳細: " +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (outline.trim()) {
      onOutlineCreated(outline);
    } else {
      alert("アウトラインを入力または生成してください");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        ステップ3: アイデアの構成を確認・編集
      </h2>
      <p className="mb-4 text-gray-600">
        選択されたテーマとケースを元に、AIがアイデアの構成を提案しました。
        必要に応じて編集してください。この構成をもとにアイデアが生成されます。
      </p>

      <div className="mb-4 p-4 bg-gray-50 rounded-md">
        <h3 className="font-medium mb-2">参考情報</h3>
        <p className="text-sm mb-1">
          <span className="font-medium">テーマ:</span> {theme}
        </p>
        <p className="text-sm mb-1">
          <span className="font-medium">選択したケース:</span>{" "}
          {selectedCase.title}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="outline"
              className="block text-sm font-medium text-gray-700"
            >
              アイデア構成
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {isEditing ? "編集を完了" : "編集する"}
              </button>
              <button
                type="button"
                onClick={generateOutline}
                disabled={isGenerating}
                className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
              >
                {isGenerating ? "生成中..." : "再生成"}
              </button>
            </div>
          </div>

          {isEditing ? (
            <textarea
              id="outline"
              value={outline}
              onChange={(e) => setOutline(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="アイデアの構成を入力してください..."
              disabled={isGenerating}
            ></textarea>
          ) : (
            <div className="w-full h-64 p-3 border border-gray-300 rounded-md overflow-y-auto bg-white">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-500">アウトライン生成中...</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{outline}</div>
              )}
            </div>
          )}
          <p className="mt-1 text-sm text-gray-500">
            アイデアの構成には、想定される状況、課題、解決策を含めてください。
          </p>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            戻る
          </button>
          <button
            type="submit"
            disabled={isGenerating || !outline.trim()}
            className={`py-2 px-4 rounded-md ${
              isGenerating || !outline.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            次へ進む
          </button>
        </div>
      </form>
    </div>
  );
}
