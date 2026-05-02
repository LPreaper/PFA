import { Brain, Sparkles, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <Brain className="w-20 h-20 text-blue-400 relative" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl tracking-tight">
            AI Emotion Detection for{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Customer Feedback
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Transform customer feedback into actionable insights. Our AI analyzes emotions in real-time to help you understand customer sentiment and improve product experience.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
            <Sparkles className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-gray-400">
              Advanced NLP models detect subtle emotional nuances in customer feedback
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
            <TrendingUp className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg mb-2">Real-time Insights</h3>
            <p className="text-sm text-gray-400">
              Get instant emotion detection with confidence scores and detailed breakdowns
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
            <Brain className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg mb-2">Actionable Recommendations</h3>
            <p className="text-sm text-gray-400">
              Receive AI-generated suggestions to address customer concerns effectively
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            <span className="flex items-center gap-2">
              Analyze Feedback
              <Sparkles className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
