
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

loaders.push({
  test: /\.css$/,
  loaders: [
    'style-loader',
    `css-loader?${JSON.stringify({
      sourceMap: false,
      modules: true,
      localIdentName: '[hash:base64:4]',
      minimize: true,
    })}`,
    'postcss-loader',
  ],
  exclude: ['node_modules']
});

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    publicPath: './',		
    path: path.join(__dirname, 'public'),
    filename: '[chunkhash].js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders
  },
  stats: {
		colors: true,
		reasons: false,
		hash: false,
		version: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		cached: false,
		cachedAssets: false,
	},
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './static/index.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss(bundler) {
          return [
            // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
            // https://github.com/postcss/postcss-import
            require('postcss-import')({ addDependencyTo: bundler }),
            // Mixin support
            // https://github.com/postcss/postcss-mixins
            require('postcss-mixins')(),
            // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
            // https://github.com/postcss/postcss-custom-properties
            require('postcss-custom-properties')(),
            // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
            // https://github.com/postcss/postcss-custom-media
            require('postcss-custom-media')(),
            // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
            // https://github.com/postcss/postcss-media-minmax
            require('postcss-media-minmax')(),
            // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
            // https://github.com/postcss/postcss-custom-selectors
            require('postcss-custom-selectors')(),
            // W3C calc() function, e.g. div { height: calc(100px - 2em); }
            // https://github.com/postcss/postcss-calc
            require('postcss-calc')(),
            // Allows you to nest one style rule inside another
            // https://github.com/jonathantneal/postcss-nesting
            require('postcss-nesting')(),
            // W3C color() function, e.g. div { background: color(red alpha(90%)); }
            // https://github.com/postcss/postcss-color-function
            require('postcss-color-function')(),
            // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
            // https://github.com/iamvdo/pleeease-filters
            require('pleeease-filters')(),
            // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
            // https://github.com/robwierzbowski/node-pixrem
            require('pixrem')(),
            // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
            // https://github.com/postcss/postcss-selector-matches
            require('postcss-selector-matches')(),
            // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
            // https://github.com/postcss/postcss-selector-not
            require('postcss-selector-not')(),
            // PostCSS Assets is an asset manager for CSS. It isolates stylesheets
            //from environmental changes, gets image sizes and inlines files.
            //https://github.com/assetsjs/postcss-assets
            require('postcss-assets')({
              loadPaths: ['styles/'],
              relative: true
            }),
            //PostCSS plugin that adds a font-path attribute to @font-face which expands to the FontSpring syntax
            //https://github.com/seaneking/postcss-fontpath
            //require('postcss-fontpath')(),
            // Add vendor prefixes to CSS rules using values from caniuse.com
            // https://github.com/postcss/autoprefixer
            require('autoprefixer')(),
          ];
        },
      }
    })
  ],
};