import { useState } from 'react';
import { Brain, Home, History, TrendingUp, Settings } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { EmotionAnalyzer } from './components/EmotionAnalyzer';
import { EmotionResults, EmotionData } from './components/EmotionResults';
import { AIInsights } from './components/AIInsights';
import { FeedbackHistory, HistoryItem } from './components/FeedbackHistory';
import { ErrorState } from './components/ErrorState';

type View = 'landing' | 'dashboard' | 'results';

interface AnalysisResult {
  emotions: EmotionData[];
  dominantEmotion: string;
  confidence: number;
  text: string;
}

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Mock AI emotion detection
  const analyzeEmotion = async (text: string): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simple keyword-based mock analysis
    const lowerText = text.toLowerCase();
    const emotions: EmotionData[] = [];

    // Joy keywords
    const joyScore = Math.min(
      95,
      (lowerText.match(/love|happy|great|excellent|amazing|wonderful|fantastic|perfect|delighted/g) || []).length * 15 + 5
    );
    emotions.push({ emotion: 'Joy', score: joyScore, color: '#10b981' });

    // Anger keywords
    const angerScore = Math.min(
      95,
      (lowerText.match(/angry|furious|terrible|awful|worst|hate|disgusting|unacceptable/g) || []).length * 20 + 3
    );
    emotions.push({ emotion: 'Anger', score: angerScore, color: '#ef4444' });

    // Sadness keywords
    const sadnessScore = Math.min(
      95,
      (lowerText.match(/sad|disappointed|unhappy|poor|bad|unfortunate|regret/g) || []).length * 18 + 2
    );
    emotions.push({ emotion: 'Sadness', score: sadnessScore, color: '#3b82f6' });

    // Fear keywords
    const fearScore = Math.min(
      95,
      (lowerText.match(/worried|concerned|afraid|scared|nervous|anxious|uncertain/g) || []).length * 16 + 1
    );
    emotions.push({ emotion: 'Fear', score: fearScore, color: '#a855f7' });

    // Surprise keywords
    const surpriseScore = Math.min(
      95,
      (lowerText.match(/surprised|unexpected|shocking|wow|unbelievable|incredible/g) || []).length * 14 + 4
    );
    emotions.push({ emotion: 'Surprise', score: surpriseScore, color: '#f59e0b' });

    // Normalize scores to sum to 100
    const total = emotions.reduce((sum, e) => sum + e.score, 0);
    if (total > 0) {
      emotions.forEach((e) => {
        e.score = Math.round((e.score / total) * 100);
      });
    } else {
      // Default neutral distribution
      emotions.forEach((e) => {
        e.score = 20;
      });
    }

    // Find dominant emotion
    const dominant = emotions.reduce((max, e) => (e.score > max.score ? e : max));
    const confidence = dominant.score;

    return {
      emotions,
      dominantEmotion: dominant.emotion,
      confidence,
      text,
    };
  };

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeEmotion(text);
      setCurrentResult(result);
      setView('results');

      // Add to history
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        text: result.text,
        dominantEmotion: result.dominantEmotion,
        confidence: result.confidence,
        timestamp: new Date(),
      };
      setHistory((prev) => [historyItem, ...prev]);
    } catch (err) {
      setError('Failed to analyze emotion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    // Reconstruct result from history item
    // For demo purposes, re-analyze
    handleAnalyze(item.text);
  };

  const handleRetry = () => {
    setError(null);
    setView('dashboard');
  };

  const handleNewAnalysis = () => {
    setCurrentResult(null);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1117] via-[#1a1f2e] to-[#0D1117] text-gray-100">
      {/* Navigation Bar - Only show after landing */}
      {view !== 'landing' && (
        <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-lg">Emotion AI</h1>
                  <p className="text-xs text-gray-500">Customer Feedback Analytics</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('landing')}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  title="Home"
                >
                  <Home className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNewAnalysis}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  title="New Analysis"
                >
                  <TrendingUp className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Settings">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="ml-4 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm">
                  AI
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      {view === 'landing' && <LandingPage onGetStarted={() => setView('dashboard')} />}

      {view === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Panel - Analyzer */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl mb-2">Analyze Customer Feedback</h2>
                <p className="text-gray-400 text-sm">
                  Enter customer feedback to detect emotions and gain actionable insights
                </p>
              </div>
              {error ? (
                <ErrorState message={error} onRetry={handleRetry} />
              ) : (
                <EmotionAnalyzer onAnalyze={handleAnalyze} isLoading={isLoading} />
              )}
            </div>

            {/* Sidebar - History */}
            <div>
              <FeedbackHistory history={history} onSelectItem={handleSelectHistoryItem} />
            </div>
          </div>
        </div>
      )}

      {view === 'results' && currentResult && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Action Bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl mb-1">Analysis Results</h2>
              <p className="text-sm text-gray-400">AI-powered emotion detection complete</p>
            </div>
            <button
              onClick={handleNewAnalysis}
              className="px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all"
            >
              New Analysis
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Results - 2/3 width */}
            <div className="lg:col-span-2">
              <EmotionResults
                emotions={currentResult.emotions}
                dominantEmotion={currentResult.dominantEmotion}
                confidence={currentResult.confidence}
                text={currentResult.text}
              />
            </div>

            {/* Insights - 1/3 width */}
            <div>
              <AIInsights
                dominantEmotion={currentResult.dominantEmotion}
                text={currentResult.text}
                confidence={currentResult.confidence}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}