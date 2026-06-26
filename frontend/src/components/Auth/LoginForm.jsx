import React, { useState } from 'react';
import API from '../../api'; // Import our fresh Axios instance

export default function LoginForm({ onLoginSuccess }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/login', { email, password });
   
      const { token } = response.data.authorisation;
      const { role, name } = response.data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);


      if (onLoginSuccess) {
        onLoginSuccess(role);
      }
      
   

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Invalid credentials. Please try again.');
      } else {
        setError('Cannot connect to the backend server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3.5 rounded-xl">
          ⚠️ {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Corporate Email</label>
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
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full mt-2 bg-green-800 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2 group cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
        {!loading && <span className="transition-transform group-hover:translate-x-0.5">→</span>}
      </button>
    </form>
  );
}