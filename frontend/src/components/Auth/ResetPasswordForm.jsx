import React, { useState, useEffect } from 'react';
import API from '../../api'; // Import your Axios configuration instance

export default function ResetPasswordForm({ onResetSuccess }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Extract the URL query tokens automatically when the form window mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get('token');
    const emailParam = queryParams.get('email');

    if (tokenParam && emailParam) {
      setToken(tokenParam);
      setEmail(decodeURIComponent(emailParam));
    } else {
      setError('Operational token reference parameters are missing. Please re-open your Mailtrap link configuration.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('The entered passcodes do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/reset-password', {
        token,
        email,
        password
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message || 'Your passcode update has been processed successfully.');
        
        // Wipe inputs
        setPassword('');
        setConfirmPassword('');

        // Redirect back to login terminal view after a brief delay
        setTimeout(() => {
          if (onResetSuccess) {
            onResetSuccess();
          }
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to update system access credentials.');
      } else {
        setError('Cannot dispatch credentials to the secure backend server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
      
      <div className="flex flex-col">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">Configure New Password</h2>
        <p className="text-xs text-slate-400 font-medium mt-1">Updating credentials profile for: <span className="font-mono text-slate-600">{email}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3.5 rounded-xl leading-normal">
            <span className="block font-black uppercase tracking-wider text-[10px] text-rose-800 mb-0.5">Authorization Error</span>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold p-3.5 rounded-xl leading-normal">
            <span className="block font-black uppercase tracking-wider text-[10px] text-emerald-800 mb-0.5">Update Success</span>
            {successMessage}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">New Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all text-slate-800"
            required
            minLength={8}
            disabled={loading || !token}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Confirm New Password</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all text-slate-800"
            required
            disabled={loading || !token}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || !token}
          className="w-full mt-2 bg-green-800 text-white font-bold uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl shadow-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>{loading ? 'Authorizing Profile Update...' : 'Save New Credentials'}</span>
        </button>
      </form>
    </div>
  );
}