
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './features/Dashboard';
import MarketResearch from './features/MarketResearch';
import VisualStudio from './features/VisualStudio';
import StoryboardGenerator from './features/StoryboardGenerator';
import BrandIdentity from './features/BrandIdentity';
import { AppView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  // Check if an API key has already been selected on app initialization.
  useEffect(() => {
    const checkKey = async () => {
      try {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      } catch (err) {
        console.error("Failed to check API key selection:", err);
        setHasApiKey(false);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    try {
      await (window as any).aistudio.openSelectKey();
      // Assume the key selection was successful to avoid race conditions.
      setHasApiKey(true);
    } catch (err) {
      console.error("Failed to open key selection dialog:", err);
    }
  };

  const renderView = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return <Dashboard onViewSelect={setActiveView} />;
      case AppView.MARKET_RESEARCH:
        return <MarketResearch />;
      case AppView.STUDIO:
        return <VisualStudio />;
      case AppView.STORYBOARD:
        return <StoryboardGenerator />;
      case AppView.BRANDING:
        return <BrandIdentity />;
      default:
        return <Dashboard onViewSelect={setActiveView} />;
    }
  };

  // If no API key is selected, show a mandatory selection screen as per Veo/Pro model requirements.
  if (hasApiKey === false) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white p-8">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 text-center space-y-6">
          <div className="w-20 h-20 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-key text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">API Key Required</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            DesignMate uses professional-grade AI models for high-quality 2K/4K renders and storyboards. 
            To access these features, please select an API key from a paid Google Cloud project.
          </p>
          <button 
            onClick={handleSelectKey}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-arrow-pointer"></i>
            Select API Key
          </button>
          <div className="pt-4 border-t border-slate-700">
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Learn about billing & project requirements
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Prevents rendering until the key selection status is confirmed.
  if (hasApiKey === null) return null;

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      <div className="animate-in fade-in duration-500">
        {renderView()}
      </div>
    </Layout>
  );
};

export default App;
