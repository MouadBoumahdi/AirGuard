import { useState } from 'react';
import ocpLogo from '../assets/ocp logo.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  const footerLinks = [
    {
      title: 'Solutions',
      items: ['Agriculture', 'Mining', 'Logistics']
    },
    {
      title: 'Legal',
      items: ['Privacy Policy', 'Terms of Service', 'Compliance']
    },
    {
      title: 'Connect',
      items: ['Contact', 'Support', 'API Portal']
    }
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3 text-white">
            <img src={ocpLogo} className="h-8 w-auto object-contain bg-white/10 p-1 rounded-lg" alt="OCP logo" />
            <span className="text-xl font-bold tracking-tight text-brand-green">AirGuard</span>
          </div>
          <p className="text-xs md:text-sm leading-relaxed max-w-sm">
            An advanced ecological monitoring ecosystem by OCP, dedicated to preserving our planetary atmospheric integrity.
          </p>

          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-3">
              Subscribe to Environmental Alerts
            </h4>
            <form onSubmit={handleSubscribe} className="flex max-w-sm">
              <input 
                type="email" 
                placeholder="Enter corporate email" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status) setStatus(null);
                }}
                disabled={status === 'loading' || status === 'success'}
                className="bg-slate-800/80 border border-slate-700/60 rounded-l-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-green w-full placeholder-slate-500 disabled:opacity-60"
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="bg-brand-green hover:bg-brand-green-dark disabled:bg-brand-green/50 text-white text-xs font-bold px-4 rounded-r-lg transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
              >
                {status === 'loading' ? 'Sending...' : 'Join'}
              </button>
            </form>
            
            {status === 'error' && (
              <p className="text-red-400 text-[11px] mt-1.5 font-medium animate-in fade-in duration-200">
                ⚠️ Please provide a valid email format.
              </p>
            )}
            {status === 'success' && (
              <p className="text-emerald-400 text-[11px] mt-1.5 font-medium animate-in fade-in duration-200">
                ✓ Successfully registered for briefing notifications!
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-3 gap-6 sm:gap-8">
          {footerLinks.map((group, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-xs font-bold text-slate-200 tracking-widest uppercase">
                {group.title}
              </h4>
              <ul className="space-y-2.5 text-xs md:text-sm">
                {group.items.map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const targetMap = {
                          'Agriculture': 'precision-section',
                          'Mining': 'precision-section',
                          'Logistics': 'precision-section',
                          'Privacy Policy': 'stewardship-section',
                          'Terms of Service': 'stewardship-section',
                          'Compliance': 'stewardship-section',
                          'Contact': 'stewardship-section',
                          'Support': 'stewardship-section',
                          'API Portal': 'precision-section'
                        };
                        const targetId = targetMap[item];
                        const element = document.getElementById(targetId);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-white transition-colors cursor-pointer block py-0.5"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800/60 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] md:text-xs">
          <p className="text-slate-500">
            © 2026 AirGuard Environmental Systems. All rights reserved.
          </p>
          
          <div className="flex items-center gap-5">
            <button className="hover:text-white transition-colors cursor-pointer" aria-label="Globe">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </button>
            <button className="hover:text-white transition-colors cursor-pointer" aria-label="Share">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l5.053-2.527m0 7.57l-5.053-2.527m0-4.3l5.053 2.527M21 8a3 3 0 11-6 0 3 3 0 016 0zm-6 8a3 3 0 11-6 0 3 3 0 016 0zM6 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="hover:text-white transition-colors cursor-pointer" aria-label="API Portal">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
