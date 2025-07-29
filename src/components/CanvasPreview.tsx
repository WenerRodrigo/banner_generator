import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { BannerConfig } from '../types/banner';
import { drawBanner } from '../utils/canvasUtils';


interface CanvasPreviewProps {
  config: BannerConfig;
  onConfigChange: (config: Partial<BannerConfig>) => void;
}

const CanvasPreview = forwardRef<HTMLCanvasElement, CanvasPreviewProps>(
  ({ config, onConfigChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
      if (canvasRef.current) {
        drawBanner(canvasRef.current, config);
      }
    }, [config]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = config.width / rect.width;
      const scaleY = config.height / rect.height;
      
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      // Verificar se clicou próximo ao texto
      const textDistance = Math.sqrt(
        Math.pow(mouseX - config.textX, 2) + Math.pow(mouseY - config.textY, 2)
      );

      if (textDistance < 50) {
        setIsDragging(true);
        setDragOffset({
          x: mouseX - config.textX,
          y: mouseY - config.textY
        });
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = config.width / rect.width;
      const scaleY = config.height / rect.height;
      
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      const newX = Math.max(0, Math.min(config.width, mouseX - dragOffset.x));
      const newY = Math.max(0, Math.min(config.height, mouseY - dragOffset.y));

      onConfigChange({
        textX: newX,
        textY: newY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
    };

    const maxWidth = 800;
    const scale = Math.min(maxWidth / config.width, 1);
    const displayWidth = config.width * scale;
    const displayHeight = config.height * scale;

    return (
      <div 
        ref={containerRef}
        className="flex justify-center items-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 min-h-[400px]"
      >
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={config.width}
            height={config.height}
            style={{
              width: `${displayWidth}px`,
              height: `${displayHeight}px`,
              cursor: isDragging ? 'grabbing' : 'grab',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="border border-gray-200"
          />
          
          <div className="absolute -top-6 left-0 px-2 py-1 bg-blue-600 text-white text-xs rounded-md font-mono">
            {config.width} × {config.height}
          </div>
          
          {isDragging && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-md">
              Arraste para posicionar o texto
            </div>
          )}
        </div>
      </div>
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';

export default CanvasPreview;