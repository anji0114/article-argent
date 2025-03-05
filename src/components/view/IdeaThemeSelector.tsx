'use client';

import { useState } from 'react';

interface IdeaThemeSelectorProps {
  onThemeSelected: (theme: string) => void;
}

export default function IdeaThemeSelector({ onThemeSelected }: IdeaThemeSelectorProps) {
  const [theme, setTheme] = useState('');
  const [suggestions] = useState<string[]>([
    'BtoB企業のリード獲得戦略',
    'ECサイトのコンバージョン率向上',
    'ブランド認知度向上キャンペーン',
    'SNSエンゲージメント戦略',
    'ユーザー体験の改善によるリテンション向上',
    'コンテンツマーケティング戦略',
    'デジタル広告の最適化手法',
    'メールマーケティングの効率化'
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (theme.trim()) {
      onThemeSelected(theme);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTheme(suggestion);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">ステップ1: マーケティングアイデアのテーマを決定</h2>
      <p className="mb-4 text-gray-600">
        作成したいマーケティングアイデアのテーマや目的を入力してください。
        具体的なテーマほど、より関連性の高いアイデアが生成されます。
      </p>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
            テーマ
          </label>
          <input
            type="text"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="例: BtoB企業のリード獲得戦略"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          次へ進む
        </button>
      </form>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">おすすめテーマ</h3>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}