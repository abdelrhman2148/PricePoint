import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroProps {
  onSubmit: (service: string, zip: string) => void;
}

const PRESET_SERVICES = [
  "House Cleaning",
  "Landscaping",
  "Handyman",
  "Pressure Washing",
  "Window Cleaning",
  "Mobile Detailing"
];

const Hero: React.FC<HeroProps> = ({ onSubmit }) => {
  const [service, setService] = useState('House Cleaning');
  const [zip, setZip] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (service && zip.length >= 5) {
      onSubmit(service, zip);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Stop guessing <br/>
            <span className="text-blue-600">your prices.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto">
            See real local rates before you quote the job. 
            Am I too cheap or too expensive for this ZIP code?
          </p>
        </div>

        <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 max-w-lg mx-auto transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full h-12 pl-4 pr-8 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 appearance-none cursor-pointer"
              >
                {PRESET_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="ZIP Code (e.g. 90210)"
                maxLength={5}
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                className="w-full h-12 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 font-medium placeholder:text-slate-400"
              />
            </div>

            <button 
              type="submit"
              disabled={zip.length < 5}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Price
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
          {[
            "Instant local benchmarks",
            "Margin calculator",
            "Pricing confidence"
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-600 font-medium">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;
