export interface ColorResult {
  r: number;
  g: number;
  b: number;
  a: number;
  rgb: string;
  rgba: string;
  hex: string;
  frequency: number;
}

export function detectImageBackgroundColor(
  imgElement: HTMLImageElement,
  sampleRate?: number,
  colorRounding?: number,
  alphaRounding?: number
): ColorResult;

export default detectImageBackgroundColor;
