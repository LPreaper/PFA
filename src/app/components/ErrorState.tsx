import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-red-500/20 rounded-full">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <div>
          <h3 className="text-lg mb-1">Analysis Error</h3>
          <p className="text-sm text-gray-400">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-500/30 hover:border-red-500/50 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
