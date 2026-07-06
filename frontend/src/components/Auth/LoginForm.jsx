import React, { useState } from 'react';
import API from '../../api'; // Import our fresh Axios instance

export default function LoginForm({ onLoginSuccess, onRegisterClick }) { 
  // Modes available: 'login' or 'forgot'
  const [authMode, setAuthMode] = useState('login'); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (authMode === 'login') {
      /* --- HANDLE NORMAL SIGN IN ATTEMPT --- */
      try {
        const response = await API.post('/login', { email, password });
     
        const { token } = response.data.authorisation;
        const { role } = response.data.user;

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        if (onLoginSuccess) {
          onLoginSuccess(role);
        }

      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message || err.response.data.error || 'Invalid credentials. Please try again.');
        } else {
          setError('Cannot connect to the backend server.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      /* --- HANDLE DISPATCHING RESET MAILTRAP LINK --- */
      try {
        const response = await API.post('/forgot-password', { email });
        
        if (response.data.success) {
          setSuccessMessage('An operational recovery link has been dispatched to your corporate inbox.');
          setEmail(''); // Empty email input upon successful delivery
        }
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Verification email lookup failed in system profiles.');
        } else {
          setError('Cannot dispatch data payload to backend mail configuration.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
      {/* ERROR ANNOUNCEMENT CARD PANEL */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3.5 rounded-xl leading-normal">
          <span className="block font-black uppercase tracking-wider text-[10px] text-rose-800 mb-0.5">Terminal Action Blocked</span>
          {error}
        </div>
      )}

      {/* SUCCESS CONFIRMATION PANEL (FOR MAILTRAP TRANSFERS) */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold p-3.5 rounded-xl leading-normal">
          <span className="block font-black uppercase tracking-wider text-[10px] text-emerald-800 mb-0.5">Notification Dispatched</span>
          {successMessage}
        </div>
      )}

      {/* CORPORATE EMAIL INPUT FIELD */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Corporate Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="username@ocpgroup.ma"
          className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all text-slate-800"
          required
          disabled={loading}
        />
      </div>

      {/* PASSCODE INPUT CONTAINER (CONDITIONAL RENDERING DEPENDING ON LOGMODE STATE) */}
      {authMode === 'login' ? (
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Password</label>
            <button 
              type="button"
              onClick={() => {
                setError('');
                setSuccessMessage('');
                setAuthMode('forgot');
              }}
              className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer bg-transparent border-none outline-none"
            >
              Forgot Password?
            </button>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-600 focus:bg-white transition-all text-slate-800"
            required
            disabled={loading}
          />
        </div>
      ) : (
        /* BACK BUTTON LINK LAYER TO REVERT TO LOGIN MODE VIEW */
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => {
              setError('');
              setSuccessMessage('');
              setAuthMode('login');
            }}
            className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-wider cursor-pointer bg-transparent border-none outline-none"
          >
            ← Back to System Sign In
          </button>
        </div>
      )}

      {/* ACTION TRIGGERS SUBMIT BUTTON */}
      <button 
        type="submit" 
        disabled={loading}
        className="w-full mt-2 bg-green-800 text-white font-bold uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl shadow-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2 group cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        <span>
          {loading 
            ? 'Processing Request...' 
            : authMode === 'login' ? 'Sign In Terminal' : 'Send Recovery Link'}
        </span>
        {!loading && <span className="transition-transform group-hover:translate-x-0.5">→</span>}
      </button>

      {/* REGISTRATION LINK - ONLY SHOW ON LOGIN MODE */}
      {authMode === 'login' && (
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-200">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onRegisterClick}
            className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer bg-transparent border-none outline-none"
          >
            Sign Up
          </button>
        </div>
      )}
    </form>
  );
}