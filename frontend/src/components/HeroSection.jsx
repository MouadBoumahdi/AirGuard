import { useState } from 'react';
import heroBg from '../assets/hero_bg.png';

export default function HeroSection() {
  const [showMap, setShowMap] = useState(false);

  const telemetrySpots = [
    { id: 1, name: 'Silo A (Agriculture)', aqi: 18, status: 'Optimal', top: '35%', left: '25%' },
    { id: 2, name: 'Smelter Site 3', aqi: 56, status: 'Moderate', top: '48%', left: '60%' },
    { id: 3, name: 'Refinery South East', aqi: 82, status: 'Attention', top: '22%', left: '75%' },
    { id: 4, name: 'Buffer Zone North', aqi: 12, status: 'Optimal', top: '70%', left: '40%' }
  ];

  return (
    <section className="relative min-h-[580px] md:min-h-[640px] flex items-center justify-start overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[4000ms] hover:scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-20 md:py-28">
        <div className="max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl border border-white/20 animate-in fade-in slide-in-from-left-6 duration-700">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green-light rounded-full text-brand-green text-xs font-bold tracking-wider mb-6">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></span>
            AN OCP INNOVATION
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
            Empowering Ecological <br />
            <span className="text-brand-green">Industrialism</span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            Precision environmental monitoring for the new age of industry. AirGuard delivers real-time air quality insights, enabling sustainable agriculture and heavy operations to thrive in harmony with the planet.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              onClick={() => {
                const section = document.getElementById('precision-section');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-lg text-center shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              GET STARTED
            </button>
            
            <button 
              onClick={() => setShowMap(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold rounded-lg transition-all cursor-pointer"
            >
              <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.487V7.087a2 2 0 011.106-1.789L9 2.5l6 3 5.447-2.724A2 2 0 0121 4.563v8.4a2 2 0 01-1.106 1.79L15 17.5l-6 2.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 2.5v17.5M15 5.5v17.5" />
              </svg>
              EXPLORE THE MAP
            </button>
          </div>
        </div>
      </div>

      {showMap && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row h-[500px] md:h-[550px] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex-1 bg-slate-900 relative p-4 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
              
              <h4 className="absolute top-4 left-4 text-xs font-bold tracking-widest text-slate-400">
                LIVE SAT TELEMETRY FEED (SIMULATED)
              </h4>

              <div className="w-72 h-72 border border-brand-green/20 rounded-full flex items-center justify-center animate-ping absolute duration-[4000ms] opacity-20"></div>
              
              {telemetrySpots.map((spot) => (
                <div 
                  key={spot.id} 
                  className="absolute cursor-pointer group"
                  style={{ top: spot.top, left: spot.left }}
                >
                  <span className="flex h-4 w-4 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      spot.aqi > 75 ? 'bg-red-400' : spot.aqi > 40 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-4 w-4 ${
                      spot.aqi > 75 ? 'bg-red-500' : spot.aqi > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}></span>
                  </span>
                  
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-44 bg-slate-950/95 text-white text-[11px] p-2.5 rounded-lg shadow-xl border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <p className="font-bold border-b border-slate-800 pb-1 mb-1 text-brand-green">{spot.name}</p>
                    <p>AQI Index: <span className="font-bold">{spot.aqi}</span></p>
                    <p>Status: <span className={`font-bold ${
                      spot.status === 'Optimal' ? 'text-emerald-400' : spot.status === 'Moderate' ? 'text-amber-400' : 'text-red-400'
                    }`}>{spot.status}</span></p>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/70 backdrop-blur-xs py-2 px-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span>🟢 Emerald: Clean</span>
                <span>🟡 Amber: Moderate</span>
                <span>🔴 Red: Alert</span>
              </div>
            </div>

            <div className="w-full md:w-80 bg-slate-50 border-t md:border-t-0 md:border-l border-gray-100 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Telemetry Feed</h3>
                  <button 
                    onClick={() => setShowMap(false)}
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  Hover over the flashing sensor points on the left map overlay grid to view real-time OCP receptor sensor calculations.
                </p>

                <div className="space-y-3">
                  {telemetrySpots.map((spot) => (
                    <div key={spot.id} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between shadow-xs">
                      <div>
                        <p className="text-xs font-bold text-gray-800">{spot.name}</p>
                        <p className="text-[10px] text-gray-400">Active Sensor #{spot.id * 104}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          spot.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700' : spot.status === 'Moderate' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                        }`}>
                          AQI {spot.aqi}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 mt-6 flex justify-end">
                <button 
                  onClick={() => setShowMap(false)}
                  className="w-full py-2 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg font-semibold text-sm transition-colors cursor-pointer"
                >
                  Close Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
