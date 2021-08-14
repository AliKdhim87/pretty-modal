import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

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
  ],
  external: ['react', 'react-dom', 'styled-component'],
  plugins: [
    peerDepsExternal({includeDependencies: true}),
    resolve(),
    commonjs(),
    typescript({useTsconfigDeclarationDir: true}),
  ],
}
