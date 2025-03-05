"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export const CaseEdit = ({
  data,
}: {
  data: { title: string; content: string };
}) => {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setPrompt(data.content);
    }
  }, [data]);

  return (
    <div className="p-10 max-w-[1000px] mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">ケースの編集</p>
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
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="記事の内容を入力してください"
            className="min-h-[600px] leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
