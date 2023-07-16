import typescript from '@rollup/plugin-typescript'

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: !production,
  },
  plugins: [
    typescript({
      sourceMap: !production,
    }),
  ],
  external: ['eslint', 'unist-util-is'],
}
