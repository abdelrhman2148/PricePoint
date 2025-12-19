import React from 'react';
import { Target, Lock } from 'lucide-react';
import { UserTier } from '../types';

interface NavbarProps {
  tier: UserTier;
  onUpgrade: () => void;
  onReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ tier, onUpgrade, onReset }) => {
  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={onReset}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">PricePoint</span>
        </div>

        <div className="flex items-center gap-4">
          {tier === 'FREE' ? (
            <button 
              onClick={onUpgrade}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Pro Data</span>
            </button>
          ) : (
             <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
               Pro Active
             </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
