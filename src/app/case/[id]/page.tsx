import { createSupabaseServer } from "@/utils/supabase/server";
import { CaseEdit } from "@/components/view/CaseEdit";
import { redirect } from "next/navigation";

type CaseDetailProps = {
  params: Promise<{ id: string }>;
};

const CaseDetail = async ({ params }: CaseDetailProps) => {
  const supabase = await createSupabaseServer();
  const { id } = await params;
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("id", id)
    .single();

  if (!data || error) return redirect("/case");

  return (
    <CaseEdit
      data={{
        title: data.title ?? "",
        content: data.content ?? "",
      }}
    />
  );
};

export default CaseDetail;
