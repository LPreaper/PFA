import { Lightbulb, CheckCircle2 } from 'lucide-react';

interface AIInsightsProps {
  dominantEmotion: string;
  text: string;
  confidence: number;
}

export function AIInsights({ dominantEmotion, text, confidence }: AIInsightsProps) {
  // Generate contextual insights based on emotion
  const getInsights = () => {
    const emotion = dominantEmotion.toLowerCase();

    const insights: Record<string, { summary: string; actions: string[] }> = {
      joy: {
        summary: 'The customer expresses strong satisfaction and positive sentiment. This feedback indicates a delightful experience with your product or service.',
        actions: [
          'Share this positive feedback with your team to boost morale',
          'Consider reaching out to request a testimonial or review',
          'Analyze what went well to replicate this experience for other customers',
          'Use this as a case study for marketing materials'
        ]
      },
      sadness: {
        summary: 'The customer expresses disappointment or dissatisfaction. This feedback suggests an experience that fell short of expectations.',
        actions: [
          'Reach out personally to understand their concerns in detail',
          'Offer a solution or compensation to address their disappointment',
          'Investigate the root cause to prevent similar issues',
          'Follow up after resolution to ensure satisfaction'
        ]
      },
      anger: {
        summary: 'The customer shows frustration or anger, indicating a significant issue that requires immediate attention.',
        actions: [
          'Prioritize immediate response - escalate to senior support',
          'Acknowledge their frustration and apologize for the experience',
          'Provide concrete steps being taken to resolve the issue',
          'Implement preventive measures to avoid recurrence'
        ]
      },
      fear: {
        summary: 'The customer expresses concern or anxiety about the product, service, or experience.',
        actions: [
          'Provide clear, reassuring communication to address concerns',
          'Offer detailed information about safety, security, or reliability',
          'Connect them with a specialist who can provide expert guidance',
          'Follow up to ensure their concerns have been fully addressed'
        ]
      },
      surprise: {
        summary: 'The customer experienced something unexpected. This could be positive or negative depending on context.',
        actions: [
          'Investigate whether the surprise was positive or negative',
          'If positive, amplify the delightful elements in other experiences',
          'If negative, clarify expectations and improve communication',
          'Use this feedback to calibrate customer expectations'
        ]
      }
    };

    return insights[emotion] || {
      summary: 'The feedback has been analyzed for emotional content.',
      actions: ['Review the feedback carefully', 'Respond appropriately to customer sentiment']
    };
  };

  const { summary, actions } = getInsights();

  return (
    <div className="space-y-6">
      {/* AI Analysis Summary */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Lightbulb className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg mb-2">AI Analysis</h3>
            <p className="text-gray-300 leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Recommended Actions
        </h3>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-black/20 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-sm text-blue-400 mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence Indicator */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Analysis Confidence</span>
          <span className="text-blue-400">{confidence}%</span>
        </div>
      </div>
    </div>
  );
}
