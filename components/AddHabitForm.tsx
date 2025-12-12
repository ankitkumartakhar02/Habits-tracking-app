
import React, { useState } from 'react';

interface AddHabitFormProps {
  onAddHabit: (name: string) => void;
  onCancel: () => void;
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ onAddHabit, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddHabit(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4 p-4 bg-black/20 rounded-lg animate-slide-down">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., Read for 15 minutes"
        className="flex-grow bg-slate-900/50 text-white placeholder-slate-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-white/10"
        autoFocus
      />
      <div className="flex gap-2">
        <button 
          type="submit" 
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold rounded-md transition-opacity"
        >
          Add
        </button>
         <button 
          type="button" 
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 bg-slate-600/50 hover:bg-slate-600/80 text-white font-semibold rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddHabitForm;
