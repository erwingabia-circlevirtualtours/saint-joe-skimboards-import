/**
 * Client-Side Image Compression Pipeline for Saint Joe Skimboards CMS
 * Compresses raw workshop & mobile camera photos down ~90-95% using an HTML5 Canvas
 * without requiring any server-side infrastructure (100% AWS S3 compatible).
 */

export interface CompressionResult {
  dataUrl: string;
  originalBytes: number;
  compressedBytes: number;
  reductionPercentage: number;
  width: number;
  height: number;
  format: string;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Resizes an image file using an offscreen canvas to maxDimension (default 1200px)
 * and re-encodes to JPEG at quality (default 0.82).
 */
export async function compressImageFile(
  file: File,
  maxDimension = 1200,
  quality = 0.82
): Promise<CompressionResult> {
  const originalBytes = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate clamped dimensions preserving aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to obtain 2D canvas context'));
          return;
        }

        // Enable high-quality bicubic smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Fill with white background in case of transparent PNGs
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG with specified quality
        const dataUrl = canvas.toDataURL('image/jpeg', quality);

        // Calculate compressed size from Base64 string
        const base64Str = dataUrl.split(',')[1] || '';
        const compressedBytes = Math.round((base64Str.length * 3) / 4);

        const reductionPercentage = originalBytes > 0
          ? Math.max(0, Math.round(((originalBytes - compressedBytes) / originalBytes) * 100))
          : 0;

        resolve({
          dataUrl,
          originalBytes,
          compressedBytes,
          reductionPercentage,
          width,
          height,
          format: 'image/jpeg',
        });
      };

      img.onerror = () => reject(new Error('Could not load image into DOM'));
      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Extracts the first image file from a clipboard paste event
 */
export function getFileFromClipboard(clipboardData: DataTransfer | null): File | null {
  if (!clipboardData || !clipboardData.items) return null;
  for (let i = 0; i < clipboardData.items.length; i++) {
    const item = clipboardData.items[i];
    if (item.type.indexOf('image') !== -1) {
      return item.getAsFile();
    }
  }
  return null;
}
