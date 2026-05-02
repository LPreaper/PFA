import { Clock, ChevronRight } from 'lucide-react';

export interface HistoryItem {
  id: string;
  text: string;
  dominantEmotion: string;
  confidence: number;
  timestamp: Date;
}

interface FeedbackHistoryProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
}

const emotionColors: Record<string, string> = {
  joy: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
  sadness: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  anger: 'text-red-400 bg-red-500/20 border-red-500/30',
  fear: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  surprise: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
};

export function FeedbackHistory({ history, onSelectItem }: FeedbackHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
        <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">No analysis history yet</p>
        <p className="text-sm text-gray-500 mt-1">
          Your analyzed feedback will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-400" />
        Analysis History
      </h3>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {history.map((item) => {
          const emotionColor = emotionColors[item.dominantEmotion.toLowerCase()] || 'text-gray-400 bg-gray-500/20 border-gray-500/30';

          return (
            <button
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="w-full text-left p-4 bg-black/20 hover:bg-black/30 rounded-xl border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                    {item.text}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded-full text-xs border ${emotionColor}`}>
                      {item.dominantEmotion}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.confidence}% confidence
                    </span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-500">
                      {item.timestamp.toLocaleString()}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
