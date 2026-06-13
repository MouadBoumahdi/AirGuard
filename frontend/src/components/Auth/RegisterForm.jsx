import React, { useState } from 'react';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Registration details:", { name, email, password, passwordConfirmation });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Full Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all"
          required
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Email Address</label>
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
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all"
          required
        />
      </div>

      {/* Confirm Password Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Confirm Password</label>
        <input 
          type="password" 
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
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
        <span>Create Account</span>
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </button>
    </form>
  );
}