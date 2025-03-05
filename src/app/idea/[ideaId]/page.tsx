import { Button } from "@/components/ui/button";
import { createSupabaseServer } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

const IdeaDetail = async ({ params }: { params: { ideaId: string } }) => {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .eq("id", params.ideaId)
    .single();

  if (error || !data) return notFound();

  return (
    <div className="p-10 max-w-[1000px] mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">ケースの編集</p>
        <Button>保存</Button>
      </div>
      <div className="mt-10 space-y-10">
        <div className="text-2xl font-bold">{data.title}</div>
        <div className="space-y-2">
          <p className="font-bold text-lg">内容</p>
          <p className="whitespace-pre-wrap border p-10 text-sm leading-relaxed max-h-[500px] overflow-y-auto">
            {data.content}
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-bold text-lg">アウトライン</p>
          <p className="whitespace-pre-wrap border p-10 text-sm leading-relaxed max-h-[300px] overflow-y-auto">
            {data.outline}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;
