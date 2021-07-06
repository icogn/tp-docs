module.exports = function (context, options) {
  return {
    name: 'test-plugin',
    configureWebpack(config, isServer, utils, content) {
      console.log('config');
      const len = config.plugins.length;
      console.log(config.plugins[len - 1]);

      return {};
    },
  };
};
