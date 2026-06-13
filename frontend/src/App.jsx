import React, { useState } from 'react';
import AuthPage from './components/Auth/AuthPage';

export default function App() {
  // 'view' state manages what screen is active: 'home', 'login', or 'register'
  const [view, setView] = useState('home');

  // If the user chooses login or register, show the AuthPage component instead
  if (view === 'login' || view === 'register') {
    return <AuthPage initialView={view} onClose={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col justify-between">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="max-w-7xl w-full mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-green-700 text-xl tracking-wide">
          <span className="p-1 bg-green-50 border border-green-200 rounded-md">⭐</span>
          <span>OCP Platform</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('login')} 
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={() => setView('register')} 
            className="text-sm font-semibold bg-green-800 text-white px-4 py-2 rounded-xl shadow-xs hover:bg-green-700 cursor-pointer transition-colors"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-3xl mx-auto px-6 py-20 text-center my-auto flex flex-col items-center">
        <span className="text-xs font-bold tracking-widest text-green-700 uppercase bg-green-50 border border-green-100 rounded-full px-3 py-1 mb-6">
          Sustainability Intelligence
        </span>
        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Monitor your environmental impact with <span className="text-green-700">precision</span>.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
          An enterprise-grade platform built to track metrics, air quality, and optimization scores seamlessly across teams.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={() => setView('register')}
            className="bg-green-800 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-md hover:bg-green-700 transition-colors cursor-pointer"
          >
            Create Free Account
          </button>
          <button 
            onClick={() => setView('login')}
            className="bg-white text-slate-700 border border-slate-200 font-semibold text-sm px-8 py-3.5 rounded-xl shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Access Dashboard
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-100 max-w-7xl w-full mx-auto px-6">
        &copy; {new Date().getFullYear()} OCP Platform. All rights reserved.
      </footer>

    </div>
  );
}