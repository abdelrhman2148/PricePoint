import React from 'react';
import { PricingBenchmark, UserTier } from '../types';
import { TrendingUp, AlertCircle, MapPin, DollarSign, ShieldCheck } from 'lucide-react';
import BenchmarkChart from './BenchmarkChart';
import Calculator from './Calculator';

interface ResultsViewProps {
  data: PricingBenchmark;
  tier: UserTier;
  onUpgrade: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ data, tier, onUpgrade }) => {
  const isFree = tier === 'FREE';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8 pb-24">
      
      {/* Header Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="uppercase tracking-wide text-xs font-bold">{data.zipCode} &bull; {data.locationName}</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">{data.serviceType} Rates</h2>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-100">
          <ShieldCheck className="w-4 h-4" />
          <span>{data.competitorCountEstimate}+ Local Pros Analyzed</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Chart & Stats */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Local Price Distribution</h3>
              <span className="text-sm text-slate-500">Unit: {data.unit}</span>
            </div>
            
            <BenchmarkChart data={data} tier={tier} />

            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 uppercase font-semibold">Low End</div>
                <div className="font-mono text-xl text-slate-700 font-bold">${data.low}</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-xs text-blue-600 uppercase font-semibold">Market Median</div>
                <div className="font-mono text-xl text-blue-700 font-bold">${data.median}</div>
              </div>
              <div className={`p-3 rounded-lg ${isFree ? 'bg-slate-100 blur-[2px]' : 'bg-green-50 border border-green-100'}`}>
                <div className="text-xs text-green-600 uppercase font-semibold">Top Earners</div>
                <div className="font-mono text-xl text-green-700 font-bold">${data.high}</div>
              </div>
            </div>
            
            {isFree && (
              <div className="mt-4 text-center">
                 <button onClick={onUpgrade} className="text-sm text-blue-600 font-semibold hover:underline">
                   Unlock top earner data
                 </button>
              </div>
            )}
          </div>

          {/* Calculator */}
          <Calculator benchmark={data} tier={tier} onUpgrade={onUpgrade} />

        </div>

        {/* Right Col: Insights & CTA */}
        <div className="space-y-6">
          
          {/* Insights Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
             <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Market Insights</h3>
             </div>
             <ul className="space-y-4">
               {data.insights.map((insight, idx) => (
                 <li key={idx} className="flex gap-3 text-sm text-slate-700">
                   <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></span>
                   {insight}
                 </li>
               ))}
             </ul>
          </div>

          {/* Upsell Card (if Free) */}
          {isFree ? (
            <div className="bg-slate-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-2">Don't leave money on the table.</h3>
                 <p className="text-slate-300 text-sm mb-6">
                   Service pros who price correctly earn $12k more per year on average. Unlock full benchmarks now.
                 </p>
                 <button 
                  onClick={onUpgrade}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                 >
                   Unlock Full Report
                   <DollarSign className="w-4 h-4" />
                 </button>
                 <p className="text-center text-xs text-slate-500 mt-3">One-time purchase of $9.99 (Demo)</p>
               </div>
            </div>
          ) : (
            <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
              <h3 className="text-green-800 font-bold mb-2">Pro Access Active</h3>
              <p className="text-green-700 text-sm">
                You have full visibility into {data.zipCode} pricing. Use the calculator to ensure you maintain a 30%+ profit margin.
              </p>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
             <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
             <p className="text-xs text-yellow-800">
               <strong>Note:</strong> Prices are estimated based on aggregated public data and local economic factors. Always verify with specific job requirements.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultsView;
