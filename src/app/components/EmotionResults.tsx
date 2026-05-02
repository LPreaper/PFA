import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';

export interface EmotionData {
  emotion: string;
  score: number;
  color: string;
}

interface EmotionResultsProps {
  emotions: EmotionData[];
  dominantEmotion: string;
  confidence: number;
  text: string;
}

const emotionConfig: Record<string, { color: string; bg: string; label: string }> = {
  joy: { color: '#10b981', bg: 'bg-emerald-500/20', label: 'Joy' },
  sadness: { color: '#3b82f6', bg: 'bg-blue-500/20', label: 'Sadness' },
  anger: { color: '#ef4444', bg: 'bg-red-500/20', label: 'Anger' },
  fear: { color: '#a855f7', bg: 'bg-purple-500/20', label: 'Fear' },
  surprise: { color: '#f59e0b', bg: 'bg-amber-500/20', label: 'Surprise' },
};

export function EmotionResults({ emotions, dominantEmotion, confidence, text }: EmotionResultsProps) {
  const config = emotionConfig[dominantEmotion.toLowerCase()];

  return (
    <div className="space-y-6">
      {/* Dominant Emotion Card */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400 mb-2">Detected Emotion</p>
            <h2 className="text-4xl flex items-center gap-3">
              {config?.label || dominantEmotion}
              <span className={`px-3 py-1 rounded-full text-sm ${config?.bg} border border-white/10`}>
                {confidence}% confidence
              </span>
            </h2>
          </div>
          <TrendingUp className="w-10 h-10 text-blue-400" strokeWidth={1.5} />
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            Emotion Intensity
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={emotions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="emotion"
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f3f4f6'
                }}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {emotions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-purple-400" />
            Emotion Distribution
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={emotions}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ emotion, score }) => `${emotion}: ${score}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="score"
              >
                {emotions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f3f4f6'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Emotion Tags */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg mb-4">Emotion Breakdown</h3>
        <div className="flex flex-wrap gap-3">
          {emotions.map((emotion) => {
            const config = emotionConfig[emotion.emotion.toLowerCase()];
            return (
              <div
                key={emotion.emotion}
                className={`px-4 py-2 rounded-full border border-white/10 ${config?.bg} flex items-center gap-2`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: emotion.color }}
                />
                <span className="text-sm">
                  {config?.label || emotion.emotion}: {emotion.score}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Original Text */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg mb-3">Analyzed Text</h3>
        <p className="text-gray-300 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
