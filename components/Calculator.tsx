import React, { useState, useEffect } from 'react';
import { PricingBenchmark, UserTier } from '../types';
import { Lock } from 'lucide-react';

interface CalculatorProps {
  benchmark: PricingBenchmark;
  tier: UserTier;
  onUpgrade: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ benchmark, tier, onUpgrade }) => {
  const [price, setPrice] = useState(benchmark.median);
  const [labor, setLabor] = useState(20);
  const [supplies, setSupplies] = useState(5);
  const [overhead, setOverhead] = useState(15); // percent

  // Reset price when benchmark changes
  useEffect(() => {
    setPrice(benchmark.median);
  }, [benchmark]);

  const overheadCost = price * (overhead / 100);
  const totalCost = labor + supplies + overheadCost;
  const profit = price - totalCost;
  const margin = (profit / price) * 100;

  const isFree = tier === 'FREE';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Margin Calculator</h3>
          <p className="text-sm text-slate-500">Protect your profit per {benchmark.unit}</p>
        </div>
        {isFree && <Lock className="w-5 h-5 text-slate-400" />}
      </div>

      <div className="p-6 relative">
        {isFree && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-6">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Stop losing money</h4>
            <p className="text-slate-600 mb-6 max-w-xs">
              Unlock the calculator to see exactly how much profit you keep from every job.
            </p>
            <button 
              onClick={onUpgrade}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Unlock Calculator
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Your Price ({benchmark.currency})</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Labor Cost ({benchmark.currency})</label>
              <input 
                type="number" 
                value={labor}
                onChange={(e) => setLabor(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Supplies ({benchmark.currency})</label>
                <input 
                  type="number" 
                  value={supplies}
                  onChange={(e) => setSupplies(Number(e.target.value))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Overhead (%)</label>
                <input 
                  type="number" 
                  value={overhead}
                  onChange={(e) => setOverhead(Number(e.target.value))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>Revenue</span>
                <span>${price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>Total Costs</span>
                <span>-${totalCost.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-700 my-2"></div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-slate-300 font-medium">Net Profit</span>
                <span className={`text-3xl font-bold ${profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${profit.toFixed(2)}
                </span>
              </div>
              
              <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${margin > 20 ? 'bg-green-500' : margin > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                  style={{ width: `${Math.max(0, Math.min(100, margin))}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-slate-500">Margin</span>
                <span className={`font-bold ${margin > 20 ? 'text-green-500' : 'text-slate-300'}`}>
                  {margin.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
