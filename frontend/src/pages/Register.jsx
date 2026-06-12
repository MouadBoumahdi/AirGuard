import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ocpLogo from '../assets/ocp logo.png';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== passwordConfirmation) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('You must agree to the OCP compliance codes.');
      return;
    }

    setLoading(true);

    // Simulate Frontend Registration
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Registration successful! Redirecting to AirGuard...');
      const mockUser = {
        name: name,
        email: email,
        role: 'viewer'
      };
      localStorage.setItem('token', 'mock-active-token');
      localStorage.setItem('user', JSON.stringify(mockUser));

      setTimeout(() => {
        navigate('/');
      }, 1200);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Decorative background grid and soft green glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-green-light rounded-full blur-3xl -z-10"></div>

      {/* Navigation Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <img src={ocpLogo} className="h-8 w-auto object-contain" alt="OCP logo" />
          <span className="text-xl font-bold tracking-tight text-brand-green">AirGuard</span>
        </div>
        <button 
          onClick={() => navigate('/')} 
          className="text-xs font-semibold text-gray-500 hover:text-brand-green transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Site
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        <div className="bg-white border border-gray-150 rounded-3xl max-w-md w-full shadow-xl overflow-hidden p-8 sm:p-10 transform transition-all animate-in fade-in zoom-in-95 duration-300">
          
          <div className="text-center mb-6">
            <img src={ocpLogo} className="h-12 w-auto object-contain mx-auto mb-4 bg-brand-green-light p-2 rounded-2xl" alt="OCP logo" />
            <h1 className="text-2xl font-bold text-gray-900 font-heading tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Join the OCP environmental telemetry system
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 bg-emerald-50 border border-emerald-250 text-emerald-700 rounded-xl p-3.5 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <svg className="w-5 h-5 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-brand-green transition-colors focus:ring-2 focus:ring-brand-green/10 placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Corporate Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-brand-green transition-colors focus:ring-2 focus:ring-brand-green/10 placeholder-gray-400"
                placeholder="you@ocpgroup.ma"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-brand-green transition-colors focus:ring-2 focus:ring-brand-green/10 placeholder-gray-300"
                placeholder="••••••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-brand-green transition-colors focus:ring-2 focus:ring-brand-green/10 placeholder-gray-300"
                placeholder="••••••••••••"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 accent-brand-green rounded border-gray-300 focus:outline-none mt-0.5 shrink-0"
                />
                <span className="text-xs text-gray-500 hover:text-gray-700 transition-colors leading-relaxed">
                  I agree to OCP compliance regulations and corporate disclosure agreements.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand-green hover:bg-brand-green-dark disabled:bg-brand-green/50 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>REGISTER</span>
                    <svg className="w-4.5 h-4.5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-brand-green hover:text-brand-green-dark underline font-semibold transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-400 z-10">
        <p>© 2026 OCP AirGuard. Internal Secure Access Portal.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-600 transition-colors">Compliance Portal</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy Statement</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-600 transition-colors">Terms of Operations</a>
        </div>
      </div>
    </div>
  );
}
