import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const EmptyState: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}> = ({ title, description, icon, action }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center mb-4">
        {icon || <AlertCircle className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export const ErrorState: React.FC<{
  title?: string;
  message: string;
  onRetry?: () => void;
}> = ({ title = 'Data Pipeline Interruption', message, onRetry }) => {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-rose-900 shadow-xs max-w-xl mx-auto my-6">
      <div className="flex items-start gap-3.5">
        <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-rose-950">{title}</h4>
          <p className="mt-1 text-xs text-rose-800 leading-relaxed">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Connection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
