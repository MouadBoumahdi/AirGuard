import React, { useState } from 'react';
import API from '../../api';

export default function RegisterForm({ onRegisterSuccess, onBackToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      if (response.data.success || response.status === 201) {
        setSuccessMessage('Account created successfully! Please sign in with your credentials.');
        
        // Clear form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Redirect after brief delay
        setTimeout(() => {
          if (onRegisterSuccess) {
            onRegisterSuccess();
          }
        }, 1500);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || err.response.data.error || 'Registration failed. Please try again.');
      } else {
        setError('Cannot connect to the backend server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
      {/* ERROR ANNOUNCEMENT CARD PANEL */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3.5 rounded-xl leading-normal">
          <span className="block font-black uppercase tracking-wider text-[10px] text-rose-800 mb-0.5">Action Blocked</span>
          {error}
        </div>
      )}

      {/* SUCCESS CONFIRMATION PANEL */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold p-3.5 rounded-xl leading-normal">
          <span className="block font-black uppercase tracking-wider text-[10px] text-emerald-800 mb-0.5">Registration Successful</span>
          {successMessage}
        </div>
      )}

      {/* FULL NAME INPUT FIELD */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Full Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Full Name"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all text-slate-800"
          required
          disabled={loading}
        />
      </div>

      {/* CORPORATE EMAIL INPUT FIELD */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Email Address</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="username@example.com"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all text-slate-800"
          required
          disabled={loading}
        />
      </div>

      {/* PASSWORD INPUT FIELD */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 8 characters"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all text-slate-800"
          required
          disabled={loading}
          minLength={8}
        />
      </div>

      {/* CONFIRM PASSWORD INPUT FIELD */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Confirm Password</label>
        <input 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all text-slate-800"
          required
          disabled={loading}
          minLength={8}
        />
      </div>

      {/* ACTION TRIGGERS SUBMIT BUTTON */}
      <button 
        type="submit" 
        disabled={loading}
        className="w-full mt-2 bg-green-800 text-white font-bold uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl shadow-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2 group cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        <span>
          {loading ? 'Creating Account...' : 'Create Account'}
        </span>
        {!loading && <span className="transition-transform group-hover:translate-x-0.5">→</span>}
      </button>

      {/* BACK TO LOGIN LINK */}
      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-200">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onBackToLogin}
          className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer bg-transparent border-none outline-none"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
