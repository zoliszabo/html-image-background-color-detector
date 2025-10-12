// Test configuration
// Add your test cases here with image sources and expected RGB values
//
// Example test case with all available options:
// {
//     name: "Test Name",                    // Description of the test
//     src: "path/to/image.jpg",             // Image path or data URI
//     expected: { r: 255, g: 128, b: 64 },  // Expected RGB values (0-255), plus optional 'a' for alpha
//     sampleRate: 0.10,                     // Optional: sample rate (default: 0.05 = 5%)
//     colorRounding: 10                     // Optional: color rounding (default: 5)
// }
const testCases = [
    {
        name: "Test #1",
        src: "images/001.png",
        expected: { r: 255, g: 255, b: 255 },
    },
    {
        name: "Test #2",
        src: "images/002.png",
        expected: { r: 105, g: 135, b: 170 },
    },
    {
        name: "Test #3",
        src: "images/003.png",
        expected: { r: 75, g: 155, b: 110 },
    },
    {
        name: "Test #4 - Default sample rate (5%)",
        src: "images/004.png",
        expected: { r: 255, g: 255, b: 255 },
    },
    {
        name: "Test #5 - Custom sample rate (50%)",
        src: "images/004.png",
        expected: { r: 105, g: 205, b: 135 },
        sampleRate: 0.5
    },
    {
        name: "Test #6",
        src: "images/005.png",
        expected: { r: 255, g: 255, b: 255 },
    },
    {
        name: "Test #7",
        src: "images/006.png",
        expected: { r: 170, g: 170, b: 170 },
    },
    {
        name: "Test #8 - Custom color rounding (20)",
        src: "images/006.png",
        expected: { r: 160, g: 160, b: 160 },
        colorRounding: 20
    },
    {
        name: "Test #9 - Custom color rounding (1)",
        src: "images/006.png",
        expected: { r: 169, g: 169, b: 169 },
        colorRounding: 1
    },
    {
        name: "Test #10 - Custom color rounding (2)",
        src: "images/006.png",
        expected: { r: 170, g: 170, b: 170 },
        colorRounding: 2
    },
    {
        name: "Test #11 - Transparent",
        src: "images/007.png",
        expected: { r: 0, g: 0, b: 0, a: 0 },
        colorRounding: 1
    },
    // Add more test cases here as needed
];

export default testCases;
