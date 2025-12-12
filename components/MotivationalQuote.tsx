
import React, { useState, useEffect } from 'react';
import { getMotivationalQuote } from '../services/geminiService';

const MotivationalQuote: React.FC = () => {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const newQuote = await getMotivationalQuote();
      setQuote(newQuote);
    } catch (error) {
      console.error('Failed to fetch motivational quote:', error);
      setQuote("The journey of a thousand miles begins with a single step.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg animate-fade-in" style={{animationDelay: '200ms'}}>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">Mind Boost</h3>
      {loading ? (
        <div className="animate-pulse space-y-2">
            <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
            <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
        </div>
      ) : (
        <blockquote className="border-l-4 border-[var(--color-accent)] pl-4">
          <p className="text-slate-200 italic">"{quote}"</p>
        </blockquote>
      )}
    </div>
  );
};

export default MotivationalQuote;
