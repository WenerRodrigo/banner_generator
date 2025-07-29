import React from "react";
import { Download, Palette, Share2, Type } from "lucide-react";
import Controls from "./Controls";

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
              <h1 className="text-2xl font-bold text-gray-900">
                Banner Generator
              </h1>
              <p className="text-sm text-gray-600">
                Crie banners personalizados em segundos
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Share2 className="w-4 h-4 mr-2" />
            </button>

            <div className="relative">
              <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slat-200 p-6 sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <Type className="w-5 h-5 text-blue-600"/>
                <h2 className="text-lg font-semibold text-gray-900">Configurações</h2>
              </div>

              <Controls />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerGenerator;
