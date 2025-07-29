export const downloadImage = async (
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpeg' | 'webp',
  filename: string
): Promise<void> => {
  const mimeType = `image/${format}`;
  const quality = format === 'jpeg' ? 0.9 : undefined;
  
  try {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, mimeType, quality);
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao fazer download:', error);
    throw error;
  }
};

export const generateShareableUrl = async (canvas: HTMLCanvasElement): Promise<string> => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        resolve(url);
      }
    }, 'image/png');
  });
};

export const canvasToBase64 = (canvas: HTMLCanvasElement, format: 'png' | 'jpeg' | 'webp' = 'png'): string => {
  const mimeType = `image/${format}`;
  const quality = format === 'jpeg' ? 0.9 : undefined;
  return canvas.toDataURL(mimeType, quality);
};