# HTML Image Background Color Detector

A lightweight JavaScript library that detects the dominant background color of an HTML image element by analyzing edge pixels.

## Installation

```bash
npm install @zoliszabo/html-image-background-color-detector
```

## Usage

### ES Module (Node.js / Bundlers)

```javascript
import detectImageBackgroundColor from '@zoliszabo/html-image-background-color-detector';

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
  const color = detectImageBackgroundColor(img);

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

### With Custom Color Rounding

By default, color values are rounded to the nearest 5 to reduce variance. You can adjust this:

```javascript
// Use stricter rounding (round to nearest 10)
const color = detectImageBackgroundColor(img, 0.05, 10);

// Use more precise detection (round to nearest 1 - no rounding)
const color2 = detectImageBackgroundColor(img, 0.05, 1);
```

## How It Works

The library:
1. Creates a temporary canvas and draws the image
2. Samples pixels along all four edges (top, bottom, left, right)
3. Rounds color values to reduce variance
4. Finds the most frequently occurring color
5. Returns the dominant background color in multiple formats

## Important: CORS Restrictions

⚠️ **This library uses canvas to analyze image pixels, which is subject to CORS (Cross-Origin Resource Sharing) restrictions.**

### What this means:

- **Same-origin images**: Images from the same domain as your website work without any configuration
- **Cross-origin images**: Images from different domains (CDNs, external URLs) will cause a `SecurityError` unless properly configured

### When using cross-origin images:

1. **The server hosting the image must send CORS headers**
   - The image server must include `Access-Control-Allow-Origin` header
   - Example: `Access-Control-Allow-Origin: *` or `Access-Control-Allow-Origin: https://yourdomain.com`

2. **Set the `crossOrigin` attribute on your image element**

   In JavaScript:
   ```javascript
   const img = document.querySelector('img');
   img.crossOrigin = 'anonymous'; // Required for CORS images
   const color = detectImageBackgroundColor(img);
   ```

   Or in HTML:
   ```html
   <img src="https://example.com/image.jpg" crossorigin="anonymous" alt="Description">
   ```

### Common errors:

If you see errors like:
- `SecurityError: The operation is insecure`
- `Tainted canvases may not be exported`
- `Failed to execute 'getImageData' on 'CanvasRenderingContext2D'`

This means the image is from a different origin and either:
- The server doesn't send proper CORS headers, OR
- You haven't set `crossOrigin = 'anonymous'` on the image element

**Solution**: Either use same-origin images, or ensure the image server supports CORS and set the `crossOrigin` attribute.

Learn more: [MDN - CORS enabled image](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/CORS_enabled_image)

## API

### `detectImageBackgroundColor(imgElement, sampleRate?, colorRounding?)`

**Parameters:**
- `imgElement` (HTMLImageElement): The image element to analyze
- `sampleRate` (number, optional): Percentage of width/height to sample (default: 0.05 = 5%)
- `colorRounding` (number, optional): Value to round color channels to reduce variance (default: 5)
  - Higher values (e.g., 10) = more aggressive grouping, less precision
  - Lower values (e.g., 1) = more precise detection, may be affected by noise

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
