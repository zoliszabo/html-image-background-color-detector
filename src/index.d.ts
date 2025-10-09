export interface ColorResult {
  r: number;
  g: number;
  b: number;
  rgb: string;
  hex: string;
}

export function detectImageBackgroundColor(
  imgElement: HTMLImageElement,
  sampleRate?: number,
  colorRounding?: number
): ColorResult;

export default detectImageBackgroundColor;
