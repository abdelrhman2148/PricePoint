import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import ResultsView from './components/ResultsView';
import { AppView, PricingBenchmark, UserTier } from './types';
import { fetchBenchmarkData } from './services/geminiService';

function App() {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [data, setData] = useState<PricingBenchmark | null>(null);
  const [tier, setTier] = useState<UserTier>('FREE');

  const handleSearch = async (service: string, zip: string) => {
    setView(AppView.LOADING);
    try {
      const benchmark = await fetchBenchmarkData(service, zip);
      setData(benchmark);
      setView(AppView.DASHBOARD);
    } catch (e) {
      console.error(e);
      // In a real app, handle error UI here
      setView(AppView.LANDING);
    }
  };

  const handleUpgrade = () => {
    // Simulate upgrade flow
    const confirm = window.confirm("Demo: Upgrade to Pro for $29/mo to see full ranges and unlock the calculator?");
    if (confirm) {
      setTier('PRO');
    }
  };

  const handleReset = () => {
    setView(AppView.LANDING);
    setData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar tier={tier} onUpgrade={handleUpgrade} onReset={handleReset} />
      
      <main>
        {view === AppView.LANDING && (
          <Hero onSubmit={handleSearch} />
        )}

        {view === AppView.LOADING && (
          <LoadingScreen />
        )}

        {view === AppView.DASHBOARD && data && (
          <ResultsView 
            data={data} 
            tier={tier} 
            onUpgrade={handleUpgrade} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
