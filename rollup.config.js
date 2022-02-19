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

const outputGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

export default {
  input: 'src/components/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      globals: outputGlobals,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      globals: outputGlobals,
    },
  ],
  external: [/@babel\/runtime/, 'react-dom', 'react'],
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
      presets: ['@babel/preset-react'],
      babelHelpers: 'runtime',
      exclude: ['node_modules/**', 'lib/**'],
      extensions: ['.ts', '.tsx'],
      inputSourceMap: true,
      plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-styled-components'],
    }),
    filesize(),
  ],
}
