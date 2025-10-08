# HTML Image Background Color Detector

A lightweight JavaScript library that detects the dominant background color of an HTML image element by analyzing edge pixels.

## Installation

```bash
npm install @zoliszabo/html-image-background-color-detector
```

## Usage

### ES Module (Node.js / Bundlers)

```javascript
import { detectImageBackgroundColor } from '@zoliszabo/html-image-background-color-detector';

const img = document.querySelector('img');
const color = detectImageBackgroundColor(img);

console.log(color.hex); // "#87ceeb"
console.log(color.rgb); // "rgb(135, 206, 235)"
console.log(color.r, color.g, color.b); // 135 206 235
```

### UMD (Browser via CDN)

```html
<script src="https://unpkg.com/@zoliszabo/html-image-background-color-detector/dist/index.umd.min.js"></script>
<script>
  const img = document.querySelector('img');
  const color = HtmlImageBackgroundColorDetector.detectImageBackgroundColor(img);

  console.log(color.hex); // "#87ceeb"
  console.log(color.rgb); // "rgb(135, 206, 235)"
</script>
```

Or use the non-minified version for development:

```html
<script src="https://unpkg.com/@zoliszabo/html-image-background-color-detector/dist/index.umd.js"></script>
```

### With Custom Sample Rate

By default, the function samples 5% of the image edges. You can adjust this:

```javascript
// Sample 10% of edges for more accuracy
const color = detectImageBackgroundColor(img, 0.10);
```

## How It Works

The library:
1. Creates a temporary canvas and draws the image
2. Samples pixels along all four edges (top, bottom, left, right)
3. Rounds color values to reduce variance
4. Finds the most frequently occurring color
5. Returns the dominant background color in multiple formats

## API

### `detectImageBackgroundColor(imgElement, sampleRate?)`

**Parameters:**
- `imgElement` (HTMLImageElement): The image element to analyze
- `sampleRate` (number, optional): Percentage of width/height to sample (default: 0.05 = 5%)

**Returns:**
```typescript
{
  r: number;      // Red channel (0-255)
  g: number;      // Green channel (0-255)
  b: number;      // Blue channel (0-255)
  rgb: string;    // CSS rgb() format
  hex: string;    // Hex color code
}
```

## License

MIT
