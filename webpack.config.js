const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin, ProvidePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'dev'),
  entry: './index.js',
  devServer: {
    host: 'localhost',
    port: 5000,
    devMiddleware: {
      publicPath: '/',
      stats: {
        preset: 'minimal',
        colors: true
      }
    },
    client: {
      logging: 'none'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
      title: 'React Gherkin Editor'
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
