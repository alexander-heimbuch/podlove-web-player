const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const path = require('path')

const config = {
  entry: {
    embed: path.resolve(__dirname, 'embed', 'embed.js'),
    window: path.resolve(__dirname, 'embed', 'window.js'),
    share: path.resolve(__dirname, 'embed', 'share.js'),
    vendor: path.resolve(__dirname, 'vendor.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          js: 'babel-loader',
          scss: 'vue-style-loader!css-loader!sass-loader',
          sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      store: path.resolve(__dirname, './store/index.js'),
      utils: path.resolve(__dirname, 'utils'),
      shared: path.resolve(__dirname, 'components', 'shared'),
      icons: path.resolve(__dirname, 'components', 'icons'),
      lang: path.resolve(__dirname, 'lang'),
      core: path.resolve(__dirname, 'core')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, 'styles'),
            path.resolve(__dirname, '..', 'node_modules', 'foundation-sites', 'scss')
          ]
        }
      }
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  config.plugins = [...config.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      chunks: ['share', 'window'],
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]
} else {
  config.plugins = [...config.plugins,
    new DashboardPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
}

module.exports = config
