
import React, { useState, useEffect, useCallback } from 'react';
import { Language, AppState, CaneAnalysis, DeliverySlot } from './types';
import { TRANSLATIONS, INITIAL_SLOTS } from './constants';
import { LanguageToggle } from './components/LanguageToggle';
import { CameraScanner } from './components/CameraScanner';
import { StatsGrid } from './components/StatsGrid';
import { SlotBooking } from './components/SlotBooking';
import { VoiceAssistant } from './components/VoiceAssistant';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('sugar-nxt-state');
    return saved ? JSON.parse(saved) : {
      language: 'gu',
      history: [{
        qualityScore: 87,
        moisture: 12,
        brix: 18,
        pricePrediction: 24.5,
        biofuelPotential: 82,
        timestamp: new Date().toISOString()
      }],
      slots: INITIAL_SLOTS,
      bookedSlotId: null
    };
  });

  const t = TRANSLATIONS[state.language];

  useEffect(() => {
    localStorage.setItem('sugar-nxt-state', JSON.stringify(state));
  }, [state]);

  const setLanguage = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
  };

  const handleAnalysis = (data: CaneAnalysis) => {
    setState(prev => ({
      ...prev,
      history: [data, ...prev.history].slice(0, 10)
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBooking = (slotId: string) => {
    setState(prev => ({
      ...prev,
      bookedSlotId: slotId,
      slots: prev.slots.map(s => s.id === slotId ? { ...s, bookedCount: s.bookedCount + 1 } : s)
    }));
  };

  const handleVoiceCommand = (cmd: string) => {
    if (cmd.includes('slot') || cmd.includes('સ્લોટ') || cmd.includes('स्लॉट')) {
      const slotElement = document.getElementById('slots-section');
      slotElement?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.includes('scan') || cmd.includes('સ્કેન') || cmd.includes('स्कैन')) {
      // Trigger camera click via DOM or state
      const scanBtn = document.querySelector('button[title="Scan"]');
      (scanBtn as HTMLElement)?.click();
    }
  };

  const shareResults = () => {
    const last = state.history[0];
    const text = `${t.title} - ${t.analysisTitle}:\n- ${t.quality}: ${last.qualityScore}%\n- ${t.price}: ₹${last.pricePrediction}/kg\n- ${t.biofuel}: ${last.biofuelPotential}%`;
    const url = `whatsapp://send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`min-h-screen pb-20 selection:bg-green-200 ${state.language === 'gu' ? 'gujarati' : ''}`}>
      <LanguageToggle current={state.language} onSelect={setLanguage} />
      
      <header className="p-4 pt-6 bg-gradient-to-b from-green-50 to-transparent">
        <h1 className="text-3xl font-extrabold text-green-800 tracking-tight flex items-center gap-3">
          <span className="text-4xl">🌾</span>
          {t.title}
        </h1>
        <p className="text-gray-500 mt-1 font-medium">ISMA Sugar-NXT Hackathon 2026</p>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* Latest Analysis Stats */}
        {state.history.length > 0 && (
          <section className="mb-6 animate-in fade-in duration-700">
            <StatsGrid data={state.history[0]} t={t} />
            
            <div className="px-4 flex gap-3">
              <button
                onClick={shareResults}
                className="flex-1 py-3 px-4 bg-green-100 text-green-700 rounded-xl font-bold flex items-center justify-center gap-2 border border-green-200 active:bg-green-200 transition-colors"
              >
                <span>💬</span> {t.share}
              </button>
            </div>
          </section>
        )}

        {/* Action Button */}
        <CameraScanner onAnalysisComplete={handleAnalysis} t={t} />

        {/* Slots Section */}
        <section id="slots-section" className="mt-4">
          <SlotBooking 
            slots={state.slots} 
            bookedSlotId={state.bookedSlotId} 
            onBook={handleBooking} 
            t={t}
          />
        </section>

        {/* Waste Management Info */}
        <section className="p-4 mt-4">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span>♻️</span> {t.wasteManagement}
              </h2>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">AI Forecast</span>
            </div>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              Based on your quality analysis, your bagasse waste has high biofuel potential. Conversion can generate approx. 
              <span className="text-white font-bold"> {state.history[0]?.biofuelPotential * 1.5} kWh </span> of green energy.
            </p>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-green-400 h-full transition-all duration-1000" 
                style={{ width: `${state.history[0]?.biofuelPotential}%` }} 
              />
            </div>
          </div>
        </section>
      </main>

      <VoiceAssistant onCommand={handleVoiceCommand} t={t} />

      {/* Bottom Nav Mock for Mobile Feel */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t flex justify-around p-3 z-40">
        <button className="flex flex-col items-center gap-1 text-green-600">
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">📊</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Reports</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">⚙️</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
