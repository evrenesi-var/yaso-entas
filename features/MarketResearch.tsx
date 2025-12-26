
import React, { useState } from 'react';
import { performMarketResearch } from '../services/gemini';
import { ResearchResult } from '../types';

const MarketResearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const handleResearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const data = await performMarketResearch(query);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Pazar Araştırması</h3>
        <p className="text-slate-500 mb-6">Proje temanız hakkında güncel pazar verileri, trendler ve rakip analizleri toplayın.</p>
        
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Örn: Sürdürülebilir kahve makineleri, 2024 ofis mobilyası trendleri..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
          <button
            onClick={handleResearch}
            disabled={isLoading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center gap-2 transition-all"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-bolt"></i>}
            Araştır
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-indigo-600">
                <i className="fa-solid fa-brain"></i>
                <h4 className="font-bold uppercase tracking-wider text-xs">AI Analizi</h4>
              </div>
              <div className="prose prose-slate max-w-none prose-sm">
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-base">
                  {result.text}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-brands fa-google text-indigo-500"></i>
                Kaynaklar & Referanslar
              </h4>
              <div className="space-y-3">
                {result.sources.length > 0 ? (
                  result.sources.map((src, idx) => src.web && (
                    <a
                      key={idx}
                      href={src.web.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 transition-all group"
                    >
                      <p className="text-sm font-medium text-slate-800 line-clamp-2 group-hover:text-indigo-600">
                        {src.web.title}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block truncate">
                        {src.web.uri}
                      </span>
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 italic">Doğrudan kaynak bulunamadı.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketResearch;
