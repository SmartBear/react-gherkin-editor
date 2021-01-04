const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin, ProvidePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'dev'),
  entry: './index.js',
  devServer: {
    publicPath: '/',
    port: 5000,
    stats: {
      preset: 'minimal',
      colors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    fallback: {
      stream: require.resolve('stream-browserify')
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Fake AP'
    }),
    new DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })'
    }),
    new ProvidePlugin({
      process: 'process/browser'
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ]
}
