/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import IdeaThemeSelector from "@/components/view/IdeaThemeSelector";
import CaseSelector from "@/components/view/IdeaCaseSelector";
import IdeaOutlineEditor from "@/components/view/IdeaOutlineEditor";
import IdeaGenerator from "@/components/view/IdeaGenerator";
import IdeaEditor from "@/components/view/IdeaEditor";
import { createSupabaseClient } from "@/utils/supabase/client";

// ステップの定義
const STEPS = {
  THEME_SELECTION: 0,
  CASE_SELECTION: 1,
  OUTLINE_CREATION: 2,
  IDEA_GENERATION: 3,
  IDEA_EDITING: 4,
};

export default function CreateIdeaPage() {
  const router = useRouter();
  const supabase = createSupabaseClient();
  const [currentStep, setCurrentStep] = useState(STEPS.THEME_SELECTION);
  const [theme, setTheme] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [outline, setOutline] = useState<string>("");
  const [generatedIdea, setGeneratedIdea] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previousIdeas, setPreviousIdeas] = useState<any[]>([]);

  // ケースデータを取得
  useEffect(() => {
    if (selectedCaseId) {
      const fetchCase = async () => {
        const { data, error } = await supabase
          .from("cases")
          .select("*")
          .eq("id", selectedCaseId)
          .single();

        if (error) {
          console.error("Error fetching case:", error);
          return;
        }

        setSelectedCase(data);
      };

      fetchCase();
    }
  }, [selectedCaseId]);

  // 過去のアイデアを取得
  useEffect(() => {
    if (theme && currentStep >= STEPS.OUTLINE_CREATION) {
      const fetchPreviousIdeas = async () => {
        // テーマに関連する過去のアイデアを検索
        const { data, error } = await supabase
          .from("ideas")
          .select("*")
          .ilike("title", `%${theme}%`)
          .limit(5);

        if (error) {
          console.error("Error fetching previous ideas:", error);
          return;
        }

        setPreviousIdeas(data || []);
      };

      fetchPreviousIdeas();
    }
  }, [theme, currentStep]);

  // テーマが選択されたときの処理
  const handleThemeSelected = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setCurrentStep(STEPS.CASE_SELECTION);
  };

  // ケースが選択されたときの処理
  const handleCaseSelected = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentStep(STEPS.OUTLINE_CREATION);
  };

  // アウトラインが作成されたときの処理
  const handleOutlineCreated = (createdOutline: string) => {
    setOutline(createdOutline);
    setCurrentStep(STEPS.IDEA_GENERATION);
  };

  // アイデアが生成されたときの処理
  const handleIdeaGenerated = (idea: string) => {
    setGeneratedIdea(idea);
    setCurrentStep(STEPS.IDEA_EDITING);
  };

  // アイデアが保存されたときの処理
  const handleIdeaSaved = async (finalIdea: string) => {
    setIsLoading(true);

    try {
      // アイデアをSupabaseに保存
      const { error } = await supabase
        .from("ideas")
        .insert([
          {
            title: theme,
            content: finalIdea,
            case_id: selectedCaseId,
            outline: outline,
          },
        ])
        .select();

      if (error) {
        console.error("Error saving idea:", error);
        alert("アイデアの保存中にエラーが発生しました。");
        setIsLoading(false);
        return;
      }

      // 保存成功後、一覧ページにリダイレクト
      router.push("/");
    } catch (error) {
      console.error("Error in saving process:", error);
      alert("アイデアの保存中にエラーが発生しました。");
      setIsLoading(false);
    }
  };

  // 前のステップに戻る処理
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        新しいマーケティングアイデアの作成
      </h1>

      {/* ステップインジケーター */}
      <div className="mb-8">
        <ol className="flex items-center w-full">
          {[
            "テーマ選択",
            "ケース選択",
            "アウトライン作成",
            "アイデア生成",
            "編集と保存",
          ].map((step, index) => (
            <li
              key={index}
              className={`flex items-center ${
                index < currentStep
                  ? "text-blue-600"
                  : index === currentStep
                  ? "text-blue-500"
                  : "text-gray-500"
              }`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index < currentStep
                    ? "bg-blue-100 text-blue-600"
                    : index === currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {index + 1}
              </span>
              <span className="ml-2">{step}</span>
              {index < 4 && <span className="mx-2 text-gray-300">→</span>}
            </li>
          ))}
        </ol>
      </div>

      {/* 各ステップのコンポーネント */}
      {currentStep === STEPS.THEME_SELECTION && (
        <IdeaThemeSelector onThemeSelected={handleThemeSelected} />
      )}

      {currentStep === STEPS.CASE_SELECTION && (
        <CaseSelector onCaseSelected={handleCaseSelected} onBack={handleBack} />
      )}

      {currentStep === STEPS.OUTLINE_CREATION && selectedCase && (
        <IdeaOutlineEditor
          theme={theme}
          selectedCase={selectedCase}
          onOutlineCreated={handleOutlineCreated}
          onBack={handleBack}
        />
      )}

      {currentStep === STEPS.IDEA_GENERATION && (
        <IdeaGenerator
          theme={theme}
          selectedCase={selectedCase}
          outline={outline}
          previousIdeas={previousIdeas}
          onIdeaGenerated={handleIdeaGenerated}
          onBack={handleBack}
        />
      )}

      {currentStep === STEPS.IDEA_EDITING && (
        <IdeaEditor
          theme={theme}
          generatedIdea={generatedIdea}
          onIdeaSaved={handleIdeaSaved}
          isLoading={isLoading}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
