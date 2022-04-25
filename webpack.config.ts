import path from 'node:path'
import type { Configuration } from 'webpack'

const configure: Configuration = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: { filename: 'worker.js', path: path.join(__dirname, 'dist') },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  module: { rules: [{ test: /\.ts$/, loader: require.resolve('ts-loader') }] },
}

export default configure
