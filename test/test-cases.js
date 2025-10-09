// Test configuration
// Add your test cases here with image sources and expected RGB values
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
    }
    // Add more test cases here as needed
];

export default testCases;
