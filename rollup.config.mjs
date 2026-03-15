import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import inject from '@rollup/plugin-inject';

const files = ['jquery.hammer.js'];
const external = ['gemini-loader'];
const globals = {
  'gemini-loader': 'G',
};
const config = [];
const plugins = [
  inject({
    exclude: 'node_modules/**',
  }),
  nodeResolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  }),
];

for (const file of files) {
  let out = `dist/${file}`;

  config.push({
    input: file,
    output: {
      name: 'jQuery HammerJS',
      file: out,
      format: 'umd',
      globals,
    },
    external,
    plugins,
  });

  config.push({
    input: file,
    output: {
      name: 'jQuery HammerJS',
      file: out.replace(/.js$/, '.min.js'),
      format: 'umd',
      globals,
    },
    external,
    plugins: [
      ...plugins,
      terser({
        output: {
          comments() {
            return false;
          },
        },
      }),
    ],
  });
}

export default config;
