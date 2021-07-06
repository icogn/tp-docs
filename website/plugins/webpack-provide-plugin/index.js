/**
 * Needed to add stream support to the browser for pngjs. Used on the PNG to BTI
 * converstion page.
 */

// webpack is somehow available here, not worrying about it
const webpack = require('webpack');

module.exports = function (context, options) {
  return {
    name: 'webpack-provide-plugin',
    configureWebpack(config, isServer, utils, content) {
      return {
        resolve: {
          fallback: {
            buffer: require.resolve('buffer'),
            stream: require.resolve('stream-browserify'),
          },
        },
        plugins: [
          new webpack.ProvidePlugin({
            process: 'process/browser',
          }),
        ],
      };
    },
  };
};
