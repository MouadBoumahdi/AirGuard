import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ocpLogo from '../assets/ocp logo.png';

export default function Header() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('Solutions');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const navItems = ['Solutions', 'Stewardship', 'Data', 'About'];

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
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
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-[10px] text-gray-400">{user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="text-[14px] font-semibold border border-red-200 hover:border-red-600 hover:bg-red-50 text-red-500 px-4 py-2 rounded-lg transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-[15px] font-semibold text-gray-700 hover:text-brand-green px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="text-[15px] font-semibold bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
              >
                Register
              </button>
            </>
          )}
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
            {user ? (
              <button
                onClick={handleSignOut}
                className="w-full text-center py-2.5 rounded-lg border border-red-200 text-red-500 font-semibold hover:bg-red-50 transition-colors cursor-pointer"
              >
                Sign Out ({user.name})
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full text-center py-2.5 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/register');
                  }}
                  className="w-full text-center py-2.5 rounded-lg bg-brand-green hover:bg-brand-green-dark text-white font-semibold transition-colors cursor-pointer"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
