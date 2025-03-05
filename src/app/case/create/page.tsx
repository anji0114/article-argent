"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseClient } from "@/utils/supabase/client";
export default function CreateCase() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const supabase = createSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !content) {
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.from("cases").insert({
        title,
        content,
      });
      if (error) {
        console.log(error);
        alert("エラーが発生しました");
        return;
      }

      alert("作成!!");
      setTitle("");
      setContent("");
    } catch {
      alert("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-[1000px] mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">ケースの作成</p>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "作成中..." : "ケース生成"}
        </Button>
      </div>
      <div className="mt-10 space-y-2">
        <div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力してください"
          />
        </div>
        <div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="記事の内容を入力してください"
            className="min-h-[200px]"
          />
        </div>
      </div>
    </div>
  );
}
