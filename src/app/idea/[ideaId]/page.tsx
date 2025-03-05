"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function IdeaDetail() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");

  return (
    <div className="p-10 max-w-[1000px] mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">アイデアの編集</p>
        <Button>保存</Button>
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
            className="min-h-[200px]"
          />
        </div>
      </div>
    </div>
  );
}
