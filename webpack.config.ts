import type { Configuration } from 'webpack'

const configure: Configuration = {
  mode: 'development',
  devtool: false,
  entry: './worker.ts',
  output: { filename: 'worker.js', path: __dirname },
  module: { rules: [{ test: /\.ts$/, loader: require.resolve('ts-loader') }] },
}

export default configure
