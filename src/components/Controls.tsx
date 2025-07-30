import React from "react";
import { BannerConfig } from "../types/banner";
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';
import { Sliders, Type, Palette, Move } from 'lucide-react';

interface ControlsProps {
  config: BannerConfig;
  onChange: (config: Partial<BannerConfig>) => void;
}

const Controls: React.FC<ControlsProps> = ({ config, onChange }) => {
  const presetSizes = [
    { name: "Facebook Cover", width: 820, height: 312 },
    { name: "Instagram Post", width: 1080, height: 1080 },
    { name: "Instagram Story", width: 1080, height: 1920 },
    { name: "Twitter Header", width: 1500, height: 500 },
    { name: "YouTube Thumbnail", width: 1280, height: 720 },
    { name: "LinkedIn Cover", width: 1584, height: 396 },
    { name: "Banner Web", width: 728, height: 90 },
    { name: "Square Banner", width: 500, height: 500 },
  ];

    return (
    <div className="space-y-8">
      {/* Dimensões */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Sliders className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-900">Dimensões</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Largura (px)
              </label>
              <input
                type="number"
                value={config.width}
                onChange={(e) => onChange({ width: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min=""
                max="2000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Altura (px)
              </label>
              <input
                type="number"
                value={config.height}
                onChange={(e) => onChange({ height: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min=""
                max="2000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Tamanhos Predefinidos
            </label>
            <select
              onChange={(e) => {
                const preset = presetSizes.find(p => p.name === e.target.value);
                if (preset) {
                  onChange({ 
                    width: preset.width, 
                    height: preset.height,
                    textX: preset.width / 2,
                    textY: preset.height / 2
                  });
                }
              }}
              value=""
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione um tamanho...</option>
              {presetSizes.map((preset) => (
                <option key={preset.name} value={preset.name}>
                  {preset.name} ({preset.width}×{preset.height})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Texto */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Type className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-900">Texto</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Conteúdo
            </label>
            <textarea
              value={config.text}
              onChange={(e) => onChange({ text: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Digite seu texto aqui..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tamanho da Fonte
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="12"
                max="120"
                value={config.fontSize}
                onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
                className="flex-1"
              />
              <span className="text-sm font-mono text-gray-600 w-8">
                {config.fontSize}
              </span>
            </div>
          </div>

          <FontSelector
            selectedFont={config.fontFamily}
            onChange={(fontFamily) => onChange({ fontFamily })}
          />
        </div>
      </div>

      {/* Posição */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Move className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-900">Posição</h3>
        </div>
        
        <div className="space-y-3">
          <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded-md">
            💡 Dica: Clique e arraste o texto no preview para posicioná-lo
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onChange({ textX: config.width * 0.2, textY: config.height * 0.2 })}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              ↖ Superior Esq.
            </button>
            <button
              onClick={() => onChange({ textX: config.width * 0.5, textY: config.height * 0.2 })}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              ↑ Superior
            </button>
            <button
              onClick={() => onChange({ textX: config.width * 0.8, textY: config.height * 0.2 })}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              ↗ Superior Dir.
            </button>
            <button
              onClick={() => onChange({ textX: config.width * 0.2, textY: config.height * 0.5 })}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              ← Esquerda
            </button>
            <button
              onClick={() => onChange({ textX: config.width * 0.5, textY: config.height * 0.5 })}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              • Centro
            </button>
            <button
              onClick={() => onChange({ textX: config.width * 0.8, textY: config.height * 0.5 })}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              → Direita
            </button>
            <button
              onClick={() => onChange({ textX: config.width * 0.2, textY: config.height * 0.8 })}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              ↙ Inferior Esq.
            </button>
            <button
              onClick={() => onChange({ textX: config.width * 0.5, textY: config.height * 0.8 })}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              ↓ Inferior
            </button>
            <button
              onClick={() => onChange({ textX: config.width * 0.8, textY: config.height * 0.8 })}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              ↘ Inferior Dir.
            </button>
          </div>
        </div>
      </div>

      {/* Cores */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-900">Cores</h3>
        </div>
        
        <div className="space-y-4">
          <ColorPicker
            label="Cor de Fundo"
            value={config.backgroundColor}
            onChange={(backgroundColor) => onChange({ backgroundColor })}
          />
          
          <ColorPicker
            label="Cor do Texto"
            value={config.textColor}
            onChange={(textColor) => onChange({ textColor })}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;