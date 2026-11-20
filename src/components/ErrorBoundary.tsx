import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
  detail?: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    let message = error.message || 'An unexpected application error occurred.';
    let detail: string | undefined;

    try {
      const parsed = JSON.parse(message);
      if (parsed && typeof parsed.error === 'string' && parsed.operationType) {
        message = `Database ${parsed.operationType} error on ${parsed.path ?? 'collection'}`;
        detail = parsed.error;
      }
    } catch {
      // Plain error message
    }

    return { hasError: true, message, detail };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
          <div className="max-w-md w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-8 shadow-sm">
            <div className="flex items-center gap-3 text-amber-700 dark:text-amber-400 mb-4">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h1 className="font-display text-xl font-semibold">Something interrupted the kitchen</h1>
            </div>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-2">
              {this.state.message}
            </p>
            {this.state.detail && (
              <p className="text-xs font-mono-tabular text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/70 rounded-lg p-3 mb-5 break-words">
                {this.state.detail}
              </p>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
