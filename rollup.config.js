import terser from '@rollup/plugin-terser';

export default [
  // ESM (for Node and modern bundlers)
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true
      }
    ]
  },

  // UMD (for browsers via <script>)
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'detectImageBackgroundColor',
        sourcemap: true
      },
      {
        file: 'dist/index.umd.min.js',
        format: 'umd',
        name: 'detectImageBackgroundColor',
        plugins: [terser()],
        sourcemap: true
      }
    ]
  }
];
