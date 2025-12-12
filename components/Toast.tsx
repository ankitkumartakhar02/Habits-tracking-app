
import React from 'react';
import { CheckCircleIcon } from './Icons';

interface ToastProps {
  message: string;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show }) => {
  return (
    <div
      className={`
        fixed bottom-8 left-1/2 -translate-x-1/2
        flex items-center gap-3 px-6 py-3
        bg-white/80 backdrop-blur-lg border border-slate-200/80
        rounded-full shadow-lg
        transition-all duration-300 ease-in-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <CheckCircleIcon className="w-6 h-6 text-[rgb(var(--color-primary))]" />
      <span className="font-semibold text-slate-700">{message}</span>
    </div>
  );
};

export default Toast;
