import React, { useState } from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const presetColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280',
    '#1F2937', '#FFFFFF', '#000000', '#FEF3C7', '#DBEAFE'
  ];

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-10 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ backgroundColor: value }}
        />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          placeholder="#000000"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="grid grid-cols-5 gap-2 mb-3">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onChange(color);
                  setIsOpen(false);
                }}
                className="w-8 h-8 rounded-md border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-8 rounded-md border border-gray-300 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;