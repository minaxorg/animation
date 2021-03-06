import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      name: 'ani',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [typescript()],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    external: [],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'auto' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [typescript()],
  },
]
