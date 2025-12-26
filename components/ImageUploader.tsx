
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
  label: string;
  preview?: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, label, preview, className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer bg-white relative overflow-hidden group min-h-[160px] ${
          preview ? 'border-indigo-300' : 'border-slate-200 hover:border-indigo-400'
        }`}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-sm font-medium">Change Image</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 p-6">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors">
              <i className="fa-solid fa-cloud-arrow-up text-xl"></i>
            </div>
            <p className="text-xs text-slate-500 text-center">
              Click to upload or drag & drop<br/>
              <span className="font-semibold text-indigo-600">JPG, PNG up to 10MB</span>
            </p>
          </div>
        )}
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange} 
        />
      </div>
    </div>
  );
};

export default ImageUploader;
