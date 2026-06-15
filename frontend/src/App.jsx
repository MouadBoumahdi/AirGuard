import React, { useState, useEffect } from 'react';
import AuthPage from './components/Auth/AuthPage';
import Logo from './assets/logo.png'; 

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  // Reads memory cleanly on page loads
  const [view, setView] = useState(() => {
    return localStorage.getItem('activeView') || 'home';
  });

  // Changes screens and saves to storage at the same time
  const handleSetView = (newView) => {
    setView(newView);
    localStorage.setItem('activeView', newView);
  };

  const handleGoToDashboard = () => {
    if (userRole === 'admin') window.location.href = '/admin-dashboard';
    else if (userRole === 'manager') window.location.href = '/manager-dashboard';
    else window.location.href = '/viewer-dashboard';
  };

  if (view === 'login' || view === 'register') {
    return <AuthPage initialView={view} onClose={() => handleSetView('home')} />;
  }

  const faqs = [
    {
      question: "How does the automatic factory shut-off work?",
      answer: "Our system monitors the air quality around the clock. If factory emissions rise and the wind starts blowing those emissions directly toward city neighborhoods, the system automatically pauses factory machinery until the wind changes direction or the air clears up."
    },
    {
      question: "Who can see this data?",
      answer: "Everyone! Anyone can create a free account to check live air quality maps. Factory supervisors and system administrators have extra access tools to manage system safety settings."
    },
    {
      question: "Does a person have to press the stop button?",
      answer: "No. The system acts instantly on its own to prevent delays, but factory managers are immediately notified and can safely turn the machinery back on once the air is completely clear."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col justify-between">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-50/80 border-b border-slate-200/50">
        <div className="max-w-7xl w-full mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-green-700 text-2xl tracking-wide">
            <span className="p-1.5 border border-green-200 rounded-lg flex items-center justify-center">
              <img src={Logo} alt="OCP Logo" className="h-6 w-18 object-contain" />
            </span>
            <span className="font-normal text-3xl tracking-normal font-sans text-slate-900 block select-none">
              Air<span className="text-emerald-600">Guard</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button onClick={handleGoToDashboard} className="text-sm font-semibold bg-emerald-800 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 cursor-pointer transition-colors">
                Go to Dashboard →
              </button>
            ) : (
              <>
                <button onClick={() => handleSetView('login')} className="text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer">
                  Sign In
                </button>
                <button onClick={() => handleSetView('register')} className="text-sm font-semibold bg-green-800 text-white px-4 py-2 rounded-xl hover:bg-green-700 cursor-pointer transition-colors">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200/60">
        <div className="max-w-3xl mx-auto px-6 py-20 sm:py-24 text-center flex flex-col items-center">
          <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 mb-6">
            Automatic Neighborhood Safety
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Keeping our city's air <span className="text-emerald-600">clean and safe</span>.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
            AirGuard tracks factory emissions and wind patterns automatically. If smoke ever heads toward residential neighborhoods, the system immediately pauses production to protect families.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {isLoggedIn ? (
              <button onClick={handleGoToDashboard} className="bg-emerald-800 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-md hover:bg-emerald-700 cursor-pointer transition-colors">
                Open Dashboard Panel
              </button>
            ) : (
              <>
                <button onClick={() => handleSetView('register')} className="bg-green-800 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-md hover:bg-green-700 transition-colors cursor-pointer">
                  Create Free Account
                </button>
                <button onClick={() => handleSetView('login')} className="bg-white text-slate-700 border border-slate-200 font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  View Live Air Map
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* QUICK DETAILS STRIP */}
      <div className="bg-slate-950 text-white py-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="border-r border-slate-800 last:border-none flex flex-col items-center">
            <span className="text-2xl font-black text-emerald-400">12 Sec</span>
            <span className="text-[11px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Data Updates</span>
          </div>
          <div className="border-r border-slate-800 last:border-none flex flex-col items-center">
            <span className="text-2xl font-black text-emerald-400">High</span>
            <span className="text-[11px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Sensor Precision</span>
          </div>
          <div className="border-r border-slate-800 last:border-none flex flex-col items-center">
            <span className="text-2xl font-black text-emerald-400">100%</span>
            <span className="text-[11px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Automatic Safety</span>
          </div>
          <div className="border-r border-slate-800 last:border-none flex flex-col items-center">
            <span className="text-2xl font-black text-emerald-400">Safi</span>
            <span className="text-[11px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Active Region</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT BLOCK */}
      <main className="w-full max-w-7xl mx-auto px-6 py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Live Monitoring</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Smart sensors. Instant community protection.</h2>
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
              We have placed air monitors all around the city and factory boundaries. These devices watch the air quality constantly. The second harmful air levels are found blowing towards homes, a safety command instantly stops the emission source. No delays, no guesswork.
            </p>
            <div className="mt-6 space-y-3 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-3"><span className="text-emerald-600 text-lg">✓</span> Around-the-clock air testing sensors</div>
              <div className="flex items-center gap-3"><span className="text-emerald-600 text-lg">✓</span> Automated wind direction checkers</div>
              <div className="flex items-center gap-3"><span className="text-emerald-600 text-lg">✓</span> Direct, automatic machine shut-off lines</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Air Status</span>
              </div>
              <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">All Clear</span>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700">City Air Quality</span>
                <span className="text-sm font-black text-emerald-600">Excellent (Safe)</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700">Wind Direction</span>
                <span className="text-sm font-black text-slate-600">Blowing Away From City</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700">Safety Cutoff Switch</span>
                <span className="text-sm font-black text-slate-500">Armed & Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="w-full border-t border-slate-200 pt-16 mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Our Features</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">How the platform keeps everyone safe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
              <div className="text-2xl mb-4">🍃</div>
              <h3 className="font-bold text-slate-900 text-base">Live Air Maps</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">Tracks emission densities across towns every 12 seconds to ensure air stays completely clean.</p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
              <div className="text-2xl mb-4">💨</div>
              <h3 className="font-bold text-slate-900 text-base">Wind Trajectory Tracking</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">Calculates exactly where exhaust particles are blowing before they can ever cross city boundaries.</p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
              <div className="text-2xl mb-4">🛡️</div>
              <h3 className="font-bold text-slate-900 text-base">Smart Safety Cutoff</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">If exhaust values rise and wind trends change, the platform automatically halts factory processing lines.</p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="w-full border-t border-slate-200 pt-16 mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">4-Step Action Pipeline</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">From detection to safety in under a second</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="h-12 w-12 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-base flex items-center justify-center mb-3">🔍</div>
              <h4 className="font-bold text-sm text-slate-900">1. Spot a Spike</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">Sensors automatically flag any unusual smoke or emissions right at the source.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="h-12 w-12 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-base flex items-center justify-center mb-3">💨</div>
              <h4 className="font-bold text-sm text-slate-900">2. Track the Wind</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">The system tracks exactly where the air is blowing to find out where smoke will travel.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="h-12 w-12 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-base flex items-center justify-center mb-3">⚠️</div>
              <h4 className="font-bold text-sm text-slate-900">3. Evaluate Risk</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">If the smoke is moving directly towards local residential homes, the system triggers an alert.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="h-12 w-12 bg-rose-50 border border-rose-200 text-rose-600 rounded-full font-bold text-base flex items-center justify-center mb-3 animate-pulse">🛑</div>
              <h4 className="font-bold text-sm text-slate-900">4. Stop Production</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">The system immediately safely pauses factory production lines to keep our communities completely safe.</p>
            </div>
          </div>
        </div>

        {/* ACCOUNT PERMISSIONS */}
        <div className="w-full border-t border-slate-200 pt-16 mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Account Permissions</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Simple access settings for everyone</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl">
              <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] tracking-wide uppercase px-2.5 py-0.5 rounded-full">Viewer</span>
              <h3 className="font-bold text-slate-900 mt-4 mb-2">Public Visitors</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Can view live air quality maps, monitor safety history, and track active statuses openly.</p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl">
              <span className="bg-sky-50 text-sky-700 font-bold text-[10px] tracking-wide uppercase px-2.5 py-0.5 rounded-full">Manager</span>
              <h3 className="font-bold text-slate-900 mt-4 mb-2">Factory Supervisors</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Can check deeper alerts, set safety thresholds, and safely resume production when conditions are clear.</p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl">
              <span className="bg-amber-50 text-amber-700 font-bold text-[10px] tracking-wide uppercase px-2.5 py-0.5 rounded-full">Admin</span>
              <h3 className="font-bold text-slate-900 mt-4 mb-2">System Administrators</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Manages the entire platform settings, sets up supervisor accounts, and handles data export reporting logs.</p>
            </div>
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="w-full border-t border-slate-200 pt-16 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold text-slate-900">Common Questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 font-bold text-sm sm:text-base text-slate-800 flex justify-between items-center hover:bg-slate-50/50 cursor-pointer select-none"
                >
                  <span>{faq.question}</span>
                  <span className="text-slate-400 font-bold text-lg">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3.5 bg-slate-50/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER ACTION STRIP */}
      <div className="bg-emerald-800 text-white py-12 px-6 text-center">
        <h2 className="text-2xl font-black">Ready to safeguard our air?</h2>
        <p className="text-emerald-200 text-xs sm:text-sm mt-1 mb-6">Free viewer accounts are open to everyone. Supervisor parameters are managed by managers.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => handleSetView('register')} className="bg-white text-emerald-800 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
            Create Free Account
          </button>
          <button onClick={() => handleSetView('login')} className="border border-emerald-600 bg-emerald-900/40 font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-emerald-900/60 cursor-pointer transition-colors">
            Open Control Center
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-900 pb-8 mb-6">
          <div className="flex flex-col gap-2">
            <span className="font-normal text-2xl tracking-normal font-sans text-slate-200 select-none block">
              Air<span className="text-emerald-400">Guard</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Automated factory safety switchboards protecting neighborhood air quality across urban systems.
            </p>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">Safety Protocol v4.0 · Safi Region</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">System Nav Map</h4>
            <div className="text-xs text-slate-400 flex flex-col gap-2">
              <a onClick={handleGoToDashboard} className="hover:text-white cursor-pointer hover:underline">Live Data Feed</a>
              <a className="hover:text-white cursor-pointer hover:underline">Safety Records</a>
              <a className="hover:text-white cursor-pointer hover:underline">Sensor Networks</a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Portals</h4>
            <div className="text-xs text-slate-400 flex flex-col gap-2">
              <a onClick={() => handleSetView('login')} className="hover:text-white cursor-pointer hover:underline">Sign In</a>
              <a onClick={() => handleSetView('register')} className="hover:text-white cursor-pointer hover:underline">Register Account</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center sm:text-left text-[11px] text-slate-500">
          <span>© 2026 OCP Safety Operations. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}