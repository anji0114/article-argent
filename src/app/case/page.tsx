import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Article } from "@/components/view/Article";
import { createSupabaseServer } from "@/utils/supabase/server";

const CasePage = async () => {
  const supabase = await createSupabaseServer();
  const { data: cases, error } = await supabase.from("cases").select("*");
  if (error) {
    throw error;
  }

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
        {cases.map((caseItem) => (
          <Article
            key={caseItem.id}
            title={caseItem.title || ""}
            type="case"
            href={`/case/${caseItem.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CasePage;
