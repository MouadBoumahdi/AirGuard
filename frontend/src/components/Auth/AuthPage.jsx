import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Logo from '../../assets/logo.png';
import PlantImage from '../../assets/hero_bg.png';
import '../../index.css';

export default function AuthPage({ initialView = 'login', onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(initialView === 'login');


  const handleToggle = () => {
    const nextMode = !isLogin;
    setIsLogin(nextMode);
    localStorage.setItem('activeView', nextMode ? 'login' : 'register');
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 text-slate-800 antialiased bg-white">
      
      {/* LEFT SIDE: Form */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white py-12 relative">
        <button onClick={onClose} className="absolute top-8 left-8 text-sm font-medium text-slate-400 hover:text-slate-600 cursor-pointer">
          ← Back to home
        </button>
        
        <div className="mb-8 mt-4">
          <div className="flex items-center gap-2 font-bold text-green-700 text-2xl tracking-wide mb-6">
            <span className="p-1.5 border border-green-200 rounded-lg flex items-center justify-center">
              <img src={Logo} alt="Logo" className="h-6 w-18 object-contain" />
            </span>
            <span className="font-normal text-3xl text-slate-900 select-none">
              Air<span className="text-emerald-600">Guard</span>
            </span>
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {isLogin ? 'Monitor your environmental impact with precision.' : 'Start tracking environmental impact today.'}
          </p>
        </div>

        {isLogin ? (
          <LoginForm onLoginSuccess={onAuthSuccess} />
        ) : (
          <RegisterForm onRegisterSuccess={onAuthSuccess} />
        )}
        <p className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={handleToggle} className="font-semibold text-green-700 hover:text-green-600 cursor-pointer">
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>

      {/* RIGHT SIDE: Image */}
      <div className="relative hidden md:block bg-slate-900 overflow-hidden select-none">
        <img src={PlantImage} alt="Plant" className="absolute inset-0 object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-emerald-950/60 mix-blend-multiply" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center px-12">
          <p className="text-center max-w-sm text-3xl text-slate-300 leading-snug">
            "People are stories to cherish, not resources to manage."
          </p>
        </div>

        <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center text-xs text-slate-500 uppercase font-medium">
          <span>Emission Control Protocol</span>
          <span>Safi Operational Sector</span>
        </div>
      </div>

    </div>
  );
}