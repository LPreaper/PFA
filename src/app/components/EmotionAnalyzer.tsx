import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface EmotionAnalyzerProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export function EmotionAnalyzer({ onAnalyze, isLoading }: EmotionAnalyzerProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-3">
            Customer Feedback
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter customer feedback here...

Example: 'I absolutely love this product! The delivery was super fast and the quality exceeded my expectations. Will definitely order again!'"
            className="w-full h-48 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25 disabled:shadow-none"
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing emotions...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze Emotion
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
