import { useState } from 'react';
import plantImg from '../assets/stewardship_plant.png';

export default function StewardshipSection() {
  const [showAqrDetails, setShowAqrDetails] = useState(false);

  const commitments = [
    {
      title: 'Zero-Harm Philosophy',
      desc: 'We believe that no industrial output should compromise the air we breathe or the ecosystems we inhabit.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Radical Transparency',
      desc: 'AirGuard makes environmental data public-facing, fostering trust between industrial leaders and local communities.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: 'Community Resilience',
      desc: 'By protecting air quality, we are investing in the long-term health and vitality of the regions where we operate.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="stewardship-section" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="absolute w-72 h-72 bg-brand-green/10 rounded-full blur-3xl -z-10 -top-6 -left-6"></div>
            
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 p-3 bg-gray-50 flex items-center justify-center">
              <img 
                src={plantImg} 
                className="rounded-xl w-full h-[400px] object-cover hover:scale-102 transition-transform duration-500" 
                alt="Environmental sprout graphic" 
              />
            </div>

            <div className="absolute bottom-6 right-6 z-20">
              <div 
                onClick={() => setShowAqrDetails(!showAqrDetails)}
                className="bg-white border border-gray-100 hover:border-brand-green hover:shadow-lg transition-all rounded-2xl py-3.5 px-4 shadow-md flex items-center gap-3 cursor-pointer select-none"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center text-brand-green font-extrabold text-sm">
                  94
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 tracking-wider">AQR RATING</h4>
                  <p className="text-[10px] text-gray-500">Optimal Performance</p>
                </div>
                <div className="text-gray-400 hover:text-brand-green transition-colors">
                  <svg className={`w-4 h-4 transform transition-transform ${showAqrDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>

              {showAqrDetails && (
                <div className="absolute bottom-20 right-0 w-72 bg-slate-900 border border-slate-800 text-white rounded-2xl p-5 shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-3 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <span className="text-xs font-bold tracking-widest text-brand-green uppercase">AQR Metrics Breakdown</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAqrDetails(false);
                      }}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Carbon Offset Capacity:</span>
                      <span className="font-bold text-emerald-400">A+ (98/100)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ecosystem Integrity:</span>
                      <span className="font-bold text-emerald-400">A (94/100)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Atmospheric Stability:</span>
                      <span className="font-bold text-emerald-400">A (92/100)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-green uppercase block mb-2">
                STEWARDSHIP & IMPACT
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Our Commitment to the Earth is a Commitment to the Future.
              </h2>
            </div>

            <div className="space-y-6">
              {commitments.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-green-light text-brand-green flex items-center justify-center border border-brand-green/10">
                    {item.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 relative">
              <span className="text-4xl text-brand-green/20 font-serif absolute top-3 left-4">“</span>
              <div className="relative z-10 pl-6">
                <blockquote className="text-sm md:text-base italic text-gray-600 leading-relaxed mb-4">
                  "AirGuard isn't just a monitoring tool; it's our promise to future generations that industry and nature can exist in a symbiotic loop."
                </blockquote>
                <cite className="text-xs font-bold text-gray-800 not-italic block">
                  — Dr. Sarah Chen, <span className="text-brand-green">Head of Sustainability at OCP</span>
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
