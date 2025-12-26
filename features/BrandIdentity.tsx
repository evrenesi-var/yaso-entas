
import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { generateDesignVisual } from '../services/gemini';

const BrandIdentity: React.FC = () => {
  const [logo, setLogo] = useState<string | undefined>();
  const [brandInfo, setBrandInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [moodboardUrl, setMoodboardUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!brandInfo.trim()) return;
    setIsLoading(true);
    setMoodboardUrl(null);
    try {
      // Direct prompt generation to bypass the textual analysis step
      const prompt = `A professional aesthetic industrial design moodboard based on these brand values: "${brandInfo}". 
      Include high-quality macro shots of materials (brushed metal, textured fabric, wood, plastic), 
      a sophisticated color palette (visual swatches), and atmospheric design language inspiration. 
      Professional presentation layout, minimalist and clean.`;
      
      const url = await generateDesignVisual(prompt, '16:9', logo);
      setMoodboardUrl(url);

    } catch (err) {
      console.error(err);
      alert("Moodboard oluşturulurken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">Moodboard Oluşturucu</h3>
            <p className="text-slate-500">Ürününüzün görsel dilini, renklerini ve malzemelerini belirlemek için bir moodboard oluşturun.</p>
          </div>

          <ImageUploader 
            label="Marka Logosu (Opsiyonel)" 
            onImageSelect={setLogo} 
            preview={logo}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Marka Kimliği & Teması</label>
            <textarea
              value={brandInfo}
              onChange={(e) => setBrandInfo(e.target.value)}
              placeholder="Markayı ve tasarımı tarif edin (Örn: Minimalist, doğa dostu, ahşap ve metal detaylı ev ofis ürünleri)..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !brandInfo}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-palette"></i>}
            Moodboard Üret
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center justify-center min-h-[300px] text-center">
          {!isLoading && !moodboardUrl ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-slate-300">
                <i className="fa-solid fa-image text-2xl"></i>
              </div>
              <p className="text-sm text-slate-400">Marka bilgisini girin ve moodboard görselinizi oluşturun.</p>
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-indigo-600 font-medium">Görsel oluşturuluyor...</p>
              <p className="text-xs text-slate-400 italic">Malzemeler ve renk paleti hazırlanıyor.</p>
            </div>
          ) : (
            <div className="space-y-4">
               <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-500">
                <i className="fa-solid fa-check text-2xl"></i>
              </div>
              <h4 className="font-bold text-slate-800">Görsel Hazır!</h4>
              <p className="text-sm text-slate-500">Aşağıdaki butonu kullanarak indirebilir veya görseli inceleyebilirsiniz.</p>
            </div>
          )}
        </div>
      </div>

      {moodboardUrl && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-slate-800">Final Moodboard</h4>
            <a 
              href={moodboardUrl} 
              download="moodboard.png" 
              className="px-6 py-2 bg-slate-900 hover:bg-black text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
            >
              <i className="fa-solid fa-download"></i>
              Görseli İndir
            </a>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img src={moodboardUrl} alt="Generated Moodboard" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandIdentity;
