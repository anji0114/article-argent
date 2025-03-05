import { createSupabaseServer } from "@/utils/supabase/server";
import { CaseEdit } from "@/components/view/CaseEdit";
import { redirect } from "next/navigation";

const CaseDetail = async ({ params }: { params: { id: string } }) => {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("id", params.id)
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
