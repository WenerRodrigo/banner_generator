import React, { useEffect, useState } from "react";

interface FontSelectorProps {
  selectedFont: string;
  onChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  onChange,
}) => {
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  const googleFonts = [
    "Inter",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Oswald",
    "Source Sans Pro",
    "Raleway",
    "Poppins",
    "Nunito",
    "Playfair Display",
    "Merriweather",
    "Dancing Script",
    "Pacifico",
    "Lobster",
  ];

  const systemFonts = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Courier New",
  ];

  const loadGoogleFont = (fontName: string) => {
    if (loadedFonts.has(fontName) || systemFonts.includes(fontName)) return;

    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      /\s+/g,
      "+"
    )}:wght@400;700&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    setLoadedFonts((prev) => new Set([...prev, fontName]));
  };

  useEffect(() => {
    //carregar fontes selecionada
    if (googleFonts.includes(selectedFont)) {
      loadGoogleFont;
    }
  }, [selectedFont]);

  const handleFontChange = (fontName: string) => {
    if (googleFonts.includes(fontName)) {
      loadGoogleFont(fontName);
    }
    onChange(fontName);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        Fonte
      </label>

      <select
        value={selectedFont}
        onChange={(e) => handleFontChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ fontFamily: selectedFont }}
      >
        <optgroup label="Google Fonts">
          {googleFonts.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </optgroup>

        <optgroup label="Fontes do Sistema">
          {systemFonts.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </optgroup>
      </select>

      <div
        className="mt-2 p-2 bg-gray-50 rounded-md text-sm text-center"
        style={{ fontFamily: selectedFont }}
      >
        Exemplo: {selectedFont}
      </div>
    </div>
  );
};

export default FontSelector;
