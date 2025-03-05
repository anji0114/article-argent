// components/ideas/CaseSelector.tsx
"use client";

import { Database } from "@/types/schema";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

type Case = Database["public"]["Tables"]["cases"]["Row"];

interface CaseSelectorProps {
  onCaseSelected: (caseId: string) => void;
  onBack: () => void;
}

export default function CaseSelector({
  onCaseSelected,
  onBack,
}: CaseSelectorProps) {
  const supabase = createSupabaseClient();
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from("cases")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setCases(data || []);
      } catch (error) {
        console.error("Error fetching cases:", error);
        alert("ケースの読み込み中にエラーが発生しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, []);

  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedCaseId) {
      onCaseSelected(selectedCaseId);
    } else {
      alert("ケースを選択してください");
    }
  };

  // ケースの内容のプレビュー用に短縮する関数
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        ステップ2: 参考にするケースを選択
      </h2>
      <p className="mb-4 text-gray-600">
        新しいアイデアの作成に参考にしたい過去のケースを選択してください。
        選択したケースの内容を元に、Claude AIがアイデアの構成を提案します。
      </p>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ケースを検索..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-6 max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-4">読み込み中...</div>
        ) : filteredCases.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            ケースが見つかりませんでした
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredCases.map((caseItem) => (
              <li
                key={caseItem.id}
                className={`p-3 border rounded-md cursor-pointer transition-all ${
                  selectedCaseId === caseItem.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
                onClick={() => setSelectedCaseId(caseItem.id)}
              >
                <h3 className="font-medium">{caseItem.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {truncateContent(caseItem.content ?? "")}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  作成日:{" "}
                  {new Date(caseItem.created_at).toLocaleDateString("ja-JP")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          戻る
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedCaseId}
          className={`py-2 px-4 rounded-md ${
            selectedCaseId
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          次へ進む
        </button>
      </div>
    </div>
  );
}
