import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Logo from '../../assets/logo.png';
import PlantImage from '../../assets/hero_bg.png';
import '../../index.css';

export default function AuthPage({ onClose, onAuthSuccess }) {
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 text-slate-800 antialiased bg-white">
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

          {authView === 'login' ? (
            <>
              <h1 className="text-3xl font-extrabold text-slate-900">Welcome back</h1>
              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue monitoring environmental conditions.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-extrabold text-slate-900">Create your account</h1>
              <p className="mt-2 text-sm text-slate-500">
                Join AirGuard to monitor air quality and environmental conditions.
              </p>
            </>
          )}
        </div>

        {authView === 'login' ? (
          <LoginForm 
            onLoginSuccess={onAuthSuccess}
            onRegisterClick={() => setAuthView('register')}
          />
        ) : (
          <RegisterForm 
            onRegisterSuccess={() => setAuthView('login')}
            onBackToLogin={() => setAuthView('login')}
          />
        )}
      </div>

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