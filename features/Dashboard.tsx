
import React from 'react';
import { AppView } from '../types';

interface DashboardProps {
  onViewSelect: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewSelect }) => {
  const stats = [
    { label: 'Aktif Projeler', value: '4', icon: 'fa-folder-open', color: 'text-blue-500' },
    { label: 'AI Analizleri', value: '12', icon: 'fa-microchip', color: 'text-purple-500' },
    { label: 'Renderlar', value: '28', icon: 'fa-cube', color: 'text-indigo-500' },
    { label: 'Kaydedilenler', value: '15', icon: 'fa-bookmark', color: 'text-pink-500' },
  ];

  const tools = [
    { 
      id: AppView.MARKET_RESEARCH, 
      title: 'Pazar Araştırması', 
      desc: 'Sektör trendlerini ve kullanıcı ihtiyaçlarını analiz edin.', 
      icon: 'fa-magnifying-glass', 
      bg: 'bg-blue-50', 
      accent: 'text-blue-600' 
    },
    { 
      id: AppView.STUDIO, 
      title: 'Visual Studio', 
      desc: 'Eskizlerden profesyonel render ve teknik çizimler üretin.', 
      icon: 'fa-pen-ruler', 
      bg: 'bg-indigo-50', 
      accent: 'text-indigo-600' 
    },
    { 
      id: AppView.STORYBOARD, 
      title: 'Storyboard', 
      desc: 'Kullanım senaryolarını 4 panelli görsellerle anlatın.', 
      icon: 'fa-film', 
      bg: 'bg-amber-50', 
      accent: 'text-amber-600' 
    },
    { 
      id: AppView.BRANDING, 
      title: 'Brand Identity', 
      desc: 'Marka kimliğine uygun moodboardlar tasarlayın.', 
      icon: 'fa-briefcase', 
      bg: 'bg-emerald-50', 
      accent: 'text-emerald-600' 
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Hoş geldin, Tasarımcı!</h1>
          <p className="text-slate-400 text-lg mb-8">
            Okul projelerini bir üst seviyeye taşımak için AI gücünü kullanmaya başla. 
            Araştırma, görselleştirme ve sunum araçların tek bir yerde.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => onViewSelect(AppView.STUDIO)}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-bold transition-all"
            >
              Yeni Render Başlat
            </button>
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all border border-slate-700">
              Projelerimi Gör
            </button>
          </div>
        </div>
        <i className="fa-solid fa-compass-drafting absolute right-[-20px] bottom-[-20px] text-[200px] text-white/5 rotate-12"></i>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
              <i className={`fa-solid ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tools Section */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-grid-2 text-indigo-500"></i>
          Tasarım Araçları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onViewSelect(tool.id)}
              className="group text-left bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${tool.bg} ${tool.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${tool.icon} text-xl`}></i>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{tool.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{tool.desc}</p>
              <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Aracı Aç</span>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips / Feedback Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-indigo-50 rounded-3xl p-8 flex items-center gap-8">
          <div className="hidden sm:flex w-24 h-24 bg-white rounded-full items-center justify-center text-indigo-500 shadow-xl shadow-indigo-500/10">
            <i className="fa-solid fa-rocket text-3xl"></i>
          </div>
          <div className="flex-1">
            <h4 className="text-indigo-900 font-bold text-xl mb-2">Hızlı Teslimat İpucu</h4>
            <p className="text-indigo-700/80 leading-relaxed">
              Jüri sunumlarınız için teknik çizimleri "4K" modunda alın. Bu sayede paftalarınızda çizgiler ne kadar büyük basılırsa basılsın netliğini koruyacaktır.
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col justify-center text-center">
          <p className="text-slate-400 text-sm mb-4">Bir sorunun mu var?</p>
          <button className="w-full py-3 border-2 border-slate-100 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Destek Al
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
