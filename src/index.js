/**
 * Detects the main background color of an image element
 * @param {HTMLImageElement} imgElement - The image element to analyze
 * @param {number} sampleRate - Percentage of width/height to use as sample size (default: 0.05 = 5%)
 * @param {number} colorRounding - Value to round RGB color channels to reduce variance (default: 5)
 * @param {number} alphaRounding - Value to round alpha channel to reduce variance (default: 5)
 * @returns {Object} Object containing RGB/RGBA and hex color values
 * @example
 * import { detectImageBackgroundColor } from './imageColorDetector.js';
 *
 * const img = document.querySelector('img');
 * const color = detectImageBackgroundColor(img);
 * console.log(color.hex); // "#87ceeb"
 * console.log(color.rgb); // "rgb(135, 206, 235)"
 * console.log(color.rgba); // "rgba(135, 206, 235, 1.00)"
 * console.log(color.a); // 255 (fully opaque)
 *
 * // With custom sample rate (10% instead of 5%)
 * const color2 = detectImageBackgroundColor(img, 0.10);
 *
 * // With custom sample rate and color rounding
 * const color3 = detectImageBackgroundColor(img, 0.10, 10);
 *
 * // With custom alpha rounding (group similar transparency levels)
 * const color4 = detectImageBackgroundColor(img, 0.05, 5, 50);
 */
export default function detectImageBackgroundColor(imgElement, sampleRate = 0.05, colorRounding = 5, alphaRounding = 5) {
    // Create a temporary canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match image
    canvas.width = imgElement.naturalWidth || imgElement.width;
    canvas.height = imgElement.naturalHeight || imgElement.height;

    // Draw image to canvas
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Sample edge pixels (likely to be background)
    const edgePixels = [];
    const horizontalSampleSize = Math.max(1, Math.floor(canvas.width * sampleRate));
    const verticalSampleSize = Math.max(1, Math.floor(canvas.height * sampleRate));

    // Top edge
    for (let x = 0; x < canvas.width; x += horizontalSampleSize) {
        edgePixels.push(getPixelColor(data, x, 0, canvas.width));
    }

    // Bottom edge
    for (let x = 0; x < canvas.width; x += horizontalSampleSize) {
        edgePixels.push(getPixelColor(data, x, canvas.height - 1, canvas.width));
    }

    // Left edge
    for (let y = 0; y < canvas.height; y += verticalSampleSize) {
        edgePixels.push(getPixelColor(data, 0, y, canvas.width));
    }

    // Right edge
    for (let y = 0; y < canvas.height; y += verticalSampleSize) {
        edgePixels.push(getPixelColor(data, canvas.width - 1, y, canvas.width));
    }

    // Find most common color
    const [dominantColor, frequency] = getMostFrequentColor(edgePixels, colorRounding, alphaRounding);

    // Return color in multiple formats
    return {
        r: dominantColor.r,
        g: dominantColor.g,
        b: dominantColor.b,
        a: dominantColor.a,
        rgb: `rgb(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b})`,
        rgba: `rgba(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b}, ${(dominantColor.a / 255).toFixed(2)})`,
        hex: rgbToHex(dominantColor.r, dominantColor.g, dominantColor.b),
        frequency: Math.round((frequency / edgePixels.length) * 100) / 100,
    };
}

function getPixelColor(data, x, y, width) {
    const index = (y * width + x) * 4;
    return {
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
        a: data[index + 3]
    };
}

/**
 * Finds the most frequent color in an array of pixel colors
 * @param {Array} pixels - Array of pixel color objects {r, g, b, a}
 * @param {number} colorRounding - Value to round RGB color channels to reduce variance
 * @param {number} alphaRounding - Value to round alpha channel to reduce variance
 * @returns {Array} Array containing the most frequent color object and its count
 */
function getMostFrequentColor(pixels, colorRounding = 5, alphaRounding = 5) {
    const colorMap = {};

    pixels.forEach(pixel => {
        // Round colors to reduce variance
        const r = Math.round(pixel.r / colorRounding) * colorRounding;
        const g = Math.round(pixel.g / colorRounding) * colorRounding;
        const b = Math.round(pixel.b / colorRounding) * colorRounding;
        const a = Math.round(pixel.a / alphaRounding) * alphaRounding;
        const key = `${r},${g},${b},${a}`;

        colorMap[key] = (colorMap[key] || 0) + 1;
    });

    // Find most frequent
    let maxCount = 0;
    let dominantColor = null;

    for (const [color, count] of Object.entries(colorMap)) {
        if (count > maxCount) {
            maxCount = count;
            const [r, g, b, a] = color.split(',').map(Number);
            dominantColor = { r, g, b, a };
        }
    }

    return [dominantColor, maxCount];
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}
