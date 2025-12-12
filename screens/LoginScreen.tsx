
import React from 'react';
import { TargetIcon, GoogleIcon } from '../components/Icons';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-200/80 shadow-2xl text-center animate-fade-in">
        <div className="flex items-center justify-center gap-4 mb-4">
          <TargetIcon className="w-12 h-12 text-[rgb(var(--color-primary))]" />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)]">
            DHabits Tracker
          </h1>
        </div>
        <p className="text-slate-600 mb-8">
          Sign in to begin your journey of discipline and self-mastery.
        </p>
        <button
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-slate-800 font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <GoogleIcon />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
