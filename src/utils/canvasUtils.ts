import { BannerConfig } from "../types/banner";


export const drawBanner = (canvas: HTMLCanvasElement, config: BannerConfig): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Configurar canvas
  canvas.width = config.width;
  canvas.height = config.height;

  // Limpar canvas
  ctx.clearRect(0, 0, config.width, config.height);

  // Desenhar fundo
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0, 0, config.width, config.height);

  // Configurar texto
  ctx.fillStyle = config.textColor;
  ctx.font = `${config.fontSize}px ${config.fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Adicionar sombra ao texto para melhor legibilidade
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Quebrar texto em múltiplas linhas se necessário
  const lines = wrapText(ctx, config.text, config.width - 40);
  const lineHeight = config.fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  const startY = config.textY - (totalHeight / 2) + (lineHeight / 2);

  lines.forEach((line, index) => {
    ctx.fillText(line, config.textX, startY + (index * lineHeight));
  });

  // Remover sombra
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
};

const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length > 0 ? lines : [text];
};