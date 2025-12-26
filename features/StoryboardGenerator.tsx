
import React, { useState } from 'react';
import { generateDesignVisual } from '../services/gemini';
import { ImageSize } from '../types';

const StoryboardGenerator: React.FC = () => {
  const [productDesc, setProductDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [storyboardUrl, setStoryboardUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!productDesc.trim()) return;
    setIsLoading(true);
    try {
      const prompt = `A professional 4-panel product storyboard showing a user interacting with this product: ${productDesc}. Panels show: 1. Approach, 2. Interaction start, 3. Main usage scenario, 4. Storage/Exit. Clean comic layout style, line art with soft coloring, professional industrial design presentation.`;
      // Pass undefined for base64Image and '2K' for imageSize
      const url = await generateDesignVisual(prompt, '16:9', undefined, '2K');
      setStoryboardUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Storyboard Oluşturucu</h3>
        <p className="text-slate-500 mb-6">Ürününüzün kullanıcı tarafından nasıl deneyimlendiğini görselleştiren bir senaryo hazırlayın.</p>
        
        <div className="space-y-4">
          <textarea
            value={productDesc}
            onChange={(e) => setProductDesc(e.target.value)}
            placeholder="Ürününüzü ve ana kullanım senaryosunu tarif edin (Örn: Katlanabilir şehir içi scooter'ın toplu taşımaya binerken kullanımı)..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !productDesc}
            className="px-8 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-film"></i>}
            Storyboard Oluştur
          </button>
        </div>
      </div>

      {isLoading && !storyboardUrl && (
        <div className="h-64 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse text-sm">Senaryo panelleri çiziliyor...</p>
        </div>
      )}

      {storyboardUrl && (
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800">Kullanım Senaryosu Görseli</h4>
            <a href={storyboardUrl} download="storyboard.png" className="text-indigo-600 hover:underline text-sm font-semibold">Download Storyboard</a>
          </div>
          <img src={storyboardUrl} alt="Storyboard" className="w-full h-auto rounded-xl shadow-inner border" />
          <div className="mt-6 grid grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Panel 1</span><p className="text-xs text-slate-600">Yaklaşım & Hazırlık</p></div>
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Panel 2</span><p className="text-xs text-slate-600">İlk Temas</p></div>
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Panel 3</span><p className="text-xs text-slate-600">Aktif Kullanım</p></div>
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Panel 4</span><p className="text-xs text-slate-600">Depolama & Sonuç</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryboardGenerator;
