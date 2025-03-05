// components/ideas/IdeaEditor.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface IdeaEditorProps {
  theme: string;
  generatedIdea: string;
  onIdeaSaved: (finalIdea: string) => void;
  isLoading: boolean;
  onBack: () => void;
}

export default function IdeaEditor({
  theme,
  generatedIdea,
  onIdeaSaved,
  isLoading,
  onBack
}: IdeaEditorProps) {
  const [editedIdea, setEditedIdea] = useState(generatedIdea);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedIdea.trim()) {
      onIdeaSaved(editedIdea);
    } else {
      alert('アイデアの内容を入力してください');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">ステップ5: アイデアの編集と保存</h2>
      <p className="mb-4 text-gray-600">
        生成されたアイデアを確認し、必要に応じて編集してください。
        内容に問題がなければ保存ボタンをクリックしてください。
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="idea-title" className="block text-sm font-medium text-gray-700 mb-1">
            アイデアのタイトル
          </label>
          <input
            id="idea-title"
            type="text"
            value={theme}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
          />
          <p className="mt-1 text-xs text-gray-500">
            タイトルは最初に設定したテーマが使用されます
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="idea-content" className="block text-sm font-medium text-gray-700 mb-1">
            アイデアの内容
          </label>
          <textarea
            id="idea-content"
            value={editedIdea}
            onChange={(e) => setEditedIdea(e.target.value)}
            className="w-full h-96 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="アイデアの内容を入力してください..."
          ></textarea>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
          >
            戻る
          </button>
          <div className="space-x-2">
            <button
              type="button"
              onClick={() => router.push('/ideas')}
              disabled={isLoading}
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isLoading || !editedIdea.trim()}
              className={`py-2 px-4 rounded-md ${
                isLoading || !editedIdea.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? '保存中...' : '保存する'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}