import React, { useState } from 'react';

export default function LoginForm({ setIsLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Submitting Login details:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Email Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Corporate Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all"
          required
        />
      </div>

      {/* Password Input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Password</label>
          <a href="#" className="text-xs font-semibold text-green-700 hover:underline">Forgot Password?</a>
        </div>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all"
          required
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full mt-2 bg-green-800 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2 group cursor-pointer"
      >
        <span>Sign In</span>
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </button>
    </form>
  );
}