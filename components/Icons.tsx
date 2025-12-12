
import React from 'react';

export const PlusCircleIcon: React.FC<{className?: string}> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const FireIcon: React.FC<{className?: string}> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM10 18a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    <path d="M10 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
  </svg>
);


export const TrashIcon: React.FC<{className?: string}> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L13 12l-1.293-1.293a1 1 0 010-1.414L14 7m5 5l2.293 2.293a1 1 0 010 1.414L19 18l-1.293-1.293a1 1 0 010-1.414L20 13M3 7l2.293 2.293a1 1 0 010 1.414L3 13m0 0l-2.293 2.293a1 1 0 01-1.414 0L1 13m11-6l-2.293-2.293a1 1 0 00-1.414 0L7 7m11 5l-2.293-2.293a1 1 0 00-1.414 0L13 12m-2 2l-2.293 2.293a1 1 0 01-1.414 0L5 17m11 5l-2.293-2.293a1 1 0 00-1.414 0L13 22" />
    </svg>
);
