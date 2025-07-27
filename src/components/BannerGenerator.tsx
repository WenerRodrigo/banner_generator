import React from "react";
import { Palette } from "lucide-react";

const BannerGenerator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx--auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Banner Generator</h1>
                <p className="text-sm text-gray-600">Crie banners personalizados em segundos</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default BannerGenerator;
