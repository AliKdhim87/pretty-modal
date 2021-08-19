import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import nodeExternal from 'rollup-plugin-node-externals'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import filesize from 'rollup-plugin-filesize'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json')

// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */

export default {
  input: 'src/components/Modal/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'styled-components': 'styled',
      },
    },
    {
      file: packageJson.modal,
      format: 'esm',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'styled-components': 'styled',
      },
    },
  ],
  external: [/@babel\/runtime/, 'react-dom', 'react', 'styled-components'],
  plugins: [
    peerDepsExternal({includeDependencies: true}),
    nodeExternal(),
    resolve({browser: true}),
    commonjs({
      include: /node_modules/,
    }),
    nodePolyfills(),
    typescript({useTsconfigDeclarationDir: true}),
    babel({
      babelHelpers: 'runtime',
      exclude: ['node_modules/**', 'lib/**'],
      extensions: ['.ts', '.tsx'],
      plugins: ['babel-plugin-styled-components'],
      inputSourceMap: true,
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    filesize(),
  ],
}
