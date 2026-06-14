import React, { useState } from 'react';
import API from '../../api'; // Import our fresh Axios instance

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold any error responses
  const [loading, setLoading] = useState(false); // State to handle button loading styles

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Send data to your Laravel AuthController login method
      const response = await API.post('/login', { email, password });
      
      // 2. Extract the JWT token and user info from the response
      const { token } = response.data.authorisation;
      const { role, name } = response.data.user;

      // 3. Save them to localStorage so the browser remembers the user
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      alert(`Welcome back, ${name}! Your role is: ${role}`);
      
      // 4. Redirect the user based on their dashboard role
      if (role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else if (role === 'manager') {
        window.location.href = '/manager-dashboard';
      } else {
        window.location.href = '/viewer-dashboard';
      }

    } catch (err) {
      // Catch any validation or unauthorized errors from Laravel
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Invalid credentials. Please try again.');
      } else {
        setError('Cannot connect to the backend server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
      {/* Display error messages dynamically if they happen */}
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