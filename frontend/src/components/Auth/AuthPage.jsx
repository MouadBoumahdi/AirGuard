import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Logo from '../../assets/logo.png';
import PlantImage from '../../assets/hero_bg.png';
import '../../index.css'

// We receive 'onClose' as a prop so the user can go back to the landing page
export default function AuthPage({ initialView = 'login', onClose }) {
  const [isLogin, setIsLogin] = useState(initialView === 'login');

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 text-slate-800 antialiased font-sans bg-white">
      
      {/* LEFT SIDE: Form Container */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white py-12 relative">
        
        {/* Back to Home Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 left-8 text-sm font-medium text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer transition-colors"
        >
          ← Back to home
        </button>
        
        {/* Headings */}
        <div className="mb-8 mt-4">
          <div className="flex items-center gap-2 font-bold text-green-700 text-2xl tracking-wide mb-6">
            <span className="p-1.5 border border-green-200 rounded-lg"><img src={Logo} alt="OCP Logo" className="h-6 w-18" /></span>
            <span className="font-normal text-3xl sm:text-6xl lg:text-3xl tracking-normal font-cause text-slate-900 block select-none">
              Air<span className="text-emerald-600">Guard</span>
            </span>
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {isLogin ? 'Monitor your environmental impact with precision.' : 'Start tracking environmental impact today.'}
          </p>
        </div>

        {/* Render the correct form based on state */}
        {isLogin ? <LoginForm /> : <RegisterForm />}

        {/* Toggle Navigation Link */}
        <p className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="font-semibold text-green-700 hover:text-green-600 transition-colors cursor-pointer"
          >
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>

      {/* RIGHT SIDE: Visual Split Screen Graphics */}
      <div className="relative hidden md:block bg-slate-900 overflow-hidden font-sans select-none">
        {/* Background Image & Overlay Layer */}
        <img src={PlantImage} alt="Stewardship Plant" className="absolute inset-0 object-cover w-full h-full scale-105 motion-safe:animate-[subtle-zoom_20s_ease-out_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-emerald-950/60 mix-blend-multiply" />
        
        

        {/* CENTERED AREA: Quote + Telemetry Cards */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-12 lg:px-20">
          
          {/* THE ECO-GUARD QUOTE BLOCK */}
          <div className="text-center max-w-sm mb-10">
            <p className="font-cause text-3xl sm:text-4xl text-slate-300 leading-snug drop-shadow-md">
              "When the wind turns toward the city, safety must silence production."
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-auto mt-4" />
          </div>

        
        </div>

        {/* BOTTOM LEFT: Industrial System Subtext Footer */}
        <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center text-[11px] text-slate-500 tracking-wider uppercase font-medium">
          <span>Emission Control Protocol</span>
          <span>Safi Operational Sector</span>
        </div>
      </div>

    </div>
  );
}