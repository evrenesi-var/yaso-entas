
import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { analyzeSketch, generateDesignVisual } from '../services/gemini';

const VisualStudio: React.FC = () => {
  const [sketch, setSketch] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [renderUrl, setRenderUrl] = useState<string | null>(null);
  const [technicalUrl, setTechnicalUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!sketch) return;
    setIsLoading(true);
    setRenderUrl(null);
    setTechnicalUrl(null);
    try {
      // 1. Analyze the sketch
      const analysis = await analyzeSketch(sketch);

      // 2. Generate Render
      const renderPrompt = `Professional industrial design product render. High-end lifestyle photography style. Material details: sleek finish, realistic textures. Based on this description: ${analysis}. Studio lighting, clean background.`;
      const render = await generateDesignVisual(renderPrompt, '1:1', sketch);
      setRenderUrl(render);

      // 3. Generate Technical Drawing
      const technicalPrompt = `Professional industrial design technical drawing. Orthographic blueprint style. White background, thin black lines, multiple views (front, side, top), dimension lines. Based on this product: ${analysis}. Clean minimalist CAD drawing style.`;
      const technical = await generateDesignVisual(technicalPrompt, '1:1', sketch);
      setTechnicalUrl(technical);

    } catch (err) {
      console.error(err);
      alert("Görsel oluşturma sırasında bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">Visual Studio</h3>
          <p className="text-slate-500">Eskizinizi yükleyin, biz onu profesyonel bir render'a ve teknik çizime dönüştürelim.</p>
          
          <ImageUploader 
            label="Eskiz Yükle" 
            onImageSelect={setSketch} 
            preview={sketch}
          />

          <button
            onClick={handleGenerate}
            disabled={isLoading || !sketch}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-3 transition-all"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
            Görselleştir (Render & Teknik)
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-500">
            <i className="fa-solid fa-lightbulb text-2xl"></i>
          </div>
          <h4 className="font-bold text-slate-800">İpucu</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Eskizinizin net bir ışık altında çekildiğinden emin olun. Konturlar ne kadar belirginse, yapay zeka formu o kadar iyi anlayacaktır.
          </p>
        </div>
      </div>

      {(renderUrl || technicalUrl || isLoading) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Render Result */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between px-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
              <span>Final Render</span>
              {renderUrl && <a href={renderUrl} download="render.png" className="hover:underline">Download</a>}
            </div>
            <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-50">
              {isLoading && !renderUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <i className="fa-solid fa-circle-notch fa-spin text-indigo-500 text-3xl"></i>
                  <span className="text-xs text-slate-400 font-medium">Rendering...</span>
                </div>
              ) : renderUrl ? (
                <img src={renderUrl} alt="Render" className="w-full h-full object-cover" />
              ) : (
                <i className="fa-solid fa-image text-4xl text-slate-200"></i>
              )}
            </div>
          </div>

          {/* Technical Drawing Result */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between px-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
              <span>Technical Drawing</span>
              {technicalUrl && <a href={technicalUrl} download="technical.png" className="hover:underline">Download</a>}
            </div>
            <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-50">
              {isLoading && !technicalUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <i className="fa-solid fa-circle-notch fa-spin text-indigo-500 text-3xl"></i>
                  <span className="text-xs text-slate-400 font-medium">Drafting...</span>
                </div>
              ) : technicalUrl ? (
                <img src={technicalUrl} alt="Technical" className="w-full h-full object-cover" />
              ) : (
                <i className="fa-solid fa-ruler-combined text-4xl text-slate-200"></i>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualStudio;
