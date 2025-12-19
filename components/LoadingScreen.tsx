import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const MESSAGES = [
  "Connecting to local market data...",
  "Analyzing competitor pricing...",
  "Calculating profit margins...",
  "Normalizing data by service type...",
  "Finalizing benchmark report..."
];

const LoadingScreen: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % MESSAGES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin relative z-10" />
      </div>
      <h2 className="mt-8 text-xl font-semibold text-slate-800 animate-pulse">
        {MESSAGES[msgIndex]}
      </h2>
      <p className="mt-2 text-slate-500">This usually takes about 5 seconds.</p>
    </div>
  );
};

export default LoadingScreen;
