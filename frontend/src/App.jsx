import React, { useState, useEffect } from 'react';
import AuthPage from './components/Auth/AuthPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Logo from './assets/logo.png'; 



export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);



  const [view, setView] = useState(() => {
    return localStorage.getItem('activeView') || 'home';
  });

  const handleSetView = (newView) => {
    setView(newView);
    localStorage.setItem('activeView', newView);
  };

 




  const renderDashboardByRole = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'viewer':
      default:
        return <ViewerDashboard />;
    }
  };


  
  // Si vue Auth active
  if (view === 'login' || view === 'register') {
    return <AuthPage initialView={view} onClose={() => handleSetView('home')} />;
  }

 

  // Dashboard
  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="h-5 object-contain" />
            <span className="font-bold text-slate-900 text-sm">AirGuard Workspace</span>
          </div>
          <button 
            onClick={() => handleSetView('home')} 
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
          >
            ← Main Site
          </button>
        </header>

        <div className="flex-1">
          {renderDashboardByRole()}
        </div>

        <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
          © 2026 OCP Safety Internal Panel. All rights reserved.
        </footer>
      </div>
    );
  }


// Home page
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
              <button onClick={() => handleSetView('dashboard')} className="text-sm font-semibold bg-emerald-800 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 cursor-pointer transition-colors">
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
              <button onClick={() => handleSetView('dashboard')} className="bg-emerald-800 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-md hover:bg-emerald-700 cursor-pointer transition-colors">
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

    
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-900 pb-8 mb-6">
          <div className="flex flex-col gap-2">
            <span className="font-normal text-2xl tracking-normal text-slate-200 select-none block">
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
              <a onClick={() => handleSetView('dashboard')} className="hover:text-white cursor-pointer hover:underline">Live Data Feed</a>
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