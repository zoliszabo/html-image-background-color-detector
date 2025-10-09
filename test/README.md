# Test Suite

This directory contains the test suite for the HTML Image Background Color Detector library.

## Running Tests

1. First, build the library:
   ```bash
   npm run build
   ```

2. Run the browser tests:
   ```bash
   npm run browser-test
   ```

   This will start a local HTTP server and automatically open the test page in your browser.

   Alternatively, you can manually open `test/index.html` in your browser, but using a local server is recommended to avoid CORS issues.

## Adding Test Cases

Edit `test/test-cases.js` and add new test cases to the `testCases` array:

```javascript
{
    name: "Your Test Name",
    src: "path/to/image.jpg", // or data URI
    expected: {
        r: 0-255,  // Red channel value
        g: 0-255,  // Green channel value
        b: 0-255   // Blue channel value
    },
    sampleRate: 0.1,      // Optional: override default sample rate (default is 0.05 = 5%)
    colorRounding: 10     // Optional: override default color rounding (default is 5)
}
```

**Optional Parameters:**
- `sampleRate`: Higher values sample more pixels (more accurate but slower)
- `colorRounding`: Higher values group similar colors more aggressively (less precise), lower values preserve more color detail

## Test Images

You can use:
- Data URIs (embedded in the HTML)
- Local image files in the `test/` directory
- Remote URLs (must support CORS)

## Tolerance

The test suite allows a tolerance of ±15 in RGB values to account for:
- Color rounding in the detection algorithm
- Compression artifacts
- Browser rendering differences
