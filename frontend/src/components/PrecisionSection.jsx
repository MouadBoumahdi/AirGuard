import { useState, useEffect } from 'react';
import emissionsImg from '../assets/emissions_mapping.png';
import reportBg from '../assets/sustainability_report_bg.png';

export default function PrecisionSection() {
  const [downloadProgress, setDownloadProgress] = useState('idle');
  const [progressPct, setProgressPct] = useState(0);

  const handleDownload = () => {
    if (downloadProgress !== 'idle') return;
    setDownloadProgress('loading');
    setProgressPct(0);
  };

  useEffect(() => {
    let interval;
    if (downloadProgress === 'loading') {
      interval = setInterval(() => {
        setProgressPct((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloadProgress('success');
            setTimeout(() => {
              setDownloadProgress('idle');
              setProgressPct(0);
            }, 3000);
            return 100;
          }
          return prev + 20;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [downloadProgress]);

  return (
    <section id="precision-section" className="py-20 bg-gray-50/50 border-t border-b border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Unparalleled Precision
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Leveraging satellite telemetry and ground-level sensing to provide a comprehensive view of your environmental footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl shadow-xs p-8 flex flex-col justify-between overflow-hidden relative group min-h-[380px]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center text-brand-green mb-6">
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-time Emissions Mapping</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl mb-8">
                Live visual data streams pinpointing emission sources with meter-level accuracy. Monitor plumes, track dispersal, and optimize operations on the fly.
              </p>
            </div>

            <div className="relative h-48 rounded-xl overflow-hidden border border-gray-100 shadow-inner">
              <img 
                src={emissionsImg} 
                className="w-full h-full object-cover filter saturate-75 brightness-90 group-hover:scale-102 transition-transform duration-700" 
                alt="Emissions mapping preview" 
              />
              
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-slate-700 flex items-center gap-2 z-30">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                  Telemetry Active
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl shadow-xs p-8 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center text-brand-green mb-6">
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Historical Data Trends</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Analyze long-term environmental patterns. Our AI-driven insights identify correlations between operational shifts and ecological outcomes over months and years.
              </p>
            </div>

            <div className="bg-brand-green-light/50 border border-brand-green/10 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider block">DATA DENSITY</span>
                <span className="text-base font-extrabold text-brand-green-dark">99.9% Uptime</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl shadow-xs p-8 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center text-brand-green mb-6">
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Alert Systems</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Intelligent notification protocols that trigger based on localized air quality thresholds. Instant SMS, Email, and API webhooks for rapid response teams.
              </p>
            </div>
            
            <div className="h-1 bg-brand-green/10 rounded-full w-full"></div>
          </div>

          <div 
            className="lg:col-span-8 rounded-2xl overflow-hidden relative flex items-center justify-center p-8 min-h-[380px] bg-cover bg-center border border-gray-100"
            style={{ backgroundImage: `url(${reportBg})` }}
          >
            <div className="absolute inset-0 bg-black/45 z-0"></div>

            <div className="relative z-10 w-full max-w-md">
              <button
                onClick={handleDownload}
                disabled={downloadProgress === 'loading'}
                className="w-full py-4 px-6 bg-white hover:bg-gray-50 text-brand-green font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer select-none border border-gray-100"
              >
                {downloadProgress === 'idle' && (
                  <>
                    <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>DOWNLOAD ANNUAL SUSTAINABILITY REPORT</span>
                  </>
                )}

                {downloadProgress === 'loading' && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 animate-spin text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>DOWNLOADING REPORT... {progressPct}%</span>
                  </div>
                )}

                {downloadProgress === 'success' && (
                  <div className="flex items-center gap-2 text-emerald-600 animate-in zoom-in-95 duration-200">
                    <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>REPORT DOWNLOADED ✓</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
