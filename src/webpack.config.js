const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')

const path = require('path')

const config = {
  entry: {
    embed: path.resolve(__dirname, 'embed', 'embed.js'),
    window: path.resolve(__dirname, 'embed', 'window.js'),
    share: path.resolve(__dirname, 'embed', 'share.js')
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
      icons: path.resolve(__dirname, 'components', 'icons')
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
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]
} else {
  config.plugins = [...config.plugins, new DashboardPlugin()]
}

module.exports = config
