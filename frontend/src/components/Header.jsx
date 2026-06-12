import { useState } from 'react';
import ocpLogo from '../assets/ocp logo.png';

export default function Header() {
  const [activeLink, setActiveLink] = useState('Solutions');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const navItems = ['Solutions', 'Stewardship', 'Data', 'About'];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setActiveModal(null);
      setSubmitted(false);
      setEmail('');
      setPassword('');
      setName('');
    }, 1500);
  };

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {
          setActiveLink('Solutions');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <img src={ocpLogo} className="h-10 w-auto object-contain transition-transform group-hover:scale-102" alt="OCP logo" />
          <span className="text-2xl font-bold tracking-tight text-brand-green">
            AirGuard
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveLink(item);
                const targetMap = {
                  'Solutions': 'precision-section',
                  'Stewardship': 'stewardship-section',
                  'Data': 'precision-section',
                  'About': 'stewardship-section'
                };
                const element = document.getElementById(targetMap[item]);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative py-2 text-[15px] font-semibold cursor-pointer transition-colors duration-200 ${activeLink === item ? 'text-brand-green' : 'text-gray-500 hover:text-brand-green'
                }`}
            >
              {item}
              {activeLink === item && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green rounded-full transition-transform duration-300" />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setActiveModal('signin')}
            className="text-[15px] font-semibold text-gray-700 hover:text-brand-green px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveModal('register')}
            className="text-[15px] font-semibold bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Register
          </button>
        </div>

        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 hover:text-brand-green focus:outline-none p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveLink(item);
                setMobileMenuOpen(false);
                const targetMap = {
                  'Solutions': 'precision-section',
                  'Stewardship': 'stewardship-section',
                  'Data': 'precision-section',
                  'About': 'stewardship-section'
                };
                const element = document.getElementById(targetMap[item]);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block w-full text-left py-2 px-3 rounded-lg text-base font-medium transition-colors ${activeLink === item
                ? 'bg-brand-green-light text-brand-green font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-brand-green'
                }`}
            >
              {item}
            </button>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal('signin');
              }}
              className="w-full text-center py-2.5 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal('register');
              }}
              className="w-full text-center py-2.5 rounded-lg bg-brand-green hover:bg-brand-green-dark text-white font-semibold transition-colors cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      )}

      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {activeModal === 'signin' ? 'Sign In to AirGuard' : 'Create an Account'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green animate-bounce">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    {activeModal === 'signin' ? 'Signing in...' : 'Registering Account...'}
                  </p>
                  <p className="text-sm text-gray-500">Welcome to OCP AirGuard</p>
                </div>
              ) : (
                <>
                  {activeModal === 'register' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg font-semibold transition-colors shadow-sm text-sm cursor-pointer"
                    >
                      {activeModal === 'signin' ? 'Sign In' : 'Register'}
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setActiveModal(activeModal === 'signin' ? 'register' : 'signin')}
                      className="text-xs text-brand-green hover:underline cursor-pointer font-medium"
                    >
                      {activeModal === 'signin' ? "Don't have an account? Register" : "Already have an account? Sign In"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
