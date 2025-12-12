
import React from 'react';
import { TargetIcon, GoogleIcon } from './Icons';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute h-full w-full bg-[radial-gradient(closest-side,#38bdf8,transparent)]" style={{animation: 'move-aurora 15s ease-in-out infinite'}}></div>
              <div className="absolute h-full w-full bg-[radial-gradient(closest-side,#a78bfa,transparent)]" style={{animation: 'move-aurora 20s ease-in-out infinite reverse', animationDelay: '5s'}}></div>
              <div className="absolute h-full w-full bg-[radial-gradient(closest-side,#4ade80,transparent)]" style={{animation: 'move-aurora 25s ease-in-out infinite', animationDelay: '10s'}}></div>
          </div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-lg text-center animate-fade-in">
              <div className="flex items-center justify-center gap-4 mb-4">
                  <TargetIcon className="w-12 h-12 text-cyan-400" />
                   <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">
                      DHabits Tracker
                  </h1>
              </div>
              <p className="text-slate-300 mb-8">
                  Sign in to begin your journey of discipline and self-mastery.
              </p>
              <button
                  onClick={onLogin}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-slate-800 font-semibold rounded-lg hover:bg-slate-200 transition-colors duration-300"
              >
                  <GoogleIcon />
                  <span>Sign in with Google</span>
              </button>
          </div>
      </div>
    </>
  );
};

export default LoginScreen;
