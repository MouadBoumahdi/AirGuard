import React, { useState } from 'react';
import API from '../../api';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation // Matches Laravel validation key
      });

      const { token } = response.data.authorisation;
      const { role } = response.data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      alert('Account registered successfully as a Viewer!');
   
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;

        // 1. Check if Laravel wrapped validation errors inside a dedicated 'errors' object
        if (data.errors) {
          const firstFieldKey = Object.keys(data.errors)[0]; // e.g., 'email' or 'password'
          setError(data.errors[firstFieldKey][0]); // Grabs the actual validation message string
        } 
        // 2. Fallback if Laravel sent a simple custom exception string array
        else if (typeof data === 'object') {
          const firstKey = Object.keys(data)[0];
          setError(Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey]);
        } 
        // 3. Fallback for flat message keys
        else {
          setError(data.message || 'Registration failed. Please check your inputs.');
        }
      } else {
        setError('Registration failed. Cannot connect to the server.');
      }} finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3.5 rounded-xl">
          ⚠️ {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Full Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all"
          required
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Email Address</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all"
          required
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all"
          required
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Confirm Password</label>
        <input 
          type="password" 
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all"
          required
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full mt-2 bg-green-800 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2 group cursor-pointer disabled:bg-slate-400"
      >
        <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
        {!loading && <span className="transition-transform group-hover:translate-x-0.5">→</span>}
      </button>
    </form>
  );
}