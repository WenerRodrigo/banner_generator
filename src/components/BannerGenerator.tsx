import React, { useState, useRef, useCallback } from 'react';
import { Download, Share2, Palette, Type, Maximize2 } from 'lucide-react';
import CanvasPreview from './CanvasPreview';
import Controls from './Controls';
import { BannerConfig } from '../types/banner';
import { downloadImage, generateShareableUrl } from '../utils/imageUtils';

const BannerGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [config, setConfig] = useState<BannerConfig>({
    width: 800,
    height: 400,
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF',
    text: 'Seu Banner Aqui',
    fontSize: 48,
    fontFamily: 'Inter',
    textX: 400,
    textY: 200,
  });

  const [shareUrl, setShareUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleConfigChange = useCallback((newConfig: Partial<BannerConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    try {
      const url = await generateShareableUrl(canvasRef.current);
      setShareUrl(url);
    } catch (error) {
      console.error('Erro ao gerar URL:', error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleDownload = useCallback(async (format: 'png' | 'jpeg' | 'webp') => {
    if (!canvasRef.current) return;
    await downloadImage(canvasRef.current, format, `banner-${config.width}x${config.height}`);
  }, [config.width, config.height]);

  const copyShareUrl = useCallback(async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      // Adicionar toast de feedback aqui se necessário
    }
  }, [shareUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Banner Generator</h1>
              <p className="text-sm text-gray-600">Crie banners profissionais em segundos</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {isGenerating ? 'Gerando...' : 'Gerar Link'}
            </button>
            
            <div className="relative">
              <button
                onClick={() => handleDownload('png')}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <Type className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Configurações</h2>
              </div>
              
              {/* <Controls
                config={config}
                onChange={handleConfigChange}
              /> */}
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Maximize2 className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-sm rounded-md font-mono">
                    {config.width} × {config.height}px
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload('png')}
                    className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => handleDownload('jpeg')}
                    className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
                  >
                    JPEG
                  </button>
                  <button
                    onClick={() => handleDownload('webp')}
                    className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
                  >
                    WebP
                  </button>
                </div>
              </div>

              <CanvasPreview
                ref={canvasRef}
                config={config}
                onConfigChange={handleConfigChange}
              />

              {shareUrl && (
                <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Compartilhável:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm bg-white"
                    />
                    <button
                      onClick={copyShareUrl}
                      className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Copiar
                    </button>
                    <a
                      href={shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-slate-600 text-white text-sm rounded-md hover:bg-slate-700 transition-colors"
                    >
                      Abrir
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerGenerator;