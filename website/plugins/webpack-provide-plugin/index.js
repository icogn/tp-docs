const webpack = require('webpack');
console.log('@@@@@@@@@@@@WWWWW');
console.log(webpack);

module.exports = function (context, options) {
  return {
    name: 'webpack-provide-plugin',
    configureWebpack(config, isServer, utils, content) {
      // console.log('config');
      // console.log(config);

      // config.plugins.push(
      //   new webpack.ProvidePlugin({
      //     Buffer: ['buffer', 'Buffer'],
      //     stream: 'stream-browserify',
      //   })
      // );

      // return {};

      return {
        resolve: {
          fallback: {
            buffer: require.resolve('buffer'),
            // process: require.resolve('process/browser'),
            stream: require.resolve('stream-browserify'),
          },
        },
        plugins: [
          new webpack.ProvidePlugin({
            // Buffer: ['buffer', 'Buffer'],
            // stream: ['stream-browserify'],
            process: 'process/browser',
          }),
        ],
      };

      // return {
      //   plugins: [
      //   ],
      // };
      // const { getCacheLoader } = utils;
      // return {
      //   module: {
      //     rules: [
      //       {
      //         test: /\.foo$/,
      //         use: [getCacheLoader(isServer), 'my-custom-webpack-loader'],
      //       },
      //     ],
      //   },
      // };
    },
  };
};
